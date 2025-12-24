import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-offwhite">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
