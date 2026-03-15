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
      className="relative overflow-hidden bg-[#FFF8EE] py-[160px] text-center"
    >
      <div className="mx-auto w-[min(1400px,calc(100%-80px))]">
        <div className="reveal-item mx-auto mb-12 max-w-[500px] opacity-90" aria-hidden="true">
          <svg viewBox="0 0 600 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 70C115 15 190 125 300 70C410 15 495 125 580 70"
              stroke="#DF6C4F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 10"
            />
          </svg>
        </div>

        <h2 className="font-fliege reveal-item m-0 mb-4 text-[clamp(2.5rem,6vw,4.5rem)] text-[#452215]">
          Let&apos;s Build Together
        </h2>
        <p className="font-bodycopy reveal-item mx-auto mb-12 mt-0 max-w-[500px] text-xl text-[#452215]">
          Open to freelance, full-time, and collaboration opportunities.
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {SOCIALS.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui reveal-item inline-flex items-center gap-3 rounded-full border border-[#FFFFF0] bg-[#FFFFF0] px-7 py-4 no-underline text-[#452215] transition-all duration-[.4s] hover:border-[#DF6C4F] hover:bg-[#DF6C4F] hover:text-[#FFFFF0] hover:-translate-y-[3px]"
                data-reveal-delay={`${index * 0.06}`}
              >
                <Icon />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        <a
          href="mailto:singhharshit2410@gmail.com"
          className="font-ui reveal-item inline-flex items-center gap-4 rounded-full bg-[#452215] px-10 py-5 text-[1.05rem] text-[#FFFFF0] no-underline transition-all duration-[.4s] hover:bg-[#FF9398] hover:text-[#452215] hover:translate-x-2"
        >
          <Mail size={20} />
          <span>singhharshit2410@gmail.com</span>
          <Send size={18} />
        </a>
      </div>
    </section>
  );
}
