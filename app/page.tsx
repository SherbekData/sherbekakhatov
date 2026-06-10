import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Rooms } from '@/components/rooms';
import { Restaurant } from '@/components/restaurant';
import { Garden } from '@/components/garden';
import { Amenities } from '@/components/amenities';
import { Gallery } from '@/components/gallery';
import { Contact } from '@/components/contact';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Rooms />
      <Restaurant />
      <Garden />
      <Amenities />
      <Gallery />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
