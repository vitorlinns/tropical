import { Hero }         from "@/sections/Hero";
import { FlightSearch } from "@/sections/FlightSearch";
import { HowItWorks }   from "@/sections/HowItWorks";
import { Destinations } from "@/sections/Destinations";
import { Stats }        from "@/sections/Stats";
import { Calculator }   from "@/sections/Calculator";
import { CardBlack }    from "@/sections/CardBlack";
import { Blog }         from "@/sections/Blog";
import { FAQ }          from "@/sections/FAQ";
import { CTASection }   from "@/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlightSearch />
      <HowItWorks />
      <Destinations />
      <Stats />
      <Calculator />
      <CardBlack />
      <Blog />
      <FAQ />
      <CTASection />
    </>
  );
}
