import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import lady from "../../../assets/story.webp";

export const Story = () => {
  return (
    <main className="md:flex items-center justify-between gap-10 text-center mt-28 mb-7  mx-3 md:container md:mx-auto">
      <LazyLoadImage
        src={lady}
        loading="lazy"
        effect="blur"
        className=" rounded-md"
      />

      <div className="flex flex-col gap-7">
        <h1 className="font-semibold text-3xl text-red-400">OUR STORY</h1>
        <p className="max-w-sm mx-auto text-sm">
          Originally inspired by the need to care for a little girl’s sensitive
          skin, we believe in bringing good to the world of natural skin care.
        </p>

        <p className="max-w-sm mx-auto text-sm">
          Discover our path to pioneering truly organic beauty products that you
          can trust to care for you and the world around us.
        </p>
      </div>
    </main>
  );
};
