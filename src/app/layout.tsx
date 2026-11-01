import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

export const metadata = {
    title: 'Blocksmith',
    icons: {
        icon: '/brand/favicon.ico',
        apple: '/brand/apple-touch-icon.png',
        shortcut: '/brand/favicon.ico',
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head></head>
            <body className="flex flex-col min-h-screen">
                <RootProvider theme={{ defaultTheme: 'light', enableSystem: false }}>{children}</RootProvider>
            </body>
        </html>
    );
}