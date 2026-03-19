/**
 * Certificate metadata and URLs
 * All PDFs are hosted on Cloudinary
 */

export const CERTIFICATE_METADATA = [
  { id: 1, fileName: "Adobe Participation.pdf", issuer: "Adobe", color: "#DF6C4F" },
  { id: 2, fileName: "CHAT GPT.pdf", issuer: "Certificate", color: "#452215" },
  { id: 3, fileName: "Computational Theory.pdf", issuer: "Certificate", color: "#452215" },
  { id: 4, fileName: "Coursera  computer communication.pdf", issuer: "Coursera", color: "#452215" },
  { id: 5, fileName: "Coursera Certificate.pdf", issuer: "Coursera", color: "#452215" },
  { id: 6, fileName: "Coursera Digital Systems- From Logic Gates to Processors.pdf", issuer: "Coursera", color: "#452215" },
  { id: 7, fileName: "Coursera Fundamentals of Network Communication.pdf", issuer: "Coursera", color: "#452215" },
  { id: 8, fileName: "Coursera Introduction to Hardware and Operating Systems.pdf", issuer: "Coursera", color: "#452215" },
  { id: 9, fileName: "Coursera Packet Switching Networks and Algorithms.pdf", issuer: "Coursera", color: "#452215" },
  { id: 10, fileName: "Coursera Peer-to-Peer Protocols and Local Area Networks.pdf", issuer: "Coursera", color: "#452215" },
  { id: 11, fileName: "Coursera TCP-IP and Advanced Topics.pdf", issuer: "Coursera", color: "#452215" },
  { id: 12, fileName: "Coursera The Bits and Bytes of Computer Networking.pdf", issuer: "Coursera", color: "#452215" },
  { id: 13, fileName: "GEN AI GOOGLE.pdf", issuer: "Google", color: "#FF9398" },
  { id: 14, fileName: "GEN AI UDEMY.pdf", issuer: "Udemy", color: "#DF6C4F" },
  { id: 15, fileName: "IIT ROPAR CERTIFICATE.pdf", issuer: "IIT Ropar", color: "#452215" },
  { id: 16, fileName: "LPU MERN STACK CERTIFICATE.pdf", issuer: "LPU", color: "#452215" },
  { id: 17, fileName: "Launched Web3 Certificate.pdf", issuer: "Certificate", color: "#FF9398" },
  { id: 18, fileName: "NEO COLAB CPP.pdf", issuer: "Neo Colab", color: "#FF9398" },
  { id: 19, fileName: "NEO COLAB DSA.pdf", issuer: "Neo Colab", color: "#FF9398" },
  { id: 20, fileName: "NEO COLAB JAVA.pdf", issuer: "Neo Colab", color: "#FF9398" },
  { id: 21, fileName: "NEO COLLAB C Programming.pdf", issuer: "Neo Colab", color: "#FF9398" },
  { id: 22, fileName: "NO CODE TOOLS.pdf", issuer: "Certificate", color: "#452215" },
  { id: 23, fileName: "TATA Crucible Campus Partipiation.pdf", issuer: "TATA", color: "#452215" },
  { id: 24, fileName: "Udemy Cetrtificate Master gen ai.pdf", issuer: "Udemy", color: "#DF6C4F" },
];

/**
 * Get certificate URL from environment variables
 * @param {number} id - Certificate ID (1-24)
 * @returns {string} Cloudinary URL
 */
export function getCertificateUrl(id) {
  const envKey = `VITE_CERT_${id}`;
  return import.meta.env[envKey] || '';
}

/**
 * Get all certificates with metadata and URLs
 * @returns {Array} Array of certificate objects with url, title, issuer, etc.
 */
export function getCertificates() {
  return CERTIFICATE_METADATA.map(cert => ({
    ...cert,
    title: cert.fileName.replace(/\.[^.]+$/, '').replace(/certificate/gi, '').trim(),
    issuer: cert.issuer,
    color: cert.color,
    url: getCertificateUrl(cert.id),
    previewUrl: getCertificateUrl(cert.id),
    previewEmbedUrl: `${getCertificateUrl(cert.id)}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`,
    downloadUrl: getCertificateUrl(cert.id),
    viewUrl: getCertificateUrl(cert.id),
    certificateId: `cert-${cert.id}`,
    previewType: 'pdf',
    date: 'From Certificate Folder',
  })).sort((a, b) => a.title.localeCompare(b.title));
}
