import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useParallax';
import { trackSectionView } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Sunrise Rice Terrace Walk',
    category: 'Nature & Wellness',
    duration: 'Full Day',
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Wander through Tegallalang\'s emerald cascades as dawn mist rises above the valley.',
    price: 'From $280',
  },
  {
    id: 2,
    title: 'Private Villa Spa Retreat',
    category: 'Luxury & Rejuvenation',
    duration: 'Half Day',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Balinese healing rituals, sacred flower baths, and traditional Jamu elixirs.',
    price: 'From $380',
  },
  {
    id: 3,
    title: 'Temple Ceremony & Sunset',
    category: 'Culture & Spirituality',
    duration: 'Evening',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Witness sacred Kecak fire dance at Uluwatu as the sun melts into the Indian Ocean.',
    price: 'From $190',
  },
  {
    id: 4,
    title: 'Culinary Odyssey',
    category: 'Food & Culture',
    duration: 'Full Day',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Market visit, cooking master class, and a seven-course dinner under the stars.',
    price: 'From $220',
  },
  {
    id: 5,
    title: 'Ocean Surfing Safari',
    category: 'Adventure',
    duration: 'Full Day',
    image: 'https://images.pexels.com/photos/1654489/pexels-photo-1654489.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Chase perfect waves from Canggu to Echo Beach with expert instructors by your side.',
    price: 'From $160',
  },
  {
    id: 6,
    title: 'Sacred Forest Meditation',
    category: 'Wellness',
    duration: 'Morning',
    image: 'https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Guided meditation among ancient banyan trees in the heart of Monkey Forest Ubud.',
    price: 'From $140',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={exp.image}
          alt={exp.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        <div className="absolute top-4 left-4">
          <span className="text-amber-300 text-xs tracking-[0.2em] uppercase font-light bg-stone-950/60 backdrop-blur-sm px-3 py-1">
            {exp.category}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="text-stone-300 text-xs tracking-widest uppercase bg-stone-950/60 backdrop-blur-sm px-3 py-1 font-light">
            {exp.duration}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
          <h3
            className="text-white text-xl mb-2 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {exp.title}
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-4">
            {exp.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-amber-300 text-sm font-light">{exp.price}</span>
            <span className="flex items-center gap-1 text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Discover <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experiences() {
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    if (visible) trackSectionView('experiences');
  }, [visible]);

  return (
    <section id="experiences" className="bg-stone-950 py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-4">Curated Journeys</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-6xl text-white font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Exceptional<br />
              <span className="italic text-amber-200">Experiences</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Each journey is crafted to connect you with Bali's soul — its landscapes, traditions, and timeless spirit.
            </p>
          </div>
          <div className="w-16 h-px bg-amber-300/60 mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs tracking-[0.3em] uppercase text-amber-300 border border-amber-300/40 px-10 py-4 hover:bg-amber-300 hover:text-stone-950 transition-all duration-300"
          >
            View All Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
