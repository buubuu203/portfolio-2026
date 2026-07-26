import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { education, identity, siteUrl } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chau Ngoc Buu Dang — Associate Product Manager",
    template: "%s — Chau Ngoc Buu Dang",
  },
  description:
    "Associate Product Manager with 2 years at Cake by VPBank, sole-owning a platform to 159% of GMV target. Open to product, BA, and technical APM roles across fintech, e-commerce, and platform businesses.",
  keywords: [
    "Chau Ngoc Buu Dang",
    "Associate Product Manager",
    "Technical Product Manager",
    "Product Owner",
    "Cake by VPBank",
    "CTicket Platform",
    "fintech product management",
    "Ho Chi Minh City",
    "University of Information Technology",
    "UIT VNU-HCM",
    education.studentId,
  ],
  authors: [{ name: identity.name, url: siteUrl }],
  creator: identity.name,
  publisher: identity.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Chau Ngoc Buu Dang — Associate Product Manager",
    description:
      "Associate Product Manager with 2 years at Cake by VPBank, sole-owning a platform to 159% of GMV target.",
    url: siteUrl,
    siteName: "Chau Ngoc Buu Dang",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chau Ngoc Buu Dang — Associate Product Manager",
    description:
      "Associate Product Manager with 2 years at Cake by VPBank, sole-owning a platform to 159% of GMV target.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  url: siteUrl,
  jobTitle: identity.heroHeadline,
  worksFor: {
    "@type": "Organization",
    name: "Cake by VPBank",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: identity.location,
  },
  email: `mailto:${identity.email}`,
  sameAs: [identity.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  identifier: {
    "@type": "PropertyValue",
    name: "UIT Student ID",
    value: education.studentId,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Preloader>
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
        </Preloader>
      </body>
    </html>
  );
}
