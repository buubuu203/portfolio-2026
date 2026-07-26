import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://dangchau.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chau Ngoc Buu Dang — Associate Product Manager",
    template: "%s — Chau Ngoc Buu Dang",
  },
  description:
    "Associate Product Manager with 2 years at Cake by VPBank, sole-owning a platform to 159% of GMV target. Open to product, BA, and technical APM roles across fintech, e-commerce, and platform businesses.",
  openGraph: {
    title: "Chau Ngoc Buu Dang — Associate Product Manager",
    description:
      "Associate Product Manager with 2 years at Cake by VPBank, sole-owning a platform to 159% of GMV target.",
    url: siteUrl,
    siteName: "Chau Ngoc Buu Dang",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chau Ngoc Buu Dang — Associate Product Manager",
    description:
      "Associate Product Manager with 2 years at Cake by VPBank, sole-owning a platform to 159% of GMV target.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`}
        </Script>
        <Preloader />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "var(--foreground)",
              color: "var(--background)",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              padding: "0.75rem 1.25rem",
            },
          }}
        />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
