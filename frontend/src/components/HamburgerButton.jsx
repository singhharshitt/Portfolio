export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10.5 w-10.5 cursor-pointer flex-col justify-center gap-1.25 rounded-full border border-[#FFF8EE] bg-[#FFFFF0] px-2.75"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span
        className={`block h-0.5 w-full rounded-full bg-[#452215] transition-transform duration-300 ${isOpen ? 'translate-y-1.75 rotate-45' : ''
          }`}
      />
      <span
        className={`block h-0.5 w-full rounded-full bg-[#452215] transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`block h-0.5 w-full rounded-full bg-[#452215] transition-transform duration-300 ${isOpen ? '-translate-y-1.75 -rotate-45' : ''
          }`}
      />
    </button>
  );
}