import { BadgeCheck } from 'lucide-react';

const CERTIFICATES = [
  {
    title: 'Meta Front-End Developer',
    issuer: 'Coursera',
    date: 'Issued 2024',
    certificateId: 'META-FED-2024-11',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Advanced React Patterns',
    issuer: 'Udemy',
    date: 'Issued 2023',
    certificateId: 'UDEMY-REACT-2023-07',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Network Communication',
    issuer: 'Coursera',
    date: 'Issued 2024',
    certificateId: 'COURSERA-NET-2024-03',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Certificates() {
  return (
    <section id="certificates-section" className="certificates-section">
      <div className="section-container">
        <header className="projects-header reveal-item">
          <p className="projects-label">Credentials</p>
          <h2 className="projects-title">
            Verified <em>Certificates</em>
          </h2>
        </header>

        <div className="certificates-grid">
          {CERTIFICATES.map((item, index) => (
            <article
              key={item.certificateId}
              className="certificate-card reveal-item"
              data-reveal-delay={`${index * 0.08}`}
            >
              <div className="certificate-image-wrap">
                <img src={item.image} alt={item.title} className="certificate-image" loading="lazy" />
                <span className="certificate-badge" aria-hidden="true">
                  <BadgeCheck size={18} />
                </span>
              </div>

              <div className="certificate-content">
                <h3 className="certificate-title">{item.title}</h3>
                <p className="certificate-issuer">{item.issuer}</p>
                <p className="certificate-date">{item.date}</p>
                <p className="certificate-id">{item.certificateId}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
