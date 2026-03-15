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
    <footer className="border-t border-[#DF6C4F]/20 bg-[#452215] px-10 pb-10 pt-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[2fr_1fr_1fr_1fr_2fr] gap-12 max-[1200px]:grid-cols-[1fr_1fr_1fr] max-[768px]:grid-cols-1 max-[768px]:gap-7">
        <div>
          <h3 className="font-fliege m-0 mb-4 text-[2rem] text-[#FFFFF0]">Harshit.</h3>
          <p className="font-bodycopy m-0 max-w-[280px] text-[.95rem] leading-relaxed text-[#FFF8EE]">
            Building products with careful structure, expressive interfaces, and measurable outcomes.
          </p>
        </div>

        {COLUMN_LINKS.map((column) => (
          <div key={column.title}>
            <h4 className="font-mono-ui m-0 mb-5 text-[.75rem] uppercase tracking-[.18em] text-[#FF9398]">
              {column.title}
            </h4>
            {column.links.map((link) => (
              <button
                key={link.section}
                type="button"
                onClick={() => scrollTo(link.section)}
                className="font-ui mb-3 block w-max cursor-pointer border-0 bg-transparent p-0 text-[.9rem] text-[#FFF8EE] transition-colors duration-[.2s] hover:text-[#49C5B6]"
              >
                {link.label}
              </button>
            ))}
          </div>
        ))}

        <div className="font-bodycopy text-[.8rem] leading-relaxed text-[#FFF8EE]">
          <p>Based in India. Working globally.</p>
          <a
            href="mailto:singhharshit2410@gmail.com"
            className="my-1.5 inline-block text-[#FFF8EE] underline underline-offset-[2px] transition-colors duration-[.2s] hover:text-[#49C5B6]"
          >
            singhharshit2410@gmail.com
          </a>
          <p>Available for freelance and full-time roles.</p>
        </div>
      </div>

      <div className="mx-auto mt-[60px] flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-[#DF6C4F]/20 pt-10">
        <p className="font-mono-ui m-0 text-[.8rem] text-[#FFF8EE]">
          © 2026 Harshit Singh. All rights reserved.
        </p>
        <button
          type="button"
          className="font-ui inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[#FFF8EE] transition-colors duration-[.2s] hover:text-[#49C5B6]"
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
