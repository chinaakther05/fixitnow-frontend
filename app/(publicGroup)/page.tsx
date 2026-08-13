import CTASection from "@/components/home/CTASection";
import FeaturedServices from "@/components/home/FeaturedServices";
import HeroSection from "@/components/home/HeroSection";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function HomePage() {
  return (
    <div>
     
      <HeroSection></HeroSection>
      <FeaturedServices></FeaturedServices>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      <CTASection></CTASection>
      
    </div>
  );
}
