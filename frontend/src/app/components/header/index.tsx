'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ~~~~~~ Types

export interface NavType {
  link: string;
  text: string;
}

interface Props {
  keepHeaderSolid?: boolean;
  mainNavLinks: NavType[];
}

// ~~~~~~ Component

export default function Header({ mainNavLinks, keepHeaderSolid }: Props) {
  // ~~~~~~ States

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);

  // ~~~~~~ Handlers

  function handleScroll() {
    setIsHeaderSolid(window.scrollY > 50);
  }

  // ~~~~~~ Effects

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ~~~~~~ Render

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        keepHeaderSolid || isHeaderSolid
          ? 'bg-[#1b1f1b] bg-opacity-95'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#18ff6d]">
          Bicycle shop
        </Link>

        <nav className="hidden md:flex space-x-6">
          {mainNavLinks.map((navLink) => (
            <Link
              key={navLink.link}
              href={navLink.link}
              className="text-gray-300 hover:text-[#18ff6def] transition-colors font-semibold"
            >
              {navLink.text}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#1b1f1b] bg-opacity-95 shadow-md h-screen"
          >
            <nav className="flex flex-col items-center py-4">
              {mainNavLinks.map((navLink) => (
                <Link
                  key={navLink.link}
                  href={navLink.link}
                  className="py-2 text-gray-300 hover:text-[#18ff6def] transition-colors"
                >
                  {navLink.text}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
