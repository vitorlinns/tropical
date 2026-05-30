import { Hero }         from "@/components/sections/Hero";
import { FlightSearch } from "@/components/sections/FlightSearch";
import { HowItWorks }   from "@/components/sections/HowItWorks";
import { Destinations } from "@/components/sections/Destinations";
import { Stats }        from "@/components/sections/Stats";
import { Calculator }   from "@/components/sections/Calculator";
import { CardBlack }    from "@/components/sections/CardBlack";
import { FAQ }          from "@/components/sections/FAQ";
import { CTASection }   from "@/components/sections/CTASection";

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
      <FAQ />
      <CTASection />
    </>
  );
}
