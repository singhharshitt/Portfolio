export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[42px] h-[42px] rounded-full border border-[var(--border)] bg-[var(--surface)] inline-flex flex-col justify-center gap-[5px] px-[11px] cursor-pointer"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span
        className={`block h-[2px] w-full bg-[var(--text-primary)] rounded-full transition-transform duration-300 ${isOpen ? 'translate-y-[7px] rotate-45' : ''
          }`}
      />
      <span
        className={`block h-[2px] w-full bg-[var(--text-primary)] rounded-full transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`block h-[2px] w-full bg-[var(--text-primary)] rounded-full transition-transform duration-300 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''
          }`}
      />
    </button>
  );
}
