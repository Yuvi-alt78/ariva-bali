import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useParallax';
import { submitBookingInquiry, trackSectionView } from '../lib/supabase';
import { Send, CheckCircle, Loader } from 'lucide-react';

const destinations = ['Ubud', 'Seminyak', 'Uluwatu', 'Nusa Penida', 'Canggu', 'Custom Itinerary'];

export default function BookingForm() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', destination: '', travel_date: '', guests: 2, message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (visible) trackSectionView('contact');
  }, [visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'guests' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    const { error } = await submitBookingInquiry(form);
    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    } else {
      setStatus('success');
    }
  };

  const inputClass = 'w-full bg-transparent border-b border-stone-700 py-3 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-300 transition-colors duration-300';
  const labelClass = 'block text-stone-500 text-xs tracking-[0.2em] uppercase mb-2';

  if (status === 'success') {
    return (
      <section id="contact" className="bg-stone-950 py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle size={48} className="text-amber-300 mx-auto mb-6" />
          <h3
            className="text-4xl text-white font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Your Journey Awaits
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Thank you, {form.name}. Our Bali specialists will reach out within 24 hours to begin crafting your perfect escape.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-stone-950 py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-6">Begin Your Story</p>
            <h2
              className="text-5xl md:text-6xl text-white font-light leading-tight mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Let's Design<br />
              <span className="italic text-amber-200">Your Escape</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed mb-12">
              Share your vision and our Bali specialists will craft an entirely personalized journey — from private villa selection to sacred temple ceremonies, every detail attended to.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-px h-12 bg-amber-300/60 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium mb-1">Response within 24 hours</p>
                  <p className="text-stone-500 text-xs">Our specialists work across time zones for you</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-px h-12 bg-amber-300/60 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium mb-1">No obligation consultation</p>
                  <p className="text-stone-500 text-xs">Explore possibilities before committing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-px h-12 bg-amber-300/60 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium mb-1">Fully bespoke itineraries</p>
                  <p className="text-stone-500 text-xs">Every journey unique to your desires</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 000 000 0000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Destination</label>
                <select name="destination" value={form.destination} onChange={handleChange} className={`${inputClass} bg-stone-950`}>
                  <option value="" className="bg-stone-950">Select destination</option>
                  {destinations.map((d) => (
                    <option key={d} value={d} className="bg-stone-950">{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Travel Date</label>
                <input name="travel_date" type="date" value={form.travel_date} onChange={handleChange} className={`${inputClass} [color-scheme:dark]`} />
              </div>
              <div>
                <label className={labelClass}>Number of Guests</label>
                <input name="guests" type="number" min={1} max={20} value={form.guests} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="mb-10">
              <label className={labelClass}>Tell Us Your Dream</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your vision — activities, budget, special occasions..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-3 bg-amber-300 text-stone-950 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-amber-200 disabled:opacity-60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
            >
              {status === 'loading' ? (
                <><Loader size={16} className="animate-spin" /> Sending</>
              ) : (
                <><Send size={16} /> Request Your Journey</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
