import React from "react";
import hero from "../../../assets/hero.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Hero = () => {
  return (
    <main className=" mx-3 md:container md:mx-auto">
      <section className=" relative">
        <LazyLoadImage
          src={hero}
          loading="lazy"
          effect="blur"
          className="rounded-2xl h-[200px] md:h-[400px] w-screen object-cover"
        />

        <div className=" absolute bottom-5 left-5 text-white">
          <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Spring into style
          </h3>
          <button className="bg-[#ffffff9c] px-8 rounded-full my-2 py-2 font-bold md:text-lg">
            SHOP NOW
          </button>
        </div>
      </section>
    </main>
  );
};

export default Hero;
