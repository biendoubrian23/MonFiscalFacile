"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-offwhite/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-charcoal">
            MonFiscalFacile
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#comment-ca-marche" 
              className="text-slate hover:text-charcoal transition-colors"
            >
              Comment ça marche
            </Link>
            <Link 
              href="/pricing" 
              className="text-slate hover:text-charcoal transition-colors"
            >
              Tarifs
            </Link>
            <Link 
              href="/connexion" 
              className="text-slate hover:text-charcoal transition-colors"
            >
              Connexion
            </Link>
            <Link 
              href="/simulation"
              className="bg-primary-500 text-white px-6 py-2.5 font-medium hover:bg-primary-600 transition-all duration-200"
            >
              Simuler gratuitement
            </Link>
          </nav>

          {/* Menu Mobile Button */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <Link 
              href="#comment-ca-marche" 
              className="text-slate hover:text-charcoal transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link 
              href="/pricing" 
              className="text-slate hover:text-charcoal transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link 
              href="/connexion" 
              className="text-slate hover:text-charcoal transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link 
              href="/simulation"
              className="bg-primary-500 text-white px-6 py-3 font-medium hover:bg-primary-600 transition-all duration-200 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Simuler gratuitement
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
