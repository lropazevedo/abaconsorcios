import { About } from "@/sections/About";
import { AfterSales } from "@/sections/AfterSales";
import { Brands } from "@/sections/Brands";
import { Clients } from "@/sections/Clients";
import { Closing } from "@/sections/Closing";
import { Credibility } from "@/sections/Credibility";
import { Hero } from "@/sections/Hero";
import { Journey } from "@/sections/Journey";
import { Manifesto } from "@/sections/Manifesto";
import { Presence } from "@/sections/Presence";
import { Team } from "@/sections/Team";
import { Why } from "@/sections/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <About />
      <Team />
      <Journey />
      <AfterSales />
      <Brands />
      <Presence />
      <Why />
      <Clients />
      <Manifesto />
      <Closing />
    </>
  );
}
