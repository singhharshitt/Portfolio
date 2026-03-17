import React, { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from '../utils/motion';
import { BadgeCheck, ExternalLink, Download, Award, Calendar, Building2, Hash, Eye, X, ZoomIn, ChevronDown } from 'lucide-react';

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
  { pattern: /coursera/i, issuer: 'Coursera', color: '#452215' },
  { pattern: /udemy/i, issuer: 'Udemy', color: '#DF6C4F' },
  { pattern: /google|gen ai google/i, issuer: 'Google', color: '#FF9398' },
  { pattern: /adobe/i, issuer: 'Adobe', color: '#DF6C4F' },
  { pattern: /iit/i, issuer: 'IIT Ropar', color: '#452215' },
  { pattern: /neo/i, issuer: 'Neo Colab', color: '#FF9398' },
  { pattern: /lpu/i, issuer: 'LPU', color: '#452215' },
];

const resolveIssuerMetadata = (name) => {
  for (const rule of CERTIFICATE_ISSUER_RULES) {
    if (rule.pattern.test(name)) return { issuer: rule.issuer, color: rule.color };
  }
  return { issuer: 'Certificate', color: '#452215' };
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
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#452215]/70 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#FFFFF0', maxHeight: '90vh' }}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between border-b p-5" style={{ borderColor: '#FFF8EE' }}>
          <div>
            <p className="font-mono-ui mb-1 text-xs uppercase tracking-widest" style={{ color: '#DF6C4F' }}>
              {cert.issuer}
            </p>
            <h3 className="font-ui line-clamp-2 text-lg" style={{ color: '#452215' }}>
              {cert.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors hover:bg-[#DF6C4F] hover:text-[#FFFFF0]"
            style={{ borderColor: '#FFF8EE', color: '#452215' }}
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Preview */}
        <div className="relative overflow-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
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
              className="w-full border-0 bg-[#FFFFF0]"
              style={{ height: '65vh' }}
            />
          )}
        </div>

        {/* Modal footer */}
        <div className="flex items-center gap-3 border-t p-4" style={{ borderColor: '#FFF8EE' }}>
          <a
            href={cert.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: '#FFFFF0', color: '#452215', border: '1.5px solid #FFF8EE' }}
          >
            <ExternalLink size={14} /> Open
          </a>
          <a
            href={cert.downloadUrl}
            download
            className="font-ui flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[#FFFFF0]"
            style={{ background: '#DF6C4F' }}
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
        className="relative overflow-hidden rounded-2xl border bg-[#FFFFF0]"
        style={{
          borderColor: hovered ? `${cert.color}55` : '#FFF8EE',
          boxShadow: hovered
            ? `0 20px 48px -8px ${cert.color}18, 0 6px 20px -4px rgba(153,0,0,0.06)`
            : '0 4px 20px rgba(153,0,0,0.04)',
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
                className="pointer-events-none h-full w-full border-0 bg-[#FFFFF0]"
                loading="lazy"
              />
            )}
          </div>

          {/* Solid overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: cert.color,
              opacity: hovered ? 0.18 : 0.1,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Platform badge */}
          <div
            className="font-ui absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] text-[#FFFFF0]"
            style={{ background: cert.color }}
          >
            <Building2 size={10} />
            {cert.issuer}
          </div>

          {/* Verified badge */}
          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFFF0] shadow">
            <BadgeCheck size={18} className="text-[#FF9398]" />
          </div>

          {/* Zoom hint on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(244,242,241,0.92)', backdropFilter: 'blur(4px)' }}
            >
              <ZoomIn size={22} style={{ color: '#452215' }} />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <div
            className="h-px mb-4 rounded"
            style={{
              background: cert.color,
              transform: hovered ? 'scaleX(1)' : 'scaleX(0.3)',
              transition: 'transform 0.55s ease',
              transformOrigin: 'left',
            }}
          />

          <h3
            className="font-ui mb-2.5 line-clamp-2 text-[15px]"
            style={{ color: hovered ? '#452215' : '#452215', transition: 'color 0.2s ease' }}
          >
            {cert.title}
          </h3>

          <div className="space-y-1.5">
            <div className="font-caption flex items-center gap-1.5 text-xs" style={{ color: 'rgba(51,51,51,0.72)' }}>
              <Calendar size={12} style={{ color: '#DF6C4F' }} />
              {cert.date}
            </div>
            <div
              className="font-mono-ui flex w-fit items-center gap-1.5 rounded px-2 py-0.5 text-[11px]"
              style={{ background: '#FFF8EE', color: '#DF6C4F' }}
            >
              <Hash size={10} />
              {cert.certificateId}
            </div>
          </div>

          {/* Action row */}
          <div
            className="flex items-center gap-2 mt-3 pt-3 border-t"
            style={{
              borderColor: '#FFF8EE',
              opacity: hovered ? 1 : 0.4,
              transition: 'opacity 0.25s ease',
            }}
          >
            <button
              className="font-ui flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
              style={{ background: '#FFF8EE', color: '#452215' }}
              onClick={(e) => { e.stopPropagation(); onPreview(cert); }}
            >
              <Eye size={11} /> Preview
            </button>
            <a
              href={cert.downloadUrl}
              download
              className="font-ui flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
              style={{ background: '#FFFFF0', color: '#DF6C4F' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={11} /> Save
            </a>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
                style={{ background: '#FFFFF0', color: '#FF9398' }}
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
      className="flex items-center gap-4 rounded-xl border p-4"
      style={{ background: 'rgba(244,242,241,0.8)', borderColor: '#FFF8EE' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(244,242,241,1)' }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: '#FFF8EE' }}
      >
        <Icon size={22} style={{ color: '#452215' }} />
      </div>
      <div>
        <div className="font-fliege text-2xl" style={{ color: '#452215' }}>{value}</div>
        <div className="font-caption text-sm" style={{ color: 'rgba(51,51,51,0.72)' }}>{label}</div>
      </div>
    </motion.div>
  );
});

const INITIAL_VISIBLE_CERTS = 3;

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */
export default function Certificates() {
  const [previewCert, setPreviewCert] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const totalCertificates = CERTIFICATES.length;
  const totalPlatforms = useMemo(() => new Set(CERTIFICATES.map(c => c.issuer)).size, []);

  const visibleCerts = showAll ? CERTIFICATES : CERTIFICATES.slice(0, INITIAL_VISIBLE_CERTS);
  const hasMore = CERTIFICATES.length > INITIAL_VISIBLE_CERTS;

  const handlePreview = useCallback((cert) => setPreviewCert(cert), []);
  const handleClose = useCallback(() => setPreviewCert(null), []);
  const toggleShowAll = useCallback(() => setShowAll((prev) => !prev), []);

  return (
    <section
      id="certificates-section"
      className="relative min-h-screen w-full py-20 lg:py-32 overflow-hidden"
      style={{ background: '#FFFFF0' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full blur-3xl" style={{ background: '#FFF8EE' }} />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full blur-3xl" style={{ background: '#FF939820' }} />
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
              className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em]"
              style={{ color: '#DF6C4F' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="h-px w-8 bg-[#DF6C4F]" />
              Credentials
            </motion.span>

            <motion.h2
              className="font-fliege text-4xl sm:text-5xl lg:text-6xl"
              style={{ color: '#452215' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Verified{' '}
              <span className="italic" style={{ color: '#DF6C4F' }}>Certificates</span>
            </motion.h2>

            <motion.p
              className="mt-4 text-lg max-w-xl"
              style={{ color: 'rgba(51,51,51,0.8)' }}
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
          {visibleCerts.map((cert, index) => (
            <CertificateCard
              key={cert.certificateId}
              cert={cert}
              index={index}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {/* Show More / Show Less */}
        {hasMore && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              type="button"
              onClick={toggleShowAll}
              className="font-ui inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 text-sm transition-all duration-300 hover:text-[#FFFFF0]"
              style={{
                borderColor: '#452215',
                color: '#452215',
              }}
              whileHover={{ scale: 1.04, y: -1, backgroundColor: '#DF6C4F', color: '#FFFFF0' }}
              whileTap={{ scale: 0.97 }}
              aria-expanded={showAll}
            >
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex' }}
              >
                <ChevronDown size={16} />
              </motion.span>
              {showAll
                ? 'Show Less'
                : `View More Certificates (${CERTIFICATES.length - INITIAL_VISIBLE_CERTS} more)`}
            </motion.button>
          </motion.div>
        )}

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
            style={{ borderColor: '#452215', color: '#452215' }}
            whileHover={{ scale: 1.05, backgroundColor: '#DF6C4F', color: '#FFFFF0' }}
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
