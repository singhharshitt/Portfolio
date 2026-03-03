export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`navbar-menu-button ${isOpen ? 'open' : ''}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
