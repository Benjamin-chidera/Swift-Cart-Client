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
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <main className="">
      <Helmet>
        <title>Swift Cart Home</title>
        <meta
          name="description"
          content="Dive into a rich catalog, indulge in secure transactions, effortlessly see your orders, and enjoy tailored recommendations."
        />
        <link rel="canonical" href="/" />
      </Helmet>
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
