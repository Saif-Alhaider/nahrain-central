/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js,jsx}","./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens:{
        'tablet': { 'raw': '(max-height: 642px)' },
      },
      colors:{
        primary: 'rgba(var(--primary))',
        background: 'rgba(var(--background))',
        card: 'rgba(var(--card))',
        secondary: 'rgba(var(--secondary))',
        onBackground: 'rgba(var(--on-background))',
        selectedItem: 'rgba(var(--selected-item))',
        strokeGray: 'rgba(var(--stroke-gray))',
        logo: 'rgba(var(--logo))',
        onBackgroundCaption: 'rgba(var(--on-background-caption))',
        error: 'rgba(var(--error))',
        onPrimary: 'rgba(var(--on-primary))',
        softGray: 'rgba(var(--soft-gray))',
      },
      fontFamily:{
        notoSans:"Noto Sans",
        rubik:"Rubik"
      }
    },
  },
  plugins: [],
}
