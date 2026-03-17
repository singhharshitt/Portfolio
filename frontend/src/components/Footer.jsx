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
    <footer className="pt-20 pb-10 px-10 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr_2fr] gap-12 max-[1200px]:grid-cols-[1fr_1fr_1fr] max-[768px]:grid-cols-1 max-[768px]:gap-7">
        {/* Brand column */}
        <div>
          <h3 className="mb-4 font-[var(--font-display)] text-[2rem] m-0">Harshit.</h3>
          <p className="m-0 max-w-[280px] text-[.95rem] leading-relaxed text-[var(--text-secondary)]">
            Building products with careful structure, expressive interfaces, and measurable outcomes.
          </p>
        </div>

        {/* Nav columns */}
        {COLUMN_LINKS.map((column) => (
          <div key={column.title}>
            <h4 className="m-0 mb-5 font-[var(--font-mono)] text-[.75rem] tracking-[.1em] uppercase text-[var(--text-muted)]">
              {column.title}
            </h4>
            {column.links.map((link) => (
              <button
                key={link.section}
                type="button"
                onClick={() => scrollTo(link.section)}
                className="block w-max border-0 bg-transparent p-0 mb-3 text-[.9rem] text-[var(--text-secondary)] cursor-pointer transition-colors duration-[.2s] hover:text-[var(--cherry-red)]"
              >
                {link.label}
              </button>
            ))}
          </div>
        ))}

        {/* Legal column */}
        <div className="text-[.8rem] leading-relaxed text-[var(--text-muted)]">
          <p>Based in India. Working globally.</p>
          <a
            href="mailto:singhharshit2410@gmail.com"
            className="inline-block my-1.5 text-[var(--text-secondary)] underline underline-offset-[2px] transition-colors duration-[.2s] hover:text-[var(--cherry-red)]"
          >
            singhharshit2410@gmail.com
          </a>
          <p>Available for freelance and full-time roles.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto mt-[60px] pt-10 border-t border-[var(--border)] flex justify-between items-center gap-4 flex-wrap">
        <p className="m-0 font-[var(--font-mono)] text-[.8rem] text-[var(--text-muted)]">
          © 2026 Harshit Singh. All rights reserved.
        </p>
        <button
          type="button"
          className="border-0 bg-transparent p-0 inline-flex items-center gap-2 cursor-pointer text-[var(--text-secondary)] transition-colors duration-[.2s] hover:text-[var(--cherry-red)]"
          onClick={() => scrollTo('hero')}
        >
          <span>Back to top</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </footer>
  );
}

export default memo(Footer);
