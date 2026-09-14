import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { getContent, getGallery } from "@/lib/content";
import type {
  AboutData,
  ContactData,
  GalleryData,
  HeroData,
  ServicesData,
  TestimonialsData,
} from "@/lib/types";

export const revalidate = 60; // re-check for content changes every 60s

export default async function Home() {
  const [
    hero,
    services,
    galleryHead,
    galleryItems,
    about,
    testimonials,
    contact,
  ] = await Promise.all([
    getContent<HeroData>("hero"),
    getContent<ServicesData>("services"),
    getContent<GalleryData>("gallery"),
    getGallery(),
    getContent<AboutData>("about"),
    getContent<TestimonialsData>("testimonials"),
    getContent<ContactData>("contact"),
  ]);

  return (
    <>
      <Navbar />
      <Hero data={hero} />
      <Services data={services} />
      <Gallery data={galleryHead} items={galleryItems} />
      <About data={about} />
      <Testimonials data={testimonials} />
      <Contact data={contact} />
      <Footer />
    </>
  );
}
