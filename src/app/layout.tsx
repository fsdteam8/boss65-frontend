import AppProvider from "@/provider/app-provider";
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';
import { Manrope } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap', 
});


const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Choose weights you need
  variable: '--font-manrope', // Optional: useful for Tailwind integration
  display: 'swap', // Optional: avoids blocking rendering
})



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
        className={`${poppins.variable} ${manrope.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
