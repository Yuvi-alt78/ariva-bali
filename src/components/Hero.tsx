import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackPageView } from '../lib/supabase';

const slides = [
  {
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tagline: 'Where Heaven',
    tagline2: 'Meets Earth',
    sub: 'Ubud & Sacred Highlands',
  },
  {
    image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tagline: 'Infinite Blue',
    tagline2: 'Horizons',
    sub: 'Seminyak & Coastal Retreats',
  },
  {
    image: 'https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tagline: 'Ancient Temples',
    tagline2: 'Timeless Grace',
    sub: 'Tanah Lot & Sacred Sites',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    trackPageView();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroH = heroRef.current.offsetHeight;
        if (scrollY < heroH) {
          setParallaxY(scrollY * 0.45);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTransitioning(false);
      }, 800);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === current || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 400);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setCurrent((c) => (c + 1) % slides.length);
          setTransitioning(false);
        }, 800);
      }, 6000);
    }
  }, [current, transitioning]);

  const scrollDown = () => {
    document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = slides[current];

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image with parallax */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translateY(${parallaxY}px) scale(1.15)`, transformOrigin: 'center top' }}
      >
        <img
          src={slide.image}
          alt={slide.sub}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/20 to-stone-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent" />

      {/* Animated grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-4 font-light">
            {slide.sub}
          </p>
          <h1
            className="text-white leading-none mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block text-6xl md:text-8xl lg:text-9xl font-light">{slide.tagline}</span>
            <span className="block text-6xl md:text-8xl lg:text-9xl font-extralight italic text-amber-200">{slide.tagline2}</span>
          </h1>
          <p className="text-stone-300 text-sm tracking-widest max-w-sm font-light mb-10">
            Curated luxury experiences in the Island of the Gods
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-amber-300 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium hover:bg-amber-200 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
            >
              Begin Your Journey
            </button>
            <button
              onClick={() => document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-white/40 text-white text-xs tracking-[0.2em] uppercase font-light hover:border-amber-300/80 hover:text-amber-300 transition-all duration-300"
            >
              Explore Experiences
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-0.5 transition-all duration-500 ${i === current ? 'h-10 bg-amber-300' : 'h-4 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-amber-300 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </button>

      {/* Bottom text bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-3 flex justify-between items-center">
          <span className="text-stone-400 text-xs tracking-widest">BALI, INDONESIA</span>
          <span className="text-stone-400 text-xs tracking-widest">EST. 2018</span>
        </div>
      </div>
    </section>
  );
}
