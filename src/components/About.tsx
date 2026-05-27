import { useEffect } from 'react';
import { useParallax, useScrollReveal } from '../hooks/useParallax';
import { trackSectionView } from '../lib/supabase';
import { Leaf, Shield, Star, Heart } from 'lucide-react';

const values = [
  { icon: Leaf, title: 'Sustainable', desc: 'Every journey contributes to local conservation and community upliftment.' },
  { icon: Shield, title: 'Trusted', desc: 'A decade of unmatched safety standards and expert local knowledge.' },
  { icon: Star, title: 'Exclusive', desc: 'Private access to hidden gems most travelers never discover.' },
  { icon: Heart, title: 'Personal', desc: 'Each itinerary is unique — tailored to your desires and pace.' },
];

export default function About() {
  const { ref: sectionRef, visible } = useScrollReveal();
  const { ref: imgRef, offset } = useParallax(0.2);

  useEffect(() => {
    if (visible) trackSectionView('about');
  }, [visible]);

  return (
    <section id="about" className="bg-stone-900 py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div
              ref={imgRef}
              className="relative overflow-hidden aspect-[3/4]"
              style={{ transform: `translateY(-${offset * 0.1}px)` }}
            >
              <img
                src="https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bali landscape"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Accent box */}
            <div className="absolute -bottom-8 -right-8 bg-amber-300 p-8 hidden md:block">
              <p
                className="text-stone-950 text-4xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                12
              </p>
              <p className="text-stone-700 text-xs tracking-widest uppercase mt-1">Years<br />Curating Bali</p>
            </div>
          </div>

          {/* Content */}
          <div
            ref={sectionRef}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-6">Our Philosophy</p>
            <h2
              className="text-5xl md:text-6xl text-white font-light leading-tight mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              More Than<br />
              <span className="italic text-amber-200">Travel —</span><br />
              Transformation
            </h2>
            <p className="text-stone-400 text-base leading-relaxed mb-4">
              Ariva was born from a simple belief: that Bali's magic should be experienced without boundaries — no tourist traps, no rushed agendas. Just pure, authentic connection with the island's spirit.
            </p>
            <p className="text-stone-400 text-base leading-relaxed mb-12">
              Our team of local experts, wellness practitioners, and cultural custodians has spent over a decade building relationships with communities, temples, and hidden corners that most visitors never find.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group">
                  <div className="w-10 h-10 border border-amber-300/40 flex items-center justify-center mb-3 group-hover:bg-amber-300 group-hover:border-amber-300 transition-all duration-300">
                    <Icon size={16} className="text-amber-300 group-hover:text-stone-950 transition-colors duration-300" />
                  </div>
                  <h4 className="text-white text-sm font-medium tracking-wide mb-1">{title}</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
