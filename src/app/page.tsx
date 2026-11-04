import Oath from "@/components/map/Oath";
import Wand from "@/components/map/Wand";
import InkObserver from "@/components/map/InkObserver";
import Legend from "@/components/map/Legend";
import Corridor from "@/components/map/Corridor";
import Plan from "@/components/plan/Plan";
import { FootprintDefs } from "@/components/map/Footprint";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Library from "@/components/sections/Library";
import Trophies from "@/components/sections/Trophies";
import Owlery from "@/components/sections/Owlery";

export default function Home() {
  return (
    <>
      <FootprintDefs />
      <Oath />
      <Wand />
      <InkObserver />
      <Legend />

      <main
        id="map"
        className="relative mx-auto w-full max-w-[1260px] pb-24 pl-[20px] pr-3 pt-20 sm:pr-6 md:pl-[112px] md:pr-8 md:pt-24 lg:pt-16"
      >
        <Corridor />
        <div className="relative z-10 space-y-14 md:space-y-16">
          <Plan />
          <Hero />
          <Experience />
          <Projects />
          <Library />
          <Trophies />
          <Owlery />
        </div>
      </main>
    </>
  );
}
