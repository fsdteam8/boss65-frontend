import Link from "next/link";
import { Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#191919]">
      <div className="container mx-auto py-[25px] md:py-[40px] lg:py-[60px]">
        <div className="flex flex-col md:flex-row justify-between items-center pb-[20px] md:pb-0">
          {/* Logo and brand */}

          <div className="relative">
            <Image
              src="/img/logo.png"
              alt="Social Chamber"
              width={120}
              height={120}
              className="w-full h-[120px] object-cover"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-0 font-poppins text-sm text-white font-medium leading-[120%] tracking-[0%]">
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Couples
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Individual
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Group
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Our Unique Experience
            </Link>
            <Link href="/privacy" className="hover:text-[#ff6b00] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-condition" className="hover:text-[#ff6b00] transition-colors">
              Terms & Conditions
            </Link>
          </nav>

          {/* Social icons */}
          <div className="flex gap-4">
            <Link
              href="#"
              className="bg-[#FFCE71] text-black rounded-full p-2 hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="bg-[#FFCE71] text-black rounded-full p-2 hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Divider */}
        {/* <div className="border-t border-[#FFCE71] my-4"></div> */}

        {/* Copyright */}
        <div className="text-center font-poppins text-sm max-w-[1296px] mx-auto text-[#CBD5E1] pt-[25px] md:pt-[35px] lg:pt-[43px] border-t border-[#FFCE71]">
          © Copyright 2025, All Rights Reserved by Social Chamber
        </div>
      </div>
    </footer>
  );
}
