import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BadgeCheck, ExternalLink, Download, Award, Calendar, Building2, Hash, Eye } from 'lucide-react';

const CERTIFICATE_FILES = import.meta.glob('../Certificates/*.{pdf,PDF,jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  import: 'default',
});

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);

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
  const cleaned = rawName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

const CERTIFICATES = Object.entries(CERTIFICATE_FILES)
  .map(([filePath, fileUrl]) => {
    const fileName = filePath.split('/').pop() || '';
    const extension = (fileName.split('.').pop() || '').toLowerCase();
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const { issuer, color } = resolveIssuerMetadata(baseName);
    const isImage = IMAGE_EXTENSIONS.has(extension);
    const previewType = isImage ? 'image' : 'pdf';
    const previewUrl = fileUrl;
    const previewEmbedUrl = isImage
      ? fileUrl
      : `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`;

    return {
      title: normalizeTitle(baseName),
      issuer,
      date: toIssuedDate(baseName),
      certificateId: toCertificateId(baseName),
      previewType,
      previewUrl,
      previewEmbedUrl,
      verifyUrl: '',
      viewUrl: fileUrl,
      downloadUrl: fileUrl,
      color,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const CertificateCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
    rotateY.set(x * 20);
    rotateX.set(-y * 20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className="relative group perspective-1000"
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-[#5D0D18]/10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ 
          boxShadow: "0 25px 50px -12px rgba(93, 13, 24, 0.15)",
          y: -10
        }}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          >
            {cert.previewType === 'image' ? (
              <img
                src={cert.previewUrl}
                alt={cert.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <iframe
                src={cert.previewEmbedUrl}
                title={`${cert.title} preview`}
                className="w-full h-full border-0 pointer-events-none bg-white"
                loading="lazy"
              />
            )}
          </motion.div>
          
          {/* Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#5D0D18]/80 via-[#5D0D18]/20 to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
          />

          {/* Platform Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{ backgroundColor: cert.color, color: '#fff' }}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Building2 size={12} />
            {cert.issuer}
          </motion.div>

          {/* Verified Badge */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.4 }}
          >
            <BadgeCheck size={20} className="text-[#6B7A3D]" />
          </motion.div>

          {/* Floating Action Buttons */}
          <motion.div
            className="absolute bottom-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={cert.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="View Certificate"
            >
              <Eye size={18} />
            </motion.a>
            {cert.verifyUrl ? (
            <motion.a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Verify Certificate"
            >
              <ExternalLink size={18} />
            </motion.a>
            ) : null}
            <motion.a
              href={cert.downloadUrl}
              download
              className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Download Certificate"
            >
              <Download size={18} />
            </motion.a>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative">
          {/* Decorative line */}
          <motion.div
            className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#5D0D18]/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          />

          {/* Title */}
          <motion.h3 
            className="text-xl font-bold text-[#1a1a1a] mb-3 font-fliege group-hover:text-[#5D0D18] transition-colors line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {cert.title}
          </motion.h3>

          {/* Meta Info Grid */}
          <div className="space-y-2">
            <motion.div 
              className="flex items-center gap-2 text-sm text-[#1a1a1a]/60"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Calendar size={14} className="text-[#9FB2AC]" />
              {cert.date}
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-xs font-mono text-[#9FB2AC] bg-[#9FB2AC]/10 px-2 py-1 rounded w-fit"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Hash size={12} />
              {cert.certificateId}
            </motion.div>
          </div>

          {/* Hover Reveal Content */}
          <motion.div
            className="mt-4 pt-4 border-t border-[#5D0D18]/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-[#1a1a1a]/50 leading-relaxed">
              Use the Eye icon to view the certificate file, or download it for your records.
            </p>
          </motion.div>
        </div>

        {/* 3D Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(
              circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%,
              rgba(255,255,255,0.15) 0%,
              transparent 50%
            )`,
            transform: "translateZ(1px)",
          }}
        />
      </motion.div>
    </motion.article>
  );
};

const StatCard = ({ value, label, icon: Icon, delay }) => (
  <motion.div
    className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-[#5D0D18]/10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
  >
    <div className="w-12 h-12 rounded-full bg-[#5D0D18]/10 flex items-center justify-center">
      <Icon size={24} className="text-[#5D0D18]" />
    </div>
    <div>
      <div className="text-2xl font-bold text-[#5D0D18] font-fliege">{value}</div>
      <div className="text-sm text-[#1a1a1a]/60">{label}</div>
    </div>
  </motion.div>
);

export default function Certificates() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const totalCertificates = CERTIFICATES.length;
  const totalPlatforms = new Set(CERTIFICATES.map((cert) => cert.issuer)).size;

  return (
    <section 
      id="certificates-section" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          style={{ y: backgroundY }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#5D0D18]/5 blur-3xl"
          style={{ y: backgroundY }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-8 h-px bg-[#9FB2AC]" />
              Credentials
            </motion.span>
            
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Verified{' '}
              <span className="text-[#5D0D18] italic">Certificates</span>
            </motion.h2>
            
            <motion.p 
              className="mt-4 text-lg text-[#1a1a1a]/60 max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Professional certifications from industry-leading platforms, validating expertise in modern development practices.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <div className="flex gap-4">
            <StatCard 
              value={`${totalCertificates}`} 
              label="Total Certs" 
              icon={Award} 
              delay={0.4} 
            />
            <StatCard 
              value={`${totalPlatforms}`} 
              label="Platforms" 
              icon={Building2} 
              delay={0.5} 
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <CertificateCard key={cert.certificateId} cert={cert} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://linkedin.com/in/singh-harshit-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#5D0D18] text-[#5D0D18] rounded-full font-medium hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BadgeCheck size={20} />
            View All Credentials on LinkedIn
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
