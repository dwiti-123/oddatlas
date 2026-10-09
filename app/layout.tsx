import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://odd-atlas.dwitimehta20.chatgpt.site'),
  title: { default:'Odd Atlas — Unusual places, carefully explored',template:'%s | Odd Atlas' },
  description: 'Explore a small collection of ghost towns, local legends, and extraordinary stays. Real photographs, clear context, and sources.',
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
