import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Solutions } from "@/components/sections/solutions";
import { TechComparison } from "@/components/sections/tech-comparison";
import { EngineeringLab } from "@/components/sections/engineering-lab";
import { BmsSystem } from "@/components/sections/bms-system";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Solutions />
        <TechComparison />
        <EngineeringLab />
        <BmsSystem />
        <CaseStudies />
        <Process />
        <Stats />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
