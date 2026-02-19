export default function ThemeStateIndicator({ isDarkTheme = false }) {
    return (
        <div
            className={`theme-state-indicator ${isDarkTheme ? 'is-dark' : 'is-light'}`}
            aria-live="polite"
            aria-label={isDarkTheme ? 'Dark theme active' : 'Light theme active'}
        >
            <span className="theme-state-indicator__dot" />
            <span className="theme-state-indicator__label">
                {isDarkTheme ? 'DARK' : 'LIGHT'}
            </span>
        </div>
    );
}
