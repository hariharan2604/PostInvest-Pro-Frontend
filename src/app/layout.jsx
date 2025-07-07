import "@/styles/globals.scss";
import { inter } from "@/app/fonts";
import { TitleProvider } from "@/contexts/TitleContext";
export const metadata = {
    title: 'Post Invest Pro',
    description: 'Welcome to Post Invest Pro',
    charset: 'utf-8',
    robots: 'index, follow', // Allows search engines to index the page and follow links
    referrer: 'no-referrer', // Prevents referrer information from being shared
    author: 'Your Name or Company', // Optional: Declare the author of the page
    keywords: 'investing, finance, Post Invest Pro, secure investments', // Optional: Add relevant keywords for SEO
    'http-equiv': {
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; object-src 'none';", // Prevents external scripts from being executed
        'X-Content-Type-Options': 'nosniff', // Prevents MIME-type sniffing
        'X-Frame-Options': 'DENY', // Prevents clickjacking by disallowing framing
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', // Enforces HTTPS
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ fontFamily: 'var(--font-inter)' }}>
                <TitleProvider>
                    <main className={inter.className}>
                        {children}
                    </main>
                </TitleProvider>
            </body>
        </html>
    );

}