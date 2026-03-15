export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[42px] w-[42px] cursor-pointer flex-col justify-center gap-[5px] rounded-full border border-[#FFF8EE] bg-[#FFFFF0] px-[11px]"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span
        className={`block h-[2px] w-full rounded-full bg-[#452215] transition-transform duration-300 ${isOpen ? 'translate-y-[7px] rotate-45' : ''
          }`}
      />
      <span
        className={`block h-[2px] w-full rounded-full bg-[#452215] transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`block h-[2px] w-full rounded-full bg-[#452215] transition-transform duration-300 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''
          }`}
      />
    </button>
  );
}
