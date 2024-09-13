/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Hide default scrollbar */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none',  /* Safari and Chrome */
          },
        },
        '.scrollbar-thin': {
          /* Custom thin scrollbar */
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4a5568', /* Customize scrollbar color */
            borderRadius: '9999px', /* Fully rounded ends */
          },
        },
        '.scrollbar-thin:hover': {
          /* Custom hover state */
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#2d3748', /* Darker on hover */
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
}



