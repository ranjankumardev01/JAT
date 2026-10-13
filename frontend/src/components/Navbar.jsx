import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-xl font-bold text-white shadow-md shadow-orange-200">
            J
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            Job<span className="text-orange-600">Hub</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-600 transition hover:text-orange-600"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-red-700"
          >
            Get Started <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 text-gray-700 transition hover:bg-orange-50 md:hidden"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-orange-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-4 flex gap-3 border-t border-orange-100 pt-4">
            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full border border-orange-500 px-4 py-3 text-center text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Login
            </a>

            <a
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-orange-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
