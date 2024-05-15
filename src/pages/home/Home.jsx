import React, { useEffect, useRef } from "react";
import Hero from "../../components/home/Hero/Hero";
import { OurFav } from "../../components/home/OurFavorites/OurFav";
import { Skin } from "../../components/home/categories/Skin/Skin";
import { Clothes } from "../../components/home/categories/clothes/Clothes";
import { Shoes } from "../../components/home/categories/shoes/Shoes";
import { Story } from "../../components/home/story/Story";
import { Reviews } from "../../components/reviews/Reviews";
import { Recent } from "@/components/home/recent/Recent";
import { MadeFor } from "@/components/home/MadeFor/MadeFor";
import { MadeForMen } from "@/components/home/MadeForMen/MadeForMen";
import { Top } from "@/components/BackToTop/Top";

const Home = () => {
  return (
    <main className="">
      <Hero />
      <Top />
      <Recent />
      <Skin />
      <Clothes />
      <Shoes />
      <Story />
      <Reviews />
      <MadeFor />
      <MadeForMen />
    </main>
  );
};

export default Home;
