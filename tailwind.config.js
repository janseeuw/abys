/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'accent': '#00A3A3', // Teal accent color
		'accent-dark': '#007373', // Darker teal accent color
        'charcoal': '#333333', // Deep charcoal for text
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem', // For extra large spacing
      },
      maxWidth: {
        'prose': '60ch', // Optimal reading width
      },
      height: {
        'screen-90': '90vh',
      },
      lineHeight: {
        'relaxed': '1.75',
      },
      fontSize: {
        'heading': ['3rem', { lineHeight: '1.2' }],
        'subheading': ['1.5rem', { lineHeight: '1.4' }],
        'body': ['1.125rem', { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [],
}
