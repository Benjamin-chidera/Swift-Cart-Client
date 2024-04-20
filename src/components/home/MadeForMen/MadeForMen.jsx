import React from "react";
import comfortman from "../../../assets/madeFor/comfortman.jpeg";
import manjoy from "../../../assets/madeFor/manjoy.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const comfortimg = [
  {
    id: crypto.randomUUID(),
    img: comfortman,
    // title: "men",
    category: "bodysuits",
    gender: "male",
  },
];

const joyimg = [
  {
    id: crypto.randomUUID(),
    img: manjoy,
    // title: "men",
    category: "lounge",
    gender: "male",
  },
];

export const MadeForMen = () => {
  return (
    <main className="md:flex gap-3  mx-3 md:container md:mx-auto">
      <section>
        {comfortimg.map((s) => (
          <Link
            className=" relative"
            key={s.id}
            to={`/categories/${s.category}/${s.gender}`}
          >
            <LazyLoadImage
              src={comfortman}
              loading="lazy"
              effect="blur"
              className="h-[400px] w-[650px] max-w-full object-cover rounded-2xl object-left-top"
            />

            <div className=" absolute bottom-5 left-5 text-white">
              <h3 className="font-bold text-md md:text-2xl lg:text-2xl">
                made for comfort
              </h3>
              <button className="bg-[#ffffff9c] px-8 rounded-full my-2 py-2 font-bold text-sm">
                SHOP NOW
              </button>
            </div>
          </Link>
        ))}
      </section>
      <section>
        {joyimg.map((s) => (
          <Link
            className=" relative"
            key={s.id}
            to={`/categories/${s.category}/${s.gender}`}
          >
            <LazyLoadImage
              src={manjoy}
              loading="lazy"
              effect="blur"
              className="h-[400px] w-[650px] max-w-full object-cover rounded-2xl"
            />

            <div className=" absolute bottom-5 left-5 text-white">
              <h3 className="font-bold text-md md:text-2xl lg:text-2xl">
                made for men
              </h3>
              <button className="bg-[#ffffff9c] px-8 rounded-full my-2 py-2 font-bold text-sm">
                SHOP NOW
              </button>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};
