'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToggleTheme from './ToggleTheme';
import SearchBar from './SearchBar';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Search (hidden on mobile) */}
          <div className="hidden md:block w-1/3">
            <SearchBar className="max-w-xs" />
          </div>

          {/* Center section: Logo */}
          <div className="flex-1 flex justify-center md:flex-initial md:justify-start">
            <Logo />
          </div>

          {/* Right section: Navigation and Theme Toggle */}
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-4 mr-4">
              <Link href="/" className="font-bold hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
              <Link href="/about" className="font-bold hover:text-gray-600 dark:hover:text-gray-300">About</Link>
              <Link href="/contact" className="font-bold hover:text-gray-600 dark:hover:text-gray-300">Contact</Link>
              <Link href="/categories" className="font-bold hover:text-gray-600 dark:hover:text-gray-300">Categories</Link>
              <Link href="/rss.xml" className="font-bold hover:text-gray-600 dark:hover:text-gray-300">RSS Feed</Link>
            </nav>
            <ToggleTheme />
            <button 
              className="md:hidden ml-2 text-foreground"
              onClick={toggleMenu} 
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background py-2">
          <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
          <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
          <Link href="/categories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Categories</Link>
          <Link href="/rss.xml" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">RSS Feed</Link>
        </nav>
      )}

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar />
      </div>
    </header>
  );
}
