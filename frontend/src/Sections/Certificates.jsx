import React, { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from '../utils/motion';
import { BadgeCheck, ExternalLink, Download, Award, Calendar, Building2, Hash, Eye, X, ZoomIn } from 'lucide-react';

/* ─────────────────────────────────────────────
   CERTIFICATE FILE IMPORT (static glob)
   ───────────────────────────────────────────── */
const CERTIFICATE_FILES = import.meta.glob('../Certificates/*.{pdf,PDF,jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  import: 'default',
});

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);

/* ─────────────────────────────────────────────
   METADATA RESOLUTION
   ───────────────────────────────────────────── */
const CERTIFICATE_ISSUER_RULES = [
  { pattern: /coursera/i, issuer: 'Coursera', color: '#0056D2' },
  { pattern: /udemy/i, issuer: 'Udemy', color: '#A435F0' },
  { pattern: /google|gen ai google/i, issuer: 'Google', color: '#4285F4' },
  { pattern: /adobe/i, issuer: 'Adobe', color: '#FF0000' },
  { pattern: /iit/i, issuer: 'IIT Ropar', color: '#9E1B2D' },
  { pattern: /neo/i, issuer: 'Neo Colab', color: '#6B7A3D' },
  { pattern: /lpu/i, issuer: 'LPU', color: '#7A1524' },
];

const resolveIssuerMetadata = (name) => {
  for (const rule of CERTIFICATE_ISSUER_RULES) {
    if (rule.pattern.test(name)) return { issuer: rule.issuer, color: rule.color };
  }
  return { issuer: 'Certificate', color: '#5D0D18' };
};

const normalizeTitle = (rawName) => {
  const cleaned = rawName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const withoutGeneric = cleaned
    .replace(/\bcertificate\b/gi, '')
    .replace(/\bcert\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return withoutGeneric || cleaned;
};

const toCertificateId = (rawName) =>
  rawName.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 36);

const toIssuedDate = (rawName) => {
  const yearMatch = rawName.match(/(20\d{2})/);
  return yearMatch ? `Issued ${yearMatch[1]}` : 'From Certificate Folder';
};

/* ─────────────────────────────────────────────
   BUILD CERTIFICATE LIST (once at module load)
   ───────────────────────────────────────────── */
