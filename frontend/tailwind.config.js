/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // New palette: Vinho / Gelo / Névoa / Aço
                vinho: {
                    DEFAULT: '#69212C',  // Primary accent
                    light:   '#7d2835',
                    dark:    '#561825',
                },
                gelo: {
                    DEFAULT: '#DCE0E9',  // Light background
                    light:   '#e8ecf3',
                    dark:    '#cdd3de',
                },
                nevoa: {
                    DEFAULT: '#8CA2AD',  // Secondary neutral
                    light:   '#b8c6ce',
                    dark:    '#6d8894',
                },
                aco: {
                    DEFAULT: '#27353E',  // Dark surface
                    light:   '#3d4f5a',
                    dark:    '#1d2a32',
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
}
