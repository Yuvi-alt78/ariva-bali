import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experiences from './components/Experiences';
import ParallaxBanner from './components/ParallaxBanner';
import Destinations from './components/Destinations';
import Stats from './components/Stats';
import Stories from './components/Stories';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-stone-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Experiences />
      <ParallaxBanner
        image="https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1920"
        quote="Bali doesn't visit you — it finds you, transforms you, and never truly lets you leave."
        author="Ariva, Island Philosophy"
      />
      <Destinations />
      <Stats />
      <Stories />
      <ParallaxBanner
        image="https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=1920"
        quote="In Bali, every dawn is a ceremony. Every sunset, a prayer answered."
        author="Ancient Balinese Wisdom"
        id="stories"
      />
      <About />
      <Testimonials />
      <Newsletter />
      <BookingForm />
      <Footer />
    </div>
  );
}
