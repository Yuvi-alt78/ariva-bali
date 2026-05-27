import { useState } from 'react';
import { useScrollReveal, useParallax } from '../hooks/useParallax';
import { subscribeNewsletter } from '../lib/supabase';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const { ref: sectionRef, visible } = useScrollReveal();
  const { ref: bgRef, offset } = useParallax(0.25);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await subscribeNewsletter(email, name);
    setStatus(error ? 'error' : 'success');
  };

  return (
    <section className="relative py-28 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ transform: `translateY(-${offset * 0.2}px) scale(1.15)` }}
      >
        <img
          src="https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-stone-950/80" />

      <div
        ref={sectionRef}
        className={`relative z-10 max-w-2xl mx-auto text-center px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-4">Stay Connected</p>
        <h2
          className="text-4xl md:text-5xl text-white font-light mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Island Calls<br />
          <span className="italic text-amber-200">Answer Its Whisper</span>
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-10">
          Receive curated Bali guides, exclusive seasonal offers, and stories from the island — delivered with intention.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle size={32} className="text-amber-300" />
            <p className="text-amber-300 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Welcome to the Ariva circle. The island awaits you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-0">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 bg-stone-950/80 border border-stone-700 sm:border-r-0 px-5 py-4 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-300 transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="flex-1 bg-stone-950/80 border border-stone-700 px-5 py-4 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-300 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto bg-amber-300 text-stone-950 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-amber-200 disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:ml-auto"
            >
              {status === 'loading' ? 'Subscribing...' : (
                <>Subscribe <ArrowRight size={12} /></>
              )}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-xs mt-3">This email may already be subscribed. Try another.</p>
        )}
      </div>
    </section>
  );
}
