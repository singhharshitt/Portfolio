import { Mail, Send } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/singhharshitt', icon: SiGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/singh-harshit-', icon: SiLinkedin },
  { label: 'X / Twitter', href: 'https://twitter.com/singhharshitt', icon: SiX },
];

export default function ConnectSection() {
  return (
    <section id="connect" className="connect-section">
      <div className="section-container">
        <div className="connect-visual reveal-item" aria-hidden="true">
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

        <h2 className="connect-title reveal-item">Let&apos;s Build Together</h2>
        <p className="connect-subtitle reveal-item">
          Open to freelance, full-time, and collaboration opportunities.
        </p>

        <div className="social-grid">
          {SOCIALS.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link reveal-item"
                data-reveal-delay={`${index * 0.06}`}
              >
                <Icon />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        <a href="mailto:singhharshit2410@gmail.com" className="connect-email reveal-item">
          <Mail size={20} />
          <span>singhharshit2410@gmail.com</span>
          <Send size={18} />
        </a>
      </div>
    </section>
  );
}
