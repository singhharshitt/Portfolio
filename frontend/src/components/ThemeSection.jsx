/**
 * ThemeSection - lightweight wrapper used for section-level grouping.
 * Global theme switching is controlled from the Skills trigger.
 */
export default function ThemeSection({ children, theme = 'light', className = '', id, ...props }) {
    return (
        <section
            id={id}
            data-theme-section={theme}
            className={`theme-section min-h-[400px] ${className}`}
            {...props}
        >
            {children}
        </section>
    );
}
