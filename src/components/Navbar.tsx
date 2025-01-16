"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import styles from "@/components/navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="h-20 px-4 md:px-8 lg:px-12 xl:32 2xl:px-64 relative bg-white shadow-sm">
      {/* Mobile Navbar */}
      <div className="flex h-full items-center justify-between md:hidden">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={24} height={24} />
          <div className="text-2xl font-bold tracking-wide">NIMO</div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>

        {/* Menu Icon */}
        <button
          onClick={toggleMenu}
          className="text-xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 w-full bg-white shadow-md z-50 flex flex-col items-center gap-4 py-4 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link href="/" onClick={closeMenu} className="text-lg font-medium">
          Homepage
        </Link>
        <Link href="/" onClick={closeMenu} className="text-lg font-medium">
          Shop
        </Link>
        <Link href="/" onClick={closeMenu} className="text-lg font-medium">
          Deals
        </Link>
        <Link href="/" onClick={closeMenu} className="text-lg font-medium">
          About
        </Link>
        <Link
          href="/contact"
          onClick={closeMenu}
          className="text-lg font-medium"
        >
          Contact
        </Link>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* Left */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <div className="text-2xl font-bold tracking-wide">NIMO</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
