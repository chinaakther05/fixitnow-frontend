import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/home/FAQ";
import FeaturedServices from "@/components/home/FeaturedServices";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularServicesMarquee from "@/components/home/PopularServicesMarquee";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function HomePage() {
  return (
    <div>
     
      <HeroSection></HeroSection>
      <PopularServicesMarquee></PopularServicesMarquee>
      <FeaturedServices></FeaturedServices>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <CTASection></CTASection>
      
    </div>
  );
}