const CERTIFICATES = Object.entries(CERTIFICATE_FILES)
  .map(([filePath, fileUrl]) => {
    const fileName = filePath.split('/').pop() || '';
    const extension = (fileName.split('.').pop() || '').toLowerCase();
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const { issuer, color } = resolveIssuerMetadata(baseName);
    const isImage = IMAGE_EXTENSIONS.has(extension);
    const previewEmbedUrl = isImage
      ? fileUrl
      : `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`;
    return {
      title: normalizeTitle(baseName),
      issuer,
      date: toIssuedDate(baseName),
      certificateId: toCertificateId(baseName),
      previewType: isImage ? 'image' : 'pdf',
      previewUrl: fileUrl,
      previewEmbedUrl,
      verifyUrl: '',
      viewUrl: fileUrl,
      downloadUrl: fileUrl,
      color,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

/* ─────────────────────────────────────────────
   MODAL PREVIEW
   ───────────────────────────────────────────── */
const CertificateModal = memo(function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#FFFBEB', maxHeight: '90vh' }}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: '#9FB2AC33' }}>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#9FB2AC' }}>
              {cert.issuer}
            </p>
            <h3 className="text-lg font-bold font-fliege line-clamp-2" style={{ color: '#5D0D18' }}>
              {cert.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:bg-[#5D0D18] hover:text-white"
            style={{ borderColor: '#9FB2AC44', color: '#5D0D18' }}
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Preview */}
        <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {cert.previewType === 'image' ? (
            <img
              src={cert.previewUrl}
              alt={cert.title}
              className="w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <iframe
              src={cert.previewEmbedUrl}
              title={`${cert.title} full preview`}
              className="w-full border-0 bg-white"
              style={{ height: '65vh' }}
            />
          )}
        </div>

        {/* Modal footer */}
        <div className="flex items-center gap-3 p-4 border-t" style={{ borderColor: '#9FB2AC33' }}>
          <a
            href={cert.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: '#5D0D1812', color: '#5D0D18', border: '1.5px solid #5D0D1830' }}
          >
            <ExternalLink size={14} /> Open
          </a>
          <a
            href={cert.downloadUrl}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#FFFBEB]"
            style={{ background: '#5D0D18' }}
          >
            <Download size={14} /> Download
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────
   CERTIFICATE CARD  (no per-card useScroll!)
   ───────────────────────────────────────────── */
const CertificateCard = memo(function CertificateCard({ cert, index, onPreview }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={cardRef}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.5), ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.025 }}
      style={{ willChange: 'transform' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPreview(cert)}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden border"
        style={{
          borderColor: hovered ? `${cert.color}55` : '#9FB2AC22',
          boxShadow: hovered
            ? `0 20px 48px -8px ${cert.color}28, 0 6px 20px -4px rgba(93,13,24,0.08)`
            : '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Image / iframe preview */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <div
            className="w-full h-full"
            style={{
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.55s ease',
            }}
          >
            {cert.previewType === 'image' ? (
              <img
                src={cert.previewUrl}
                alt={cert.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={500}
              />
            ) : (
              <iframe
                src={cert.previewEmbedUrl}
                title={`${cert.title} preview`}
                className="w-full h-full border-0 pointer-events-none bg-white"
                loading="lazy"
              />
            )}
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${cert.color}cc 0%, ${cert.color}22 50%, transparent 100%)`,
              opacity: hovered ? 0.85 : 0.55,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Platform badge */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 text-white"
            style={{ background: cert.color }}
          >
            <Building2 size={10} />
            {cert.issuer}
          </div>

          {/* Verified badge */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FFFBEB] flex items-center justify-center shadow">
            <BadgeCheck size={18} className="text-[#6B7A3D]" />
          </div>

          {/* Zoom hint on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,251,235,0.88)', backdropFilter: 'blur(4px)' }}
            >
              <ZoomIn size={22} style={{ color: '#5D0D18' }} />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <div
            className="h-px mb-4 rounded"
            style={{
              background: `linear-gradient(90deg, transparent, ${cert.color}44, transparent)`,
              transform: hovered ? 'scaleX(1)' : 'scaleX(0.3)',
              transition: 'transform 0.55s ease',
              transformOrigin: 'left',
            }}
          />

          <h3
            className="text-[15px] font-bold mb-2.5 font-fliege line-clamp-2"
            style={{ color: hovered ? '#5D0D18' : '#1a1a1a', transition: 'color 0.2s ease' }}
          >
            {cert.title}
          </h3>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(26,26,26,0.55)' }}>
              <Calendar size={12} style={{ color: '#9FB2AC' }} />
              {cert.date}
            </div>
            <div
              className="flex items-center gap-1.5 text-[11px] font-mono rounded px-2 py-0.5 w-fit"
              style={{ background: '#9FB2AC18', color: '#9FB2AC' }}
            >
              <Hash size={10} />
              {cert.certificateId}
            </div>
          </div>

          {/* Action row */}
          <div
            className="flex items-center gap-2 mt-3 pt-3 border-t"
            style={{
              borderColor: '#9FB2AC22',
              opacity: hovered ? 1 : 0.4,
              transition: 'opacity 0.25s ease',
            }}
          >
            <button
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: '#5D0D1810', color: '#5D0D18' }}
              onClick={(e) => { e.stopPropagation(); onPreview(cert); }}
            >
              <Eye size={11} /> Preview
            </button>
            <a
              href={cert.downloadUrl}
              download
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: '#9FB2AC18', color: '#9FB2AC' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={11} /> Save
            </a>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: '#6B7A3D18', color: '#6B7A3D' }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={11} /> Verify
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ─────────────────────────────────────────────
   STAT CARD
   ───────────────────────────────────────────── */
const StatCard = memo(function StatCard({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl border"
      style={{ background: 'rgba(255,255,255,0.5)', borderColor: '#5D0D1815' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.85)' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: '#5D0D1812' }}
      >
        <Icon size={22} style={{ color: '#5D0D18' }} />
      </div>
      <div>
        <div className="text-2xl font-bold font-fliege" style={{ color: '#5D0D18' }}>{value}</div>
        <div className="text-sm" style={{ color: 'rgba(26,26,26,0.55)' }}>{label}</div>
      </div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */
export default function Certificates() {
  const [previewCert, setPreviewCert] = useState(null);

  const totalCertificates = CERTIFICATES.length;
  const totalPlatforms = useMemo(() => new Set(CERTIFICATES.map(c => c.issuer)).size, []);

  const handlePreview = useCallback((cert) => setPreviewCert(cert), []);
  const handleClose = useCallback(() => setPreviewCert(null), []);

  return (
    <section
      id="certificates-section"
      className="relative min-h-screen w-full py-20 lg:py-32 overflow-hidden"
      style={{ background: '#FFFBEB' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: '#9FB2AC18' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: '#5D0D180D' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: '#9FB2AC' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-8 h-px bg-[#9FB2AC]" />
              Credentials
            </motion.span>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-fliege"
              style={{ color: '#1a1a1a' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Verified{' '}
              <span className="italic" style={{ color: '#5D0D18' }}>Certificates</span>
            </motion.h2>

            <motion.p
              className="mt-4 text-lg max-w-xl"
              style={{ color: 'rgba(26,26,26,0.58)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Professional certifications from industry-leading platforms, validating expertise
              in modern development practices.
            </motion.p>
          </motion.div>

          <div className="flex gap-4">
            <StatCard value={`${totalCertificates}`} label="Total Certs" icon={Award} delay={0.4} />
            <StatCard value={`${totalPlatforms}`} label="Platforms" icon={Building2} delay={0.5} />
          </div>
        </div>

        {/* Certificates grid — 1/2/3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {CERTIFICATES.map((cert, index) => (
            <CertificateCard
              key={cert.certificateId}
              cert={cert}
              index={index}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="https://linkedin.com/in/singh-harshit-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 rounded-full font-medium transition-all"
            style={{ borderColor: '#5D0D18', color: '#5D0D18' }}
            whileHover={{ scale: 1.05, backgroundColor: '#5D0D18', color: '#FFFBEB' }}
            whileTap={{ scale: 0.95 }}
          >
            <BadgeCheck size={20} />
            View All Credentials on LinkedIn
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ExternalLink size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {previewCert && (
          <CertificateModal cert={previewCert} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
