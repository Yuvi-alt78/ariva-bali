import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useParallax';
import { trackSectionView } from '../lib/supabase';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Ubud',
    region: 'Central Highlands',
    description: 'The cultural heart of Bali — rice terraces, healing arts, and sacred monkey forests await.',
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=900',
    highlights: ['Tegallalang Rice Terraces', 'Tirta Empul Temple', 'Campuhan Ridge Walk'],
    mood: 'Soulful & Serene',
  },
  {
    name: 'Seminyak',
    region: 'Southwest Coast',
    description: 'Where refined beach culture meets world-class dining and golden sunset rituals.',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=900',
    highlights: ['Sunset Beach Clubs', 'Boutique Villas', 'Michelin Dining'],
    mood: 'Vibrant & Luxurious',
  },
  {
    name: 'Uluwatu',
    region: 'Bukit Peninsula',
    description: 'Dramatic clifftop temples, untamed surf breaks, and infinite blue panoramas.',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=900',
    highlights: ['Uluwatu Temple', 'Suluban Beach', 'Kecak Fire Dance'],
    mood: 'Wild & Mystical',
  },
  {
    name: 'Nusa Penida',
    region: 'Sacred Island',
    description: "Raw natural wonders — manta rays, Kelingking's T-Rex cliff, and crystalline coves.",
    image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=900',
    highlights: ['Kelingking Beach', 'Angel Billabong', 'Crystal Bay Diving'],
    mood: 'Untamed & Pristine',
  },
];

function DestCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const { ref, visible } = useScrollReveal();
  const isLarge = index === 0 || index === 3;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden cursor-pointer ${isLarge ? 'row-span-2' : ''} transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={`relative overflow-hidden ${isLarge ? 'h-full min-h-[500px]' : 'h-72'}`}>
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
        <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-colors duration-500" />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-1 mb-2">
            <MapPin size={10} className="text-amber-300" />
            <span className="text-amber-300 text-xs tracking-widest uppercase">{dest.region}</span>
          </div>
          <h3
            className="text-white mb-1 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isLarge ? '2.5rem' : '1.75rem' }}
          >
            {dest.name}
          </h3>
          <p className="text-stone-300/70 text-xs italic mb-4">{dest.mood}</p>

          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-stone-300 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {dest.description}
            </p>

            <ul className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '100ms' }}>
              {dest.highlights.map((h) => (
                <li key={h} className="text-amber-300/80 text-xs tracking-wide flex items-center gap-2">
                  <span className="w-4 h-px bg-amber-300/60" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    if (visible) trackSectionView('destinations');
  }, [visible]);

  return (
    <section id="destinations" className="bg-stone-900 py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-4">Sacred Lands</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-6xl text-white font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Iconic<br />
              <span className="italic text-amber-200">Destinations</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              From misty highland temples to sun-drenched coastal escapes — every corner of Bali holds a story.
            </p>
          </div>
          <div className="w-16 h-px bg-amber-300/60 mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-72">
          {destinations.map((dest, i) => (
            <DestCard key={dest.name} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
