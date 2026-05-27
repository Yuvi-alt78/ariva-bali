import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useParallax';
import { trackSectionView } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: 'The Hidden Temples of Besakih',
    category: 'Culture',
    date: 'March 2025',
    excerpt: 'Ascending the slopes of Mount Agung to Bali\'s Mother Temple as clouds swirled below — a pilgrimage beyond words.',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min',
  },
  {
    id: 2,
    title: 'Dawn Over the Rice Fields',
    category: 'Nature',
    date: 'February 2025',
    excerpt: 'Before the world wakes, Jatiluwih\'s UNESCO-listed terraces glow copper and green in the first light.',
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min',
  },
  {
    id: 3,
    title: 'Healing Waters of Tirta Empul',
    category: 'Wellness',
    date: 'January 2025',
    excerpt: 'Ancient purification rituals at the holy spring — letting sacred water wash away what no longer serves.',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '7 min',
  },
];

function StoryCard({ story, index }: { story: typeof stories[0]; index: number }) {
  const { ref, visible } = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden aspect-[3/2] mb-6">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-300 text-stone-950 text-xs tracking-widest uppercase px-3 py-1 font-medium">
            {story.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-stone-500 text-xs">{story.date}</span>
        <span className="w-1 h-1 bg-stone-600 rounded-full" />
        <span className="text-stone-500 text-xs">{story.readTime} read</span>
      </div>
      <h3
        className="text-white text-2xl font-light mb-3 group-hover:text-amber-200 transition-colors duration-300"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {story.title}
      </h3>
      <p className="text-stone-400 text-sm leading-relaxed mb-4">{story.excerpt}</p>
      <span className="flex items-center gap-2 text-amber-300 text-xs tracking-widest uppercase group-hover:gap-4 transition-all duration-300">
        Read More <ArrowRight size={12} />
      </span>
    </article>
  );
}

export default function Stories() {
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    if (visible) trackSectionView('stories');
  }, [visible]);

  return (
    <section id="stories" className="bg-stone-950 py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-4">Island Chronicles</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-5xl md:text-6xl text-white font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Stories from<br />
              <span className="italic text-amber-200">The Island</span>
            </h2>
            <button className="flex items-center gap-2 text-amber-300 text-xs tracking-[0.3em] uppercase hover:gap-4 transition-all duration-300">
              All Stories <ArrowRight size={14} />
            </button>
          </div>
          <div className="w-16 h-px bg-amber-300/60 mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
