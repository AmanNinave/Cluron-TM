import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cluron-TM",
  description: "Finally, a task manager that works for you.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Cluron-TM",
    description: "Finally, a task manager that works for you.",
    url: "https://cluron-tm.vercel.app",
    siteName: "Cluron-TM",
    images: [
      {
        url: "https://cluron-tm.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cluron-TM",
    description: "Finally, a task manager that works for you.",
    images: ["https://cluron-tm.vercel.app/og-image.png"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Cluron-TM",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://cluron-tm.vercel.app"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    nosnippet: false,
    noarchive: false
  },
  alternates: {
    canonical: "https://cluron-tm.vercel.app",
    types: {
      "application/rss+xml": "https://cluron-tm.vercel.app/feed.xml",
      "application/atom+xml": "https://cluron-tm.vercel.app/feed.atom",
    },
  },
  verification: {
    google: "google-site-verification=your-google-verification-code",
    yandex: "yandex-verification-code",
    other: {
      name: "BingSiteAuth",
      value: "your-bing-site-auth-code",
    },
  },
  keywords: [
    "task manager",
    "productivity",
    "project management",
    "team collaboration",
    "Cluron-TM",
  ],
  authors: [
    {
      name: "Cluron Team",
      url: "https://cluron-tm.vercel.app/about",
    },
  ],
  creator: "Cluron Team",
  publisher: "Cluron-TM",
  applicationName: "Cluron-TM",
  category: "Productivity"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

          <Toaster richColors />
        </body>
      </html>
    </AuthProvider>
  );
}
