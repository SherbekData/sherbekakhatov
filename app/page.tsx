import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Rooms } from '@/components/rooms';
import { Restaurant } from '@/components/restaurant';
import { Garden } from '@/components/garden';
import { Amenities } from '@/components/amenities';
import { Gallery } from '@/components/gallery';
import BeSearchForm from '@/components/beForms/beSearchForm';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Reveal } from '@/components/motion/Reveal';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BeSearchForm />
      <Reveal>
        <Rooms />
      </Reveal>
      <Reveal>
        <Restaurant />
      </Reveal>
      <Reveal>
        <Garden />
      </Reveal>
      <Reveal>
        <Amenities />
      </Reveal>
      <Reveal>
        <Gallery />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
      <Footer />
    </main>
  );
}
