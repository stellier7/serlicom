import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { PageIntro } from "@/components/PageIntro";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { About } from "@/components/sections/About";
import { Coverage } from "@/components/sections/Coverage";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HomePlans } from "@/components/sections/HomePlans";
import { PostConstruction } from "@/components/sections/PostConstruction";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <PageIntro />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <HomePlans />
        <PostConstruction />
        <WhoWeServe />
        <WhyUs />
        <Marquee />
        <Gallery />
        <Coverage />
        <Reviews />
        <About />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
