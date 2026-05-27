import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const links = {
  Explore: ['Experiences', 'Destinations', 'Wellness', 'Culture', 'Adventure'],
  Company: ['About Ariva', 'Our Story', 'Sustainability', 'Press', 'Careers'],
  Support: ['Book a Consultation', 'FAQ', 'Travel Insurance', 'Privacy Policy', 'Terms'],
};

export default function Footer() {
  const scrollTo = (label: string) => {
    const idMap: Record<string, string> = {
      'Experiences': 'experiences',
      'Destinations': 'destinations',
      'Wellness': 'experiences',
      'Culture': 'experiences',
      'Adventure': 'experiences',
      'About Ariva': 'about',
      'Our Story': 'about',
      'Book a Consultation': 'contact',
    };
    const id = idMap[label];
    if (id) document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              className="text-3xl font-light tracking-[0.3em] text-amber-300 uppercase mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Ariva
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
              Crafting extraordinary journeys through the heart and soul of Bali since 2013.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-500 hover:border-amber-300 hover:text-amber-300 transition-all duration-300"
                  aria-label={['Instagram', 'Facebook', 'Twitter'][i]}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-xs tracking-[0.3em] uppercase mb-6">{group}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollTo(item)}
                      className="text-stone-500 text-sm hover:text-amber-300 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-stone-800 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="mailto:hello@ariva-bali.com" className="flex items-center gap-3 text-stone-500 hover:text-amber-300 transition-colors group">
              <Mail size={14} className="text-amber-300/60 group-hover:text-amber-300" />
              <span className="text-sm">hello@ariva-bali.com</span>
            </a>
            <a href="tel:+6236180012" className="flex items-center gap-3 text-stone-500 hover:text-amber-300 transition-colors group">
              <Phone size={14} className="text-amber-300/60 group-hover:text-amber-300" />
              <span className="text-sm">+62 361 800 1200</span>
            </a>
            <div className="flex items-center gap-3 text-stone-500">
              <MapPin size={14} className="text-amber-300/60" />
              <span className="text-sm">Jalan Raya Ubud 88, Bali, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-stone-600 text-xs">
            &copy; {new Date().getFullYear()} Ariva Bali. All rights reserved.
          </p>
          <p className="text-stone-700 text-xs tracking-widest uppercase">
            The Island of the Gods
          </p>
        </div>
      </div>
    </footer>
  );
}
