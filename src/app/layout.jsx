import "@/styles/globals.scss";
import { inter } from "@/styles/fonts";
export const metadata = {
    title: 'Post Invest Pro',
    description: 'Welcome to Post Invest Pro',
}
export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body style={{ fontFamily: 'var(--font-inter)' }}>
                <main className={inter.className}>
                    {children}
                </main>
            </body>
        </html>
    );

}