import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scroll Hero | ITZFIZZ",
  description:
    "A scroll-driven hero animation showcasing ITZFIZZ — smooth, performant, and premium scroll interactions built with GSAP ScrollTrigger.",
  keywords: ["scroll animation", "GSAP", "hero section", "ITZFIZZ", "frontend"],
  openGraph: {
    title: "Scroll Hero | ITZFIZZ",
    description: "Premium scroll-driven car animation built with GSAP & Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
