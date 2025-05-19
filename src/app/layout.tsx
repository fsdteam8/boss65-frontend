import AppProvider from "@/provider/app-provider";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap', 
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Social Chamber 24/7",
  description: "Private Rooms for Unforgettable Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
