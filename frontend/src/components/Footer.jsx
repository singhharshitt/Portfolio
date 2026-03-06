import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

const COLUMN_LINKS = [
  {
    title: 'Navigation',
    links: [
      { label: 'About', section: 'about' },
      { label: 'Timeline', section: 'timeline' },
      { label: 'Skills', section: 'skills' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Tech Stack', section: 'techstack' },
      { label: 'Projects', section: 'projects-showcase' },
      { label: 'Interests', section: 'interests' },
    ],
  },
  {
    title: 'Content',
    links: [
      { label: 'Certificates', section: 'certificates-section' },
      { label: 'Blog', section: 'blog' },
      { label: 'Connect', section: 'connect' },
    ],
  },
];

function scrollTo(section) {
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3 className="footer-brand">Harshit.</h3>
          <p className="footer-tagline">
            Building products with careful structure, expressive interfaces, and measurable outcomes.
          </p>
        </div>

        {COLUMN_LINKS.map((column) => (
          <div key={column.title} className="footer-column">
            <h4>{column.title}</h4>
            {column.links.map((link) => (
              <button key={link.section} type="button" onClick={() => scrollTo(link.section)}>
                {link.label}
              </button>
            ))}
          </div>
        ))}

        <div className="footer-legal">
          <p>Based in India. Working globally.</p>
          <a href="mailto:singhharshit2410@gmail.com">singhharshit2410@gmail.com</a>
          <p>Available for freelance and full-time roles.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 Harshit Singh. All rights reserved.</p>
        <button type="button" className="footer-back-top" onClick={() => scrollTo('hero')}>
          <span>Back to top</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </footer>
  );
}

export default memo(Footer);
