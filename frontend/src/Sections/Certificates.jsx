import React, { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from '../utils/motion';
import { getCertificates } from '../constants/certificates';
import { 
  BadgeCheck, 
  ExternalLink, 
  Download, 
  Award, 
  Calendar, 
  Building2, 
  Hash, 
  Eye, 
  X, 
  ZoomIn, 
  ChevronDown,
  Sparkles,
  Star,
  Shield,
  Medal
} from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/socialLinks';

/* ─────────────────────────────────────────────
   BUILD CERTIFICATE LIST FROM ENVIRONMENT VARIABLES
   ───────────────────────────────────────────── */
const CERTIFICATES = getCertificates();

/* ─────────────────────────────────────────────
   FLOATING PARTICLES FOR BACKGROUND
   ───────────────────────────────────────────── */
const FloatingParticle = memo(function FloatingParticle({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        filter: 'blur(12px)',
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
});

/* ─────────────────────────────────────────────
   MODAL PREVIEW
   ───────────────────────────────────────────── */
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
      <div className="absolute inset-0 bg-[#452215]/80 backdrop-blur-md" />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border-2 border-[#452215] shadow-[8px_8px_0_#8F5E41]"
        style={{ background: '#FFFFF0', maxHeight: '90vh' }}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between border-b-2 border-[#452215] p-5 bg-linear-to-r from-[#FFF8EE] to-[#FFFFF0]">
          <div>
            <p className="font-mono-ui mb-1 text-xs uppercase tracking-widest" style={{ color: '#DF6C4F' }}>
              {cert.issuer}
            </p>
            <h3 className="font-ui line-clamp-2 text-lg" style={{ color: '#452215' }}>
              {cert.title}
            </h3>
          </div>
          <motion.button
            onClick={onClose}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#452215] bg-[#FFFFF0] transition-all hover:bg-[#DF6C4F] hover:text-[#FFFFF0] hover:shadow-[2px_2px_0_#8F5E41]"
            style={{ color: '#452215' }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close preview"
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Preview - Hidden scrollbar - FIXED */}
        <div 
          className="relative overflow-auto bg-[#FFF8EE]" 
          style={{ 
            maxHeight: 'calc(90vh - 140px)',
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Hide scrollbar for Chrome/Safari/Opera */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .certificate-modal-preview::-webkit-scrollbar {
                display: none;
              }
            `
          }} />
          
          <div className="certificate-modal-preview w-full h-full">
            {cert.previewType === 'image' ? (
              <motion.img
                src={cert.previewUrl}
                alt={cert.title}
                className="w-full object-contain"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
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
        </div>

        {/* Modal footer */}
        <div className="flex items-center gap-3 border-t-2 border-[#452215] p-4 bg-[#FFF8EE]">
          <motion.a
            href={cert.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 border-[#452215] bg-[#FFFFF0] shadow-[2px_2px_0_#8F5E41] transition-all hover:shadow-[4px_4px_0_#8F5E41] hover:-translate-y-0.5"
            style={{ color: '#452215' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={14} /> Open
          </motion.a>
          <motion.a
            href={cert.downloadUrl}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 border-[#452215] bg-[#DF6C4F] text-[#FFFFF0] shadow-[2px_2px_0_#8F5E41] transition-all hover:shadow-[4px_4px_0_#8F5E41] hover:-translate-y-0.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={14} /> Download
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
});
/* ─────────────────────────────────────────────
   CERTIFICATE CARD
   ───────────────────────────────────────────── */
const CertificateCard = memo(function CertificateCard({ cert, index, onPreview }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={cardRef}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: Math.min(index * 0.07, 0.5), 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ willChange: 'transform' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPreview(cert)}
    >
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
        style={{
          borderColor: hovered ? cert.color : '#452215',
        }}
      >
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${cert.color}08 0%, transparent 50%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Image / iframe preview */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <motion.div
            className="w-full h-full"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
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
          </motion.div>

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, ${cert.color}30, transparent)`,
              opacity: hovered ? 0.3 : 0.1,
            }}
            animate={{ opacity: hovered ? 0.3 : 0.1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Platform badge */}
          <motion.div
            className="absolute left-3 top-3 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#FFFFF0] border-2 border-[#452215] shadow-[2px_2px_0_#8F5E41]"
            style={{ background: cert.color }}
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.07 + 0.2 }}
            whileHover={{ scale: 1.05, y: -1 }}
          >
            <Building2 size={12} />
            {cert.issuer}
          </motion.div>

          {/* Verified badge with animation */}
          <motion.div 
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#452215] bg-[#FFFFF0] shadow-[2px_2px_0_#8F5E41]"
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.07 + 0.3, type: 'spring' }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Shield size={18} className="text-[#FF9398]" />
          </motion.div>

          {/* Zoom hint on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#452215] bg-[#FFFFF0] shadow-[3px_3px_0_#8F5E41]"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ZoomIn size={24} style={{ color: '#DF6C4F' }} />
            </motion.div>
          </motion.div>

          {/* Corner sparkle */}
          <motion.div
            className="absolute -right-1 -top-1"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star size={20} style={{ color: cert.color }} fill={cert.color} />
          </motion.div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <motion.div
            className="h-1 mb-4 rounded-full"
            style={{
              background: cert.color,
              width: hovered ? '100%' : '30%',
            }}
            animate={{ width: hovered ? '100%' : '30%' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />

          <h3
            className="font-ui mb-2.5 line-clamp-2 text-base"
            style={{ color: hovered ? cert.color : '#452215' }}
          >
            {cert.title}
          </h3>

          <div className="space-y-2">
            <motion.div 
              className="flex items-center gap-1.5 text-xs"
              style={{ color: 'rgba(69,34,21,0.7)' }}
              animate={{ x: hovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar size={12} style={{ color: '#DF6C4F' }} />
              {cert.date}
            </motion.div>
            
            <motion.div
              className="flex w-fit items-center gap-1.5 rounded-full border-2 border-[#452215] px-2.5 py-1 text-[10px] font-mono shadow-[2px_2px_0_#8F5E41]"
              style={{ background: '#FFF8EE', color: '#DF6C4F' }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Hash size={10} />
              {cert.certificateId.slice(0, 8)}...
            </motion.div>
          </div>

          {/* Action row */}
          <motion.div
            className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-[#452215]"
            animate={{ opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              className="flex items-center gap-1.5 rounded-full border-2 border-[#452215] px-3 py-1.5 text-xs font-medium bg-[#FFFFF0] shadow-[2px_2px_0_#8F5E41] transition-all hover:shadow-[3px_3px_0_#8F5E41] hover:-translate-y-0.5"
              style={{ color: '#452215' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onPreview(cert); }}
            >
              <Eye size={12} /> Preview
            </motion.button>
            
            <motion.a
              href={cert.downloadUrl}
              download
              className="flex items-center gap-1.5 rounded-full border-2 border-[#452215] px-3 py-1.5 text-xs font-medium bg-[#DF6C4F] text-[#FFFFF0] shadow-[2px_2px_0_#8F5E41] transition-all hover:shadow-[3px_3px_0_#8F5E41] hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={12} /> Save
            </motion.a>
            
            {cert.verifyUrl && (
              <motion.a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border-2 border-[#452215] px-3 py-1.5 text-xs font-medium bg-[#FF9398] text-[#452215] shadow-[2px_2px_0_#8F5E41] transition-all hover:shadow-[3px_3px_0_#8F5E41] hover:-translate-y-0.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} /> Verify
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: hovered ? `0 0 30px ${cert.color}30` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </div>
    </motion.article>
  );
});

/* ─────────────────────────────────────────────
   STAT CARD
   ───────────────────────────────────────────── */
const StatCard = memo(function StatCard({ value, label, icon: Icon, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-4 rounded-xl border-2 border-[#452215] bg-[#FFFFF0] p-4 shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#452215] bg-[#FFF8EE] shadow-[2px_2px_0_#8F5E41]"
        animate={{ rotate: hovered ? 5 : 0, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={24} style={{ color: '#DF6C4F' }} />
      </motion.div>
      <div>
        <motion.div 
          className="font-fliege text-3xl" 
          style={{ color: '#452215' }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {value}
        </motion.div>
        <div className="font-caption text-sm" style={{ color: 'rgba(69,34,21,0.7)' }}>{label}</div>
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
  const sectionRef = useRef(null);

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
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 lg:py-32 overflow-hidden"
      style={{ background: '#FFFFF0' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingParticle delay={0} x="10%" y="20%" size={80} color="#452215" />
        <FloatingParticle delay={2} x="85%" y="30%" size={100} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="80%" size={120} color="#FF9398" />
        <FloatingParticle delay={1} x="30%" y="70%" size={90} color="#452215" />
        <FloatingParticle delay={3} x="90%" y="15%" size={70} color="#DF6C4F" />
        
        <motion.div
          className="absolute top-20 left-10 h-72 w-72 rounded-full blur-3xl"
          style={{ background: '#FFF8EE' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: '#FF939820' }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L60 60M60 0L0 60' stroke='%23452215' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                className="h-px w-8 bg-[#DF6C4F]"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              />
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
              <motion.span 
                className="italic inline-block"
                style={{ color: '#DF6C4F' }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Certificates
              </motion.span>
            </motion.h2>

            <motion.p
              className="mt-4 text-lg max-w-xl"
              style={{ color: 'rgba(69,34,21,0.8)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Professional certifications from industry-leading platforms, validating expertise
              in modern development practices.
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mt-6 h-0.5 w-24 bg-linear-to-r from-[#DF6C4F] to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="flex gap-4">
            <StatCard value={`${totalCertificates}`} label="Total Certificates" icon={Medal} delay={0.4} />
            <StatCard value={`${totalPlatforms}`} label="Learning Platforms" icon={Building2} delay={0.5} />
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
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              type="button"
              onClick={toggleShowAll}
              className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-7 py-3 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
              whileHover={{ scale: 1.04, backgroundColor: '#DF6C4F', color: '#FFFFF0' }}
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
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#452215] bg-[#FFFFF0] rounded-full font-medium shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
            style={{ color: '#452215' }}
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
