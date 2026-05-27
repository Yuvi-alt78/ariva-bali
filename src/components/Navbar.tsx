import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Experiences', href: '#experiences' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Stories', href: '#stories' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-2xl font-light tracking-[0.3em] text-amber-300 uppercase select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ariva
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNav(link.href)}
                className="relative text-xs tracking-[0.2em] uppercase text-stone-300 hover:text-amber-300 transition-colors duration-300 font-light after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNav('#contact')}
          className="hidden md:block text-xs tracking-[0.2em] uppercase border border-amber-300/60 text-amber-300 px-6 py-2.5 hover:bg-amber-300 hover:text-stone-950 transition-all duration-300 font-light"
        >
          Book Now
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-200 relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu - fullscreen overlay */}
      <div
        className={`md:hidden fixed inset-0 top-0 bg-stone-950/98 backdrop-blur-lg transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              className={`transition-all duration-500 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 80 + 150}ms` : '0ms' }}
            >
              <button
                onClick={() => handleNav(link.href)}
                className="text-lg tracking-[0.3em] uppercase text-stone-300 hover:text-amber-300 transition-colors font-light"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li
            className={`transition-all duration-500 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: menuOpen ? `${navLinks.length * 80 + 150}ms` : '0ms' }}
          >
            <button
              onClick={() => handleNav('#contact')}
              className="text-sm tracking-[0.3em] uppercase border border-amber-300/60 text-amber-300 px-10 py-3 hover:bg-amber-300 hover:text-stone-950 transition-all duration-300"
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
