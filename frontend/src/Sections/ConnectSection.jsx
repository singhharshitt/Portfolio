import { Mail, Send } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/singhharshitt', icon: SiGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/singh-harshit-', icon: SiLinkedin },
  { label: 'X / Twitter', href: 'https://twitter.com/singhharshitt', icon: SiX },
];

export default function ConnectSection() {
  return (
    <section
      id="connect"
      className="py-[160px] bg-[var(--bg-primary)] text-center relative overflow-hidden"
    >
      <div className="w-[min(1400px,calc(100%-80px))] mx-auto">
        {/* Decorative wavy SVG */}
        <div className="max-w-[500px] mx-auto mb-12 opacity-90 reveal-item" aria-hidden="true">
          <svg viewBox="0 0 600 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 70C115 15 190 125 300 70C410 15 495 125 580 70"
              stroke="var(--burnt-caramel)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 10"
            />
          </svg>
        </div>

        <h2 className="m-0 mb-4 font-[var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] reveal-item">
          Let&apos;s Build Together
        </h2>
        <p className="mt-0 mx-auto mb-12 max-w-[500px] font-[var(--font-heading)] text-xl text-[var(--text-secondary)] reveal-item">
          Open to freelance, full-time, and collaboration opportunities.
        </p>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {SOCIALS.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 border border-[var(--border)] rounded-full no-underline text-[var(--text-secondary)] transition-all duration-[.4s] hover:bg-[var(--cherry-red)] hover:text-[var(--text-inverse)] hover:border-[var(--cherry-red)] hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(158,27,45,.25)] reveal-item"
                data-reveal-delay={`${index * 0.06}`}
              >
                <Icon />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Email CTA */}
        <a
          href="mailto:singhharshit2410@gmail.com"
          className="inline-flex items-center gap-4 px-10 py-5 rounded-full no-underline bg-[rgba(158,27,45,.08)] text-[var(--cherry-red)] text-[1.05rem] font-medium transition-all duration-[.4s] hover:bg-[var(--cherry-red)] hover:text-[var(--text-inverse)] hover:translate-x-2 hover:shadow-[0_15px_40px_rgba(158,27,45,.3)] reveal-item"
        >
          <Mail size={20} />
          <span>singhharshit2410@gmail.com</span>
          <Send size={18} />
        </a>
      </div>
    </section>
  );
}
