/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom color palette for sand/beige aesthetics
                sand: {
                    100: '#F7F4F3',  // Warm off-white
                    200: '#ECE2D0',  // Soft neutral beige  
                    300: '#DCC48E',  // Soft gold-beige
                },
                // Charcoal colors
                charcoal: '#252627',  // Dark charcoal for text
                bronze: {
                    400: '#C69C72',  // Muted bronze
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
