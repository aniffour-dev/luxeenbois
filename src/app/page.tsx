import About from "@/components/sections/About";
import Details from "@/components/sections/Details";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Packs from "@/components/sections/Packs";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <Details />
      <About />
      <Faq />
      <Packs />
    </>
  );
};

export default page;
