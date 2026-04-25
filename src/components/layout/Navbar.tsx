import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Work',    href: '#work'    },
  { label: 'About',   href: '#about'   },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b border-gold/10'
            : 'bg-transparent'
        }`}
        style={scrolled ? { backgroundColor: 'var(--nav-blur-bg)' } : {}}
      >
        <nav
          className="max-w-container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Monogram */}
          <a
            href="#"
            className="font-italiana text-gold text-2xl leading-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black rounded-sm"
            aria-label="Rashi Agrawal — home"
          >
            RA
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link font-inter text-xs uppercase tracking-widest text-ivory-muted hover:text-ivory transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: Theme toggle + Phone + hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center w-9 h-9 border border-gold/30 rounded-sm text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <a
              href="tel:+917732800853"
              aria-label="Call the studio"
              className="flex items-center justify-center w-9 h-9 border border-gold/30 rounded-sm text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
            >
              <Phone size={15} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 border border-gold/30 rounded-sm text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink-black/98 backdrop-blur-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span className="font-italiana text-gold text-2xl">RA</span>
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 border border-gold/30 rounded-sm text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8">
              {/* Gold accent line */}
              <div className="w-12 h-px bg-gold mb-12" />
              <ul className="flex flex-col gap-8" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="font-cormorant text-ivory text-4xl font-light hover:text-gold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black rounded-sm"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-16 flex gap-4">
                <a
                  href="tel:+917732800853"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-ivory-muted text-sm font-inter hover:text-gold transition-colors"
                >
                  <Phone size={14} />
                  +91 77328 00853
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
