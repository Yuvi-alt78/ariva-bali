import { useParallax, useScrollReveal } from '../hooks/useParallax';

interface Props {
  image: string;
  quote: string;
  author: string;
  id?: string;
}

export default function ParallaxBanner({ image, quote, author, id }: Props) {
  const { ref: parallaxRef, offset } = useParallax(0.3);
  const { ref: textRef, visible } = useScrollReveal();

  return (
    <section id={id} className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center">
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ transform: `translateY(-${offset * 0.3}px) scale(1.2)`, transformOrigin: 'center center' }}
      >
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-stone-950/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/20 to-stone-950" />

      <div
        ref={textRef}
        className={`relative z-10 text-center px-8 max-w-4xl transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-px h-16 bg-amber-300/60 mx-auto mb-8" />
        <blockquote
          className="text-3xl md:text-5xl text-white font-light leading-tight mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          "{quote}"
        </blockquote>
        <p className="text-amber-300 text-xs tracking-[0.4em] uppercase">— {author}</p>
        <div className="w-px h-16 bg-amber-300/60 mx-auto mt-8" />
      </div>
    </section>
  );
}
