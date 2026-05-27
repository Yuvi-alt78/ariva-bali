import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useParallax';

const stats = [
  { value: 3800, suffix: '+', label: 'Journeys Crafted' },
  { value: 98, suffix: '%', label: 'Guest Satisfaction' },
  { value: 12, suffix: '', label: 'Years of Excellence' },
  { value: 47, suffix: '+', label: 'Curated Destinations' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="bg-amber-300 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="text-5xl md:text-6xl font-light text-stone-950 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-stone-700 text-xs tracking-[0.3em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
