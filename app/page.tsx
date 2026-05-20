import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Rooms } from '@/components/rooms';
import { Restaurant } from '@/components/restaurant';
import { Garden } from '@/components/garden';
import { Amenities } from '@/components/amenities';
import { Gallery } from '@/components/gallery';
import { Testimonials } from '@/components/testimonials';
import { Booking } from '@/components/booking';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { SEO } from '@/components/seo';
import BeSearchForm from "@/components/beForms/beSearchForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SEO />
      <Header />
      <Hero />
      <BeSearchForm />
      <Rooms />
      <Restaurant />
      <Garden />
      <Amenities />
      <Gallery />
      <Testimonials />
      {/*<Booking />*/}
      <Contact />
      <Footer />
    </main>
  );
}
