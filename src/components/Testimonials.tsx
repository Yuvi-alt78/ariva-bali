import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useParallax';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Isabelle Fontaine',
    location: 'Paris, France',
    text: 'Ariva didn\'t just plan a trip — they crafted a portal into another world. The private temple ceremony at sunrise, the chef\'s tasting dinner by the rice field... I returned home a different person.',
    rating: 5,
    experience: 'Ubud Cultural Immersion',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    location: 'London, UK',
    text: 'The level of detail and care was extraordinary. Our villa was beyond imagination, and every guide they assigned felt more like a wise friend than a tour operator. Truly irreplaceable.',
    rating: 5,
    experience: 'Seminyak Luxury Villa',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    text: 'I\'ve traveled to Bali five times — with Ariva for the last three. The difference is incomparable. They know the island\'s soul and share it generously. Already planning my return.',
    rating: 5,
    experience: 'Nusa Penida Expedition',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 4,
    name: 'Sophie & James',
    location: 'Sydney, Australia',
    text: 'Our honeymoon with Ariva was the most beautiful week of our lives. Private beach dinners, a blessing ceremony by a Balinese priest — they thought of everything before we knew to ask.',
    rating: 5,
    experience: 'Honeymoon Package',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref, visible } = useScrollReveal();

  const go = useCallback((dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  }, [animating, current]);

  useEffect(() => {
    const interval = setInterval(() => go(1), 6000);
    return () => clearInterval(interval);
  }, [go]);

  const t = testimonials[current];

  return (
    <section className="bg-stone-950 py-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-4">Guest Voices</p>
          <h2
            className="text-5xl md:text-6xl text-white font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What Our Guests<br />
            <span className="italic text-amber-200">Carry Home</span>
          </h2>
        </div>

        <div
          className={`transition-all duration-300 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          <div className="text-center mb-10">
            <Quote size={32} className="text-amber-300/30 mx-auto mb-6" />
            <div className="flex justify-center mb-6">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-300/40"
                loading="lazy"
              />
            </div>
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="text-amber-300 fill-amber-300" />
              ))}
            </div>
            <blockquote
              className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8 max-w-3xl mx-auto"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "{t.text}"
            </blockquote>
            <p className="text-amber-300 font-medium text-sm tracking-wider">{t.name}</p>
            <p className="text-stone-500 text-xs mt-1">{t.location} &bull; {t.experience}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-300 hover:text-amber-300 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 transition-all duration-300 rounded-full ${
                  i === current ? 'bg-amber-300 w-6' : 'bg-stone-700 w-2 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="w-10 h-10 border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-300 hover:text-amber-300 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
