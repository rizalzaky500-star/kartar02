/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./script.js"],
    theme: {
        extend: {
            colors: {
                emerald: {
                    950: '#031915',
                    900: '#062c26',
                    800: '#0d473e',
                    700: '#136356',
                    600: '#1b8070',
                    500: '#23a18e',
                    400: '#34caa1',
                    300: '#64e3c2',
                    100: '#d5f7ed',
                    50: '#f0fbf7'
                },
                amber: {
                    gold: '#e0a96d',
                    soft: '#f4d1a6'
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
            },
            // Support arbitrary values
            width: {
                '3px': '3px',
            },
            height: {
                '3px': '3px',
            },
        },
        // Support arbitrary values like bg-[#031915], text-[11px], etc.
        // These are handled automatically by Tailwind JIT
    },
    plugins: [],
}