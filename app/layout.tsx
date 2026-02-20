import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import IpTracker from "./components/IpTracker";

export const metadata: Metadata = {
  title: {
    default: "Navdeep",
    template: "%s | Navdeep",
  },
  description: "Im Navdeep, a coder and a buisness nerd.",
  openGraph: {
    title: "Navdeep",
    description:
      "Im Navdeep, a coder and a buisness nerd.",
    url: "https://navdeep.online",
    siteName: "Navdeep  ",
    images: [
      {
        url: "https://navdeep.online/banner.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Navdeep",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://navdeep.online/api/rss",
    },
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <IpTracker />
        {children}
      </body>
    </html>
  );
}
