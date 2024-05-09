import React from "react";
import men from "../../../../assets/clothes/men.webp"
import women from "../../../../assets/clothes/women.jpeg"
import boy from "../../../../assets/clothes/boy.jpg"
import girl from "../../../../assets/clothes/girl.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const clothCat = [
  {
    id: crypto.randomUUID(),
    img: men,
    // title: "men",
    tags: "men",
    category: "clothes",
  },
  {
    id: crypto.randomUUID(),
    img: women,
    // title: "women",
    tags: "womenMen",
    category: "clothes",
  },
  {
    id: crypto.randomUUID(),
    img: boy,
    // title: "boy's",
    tags: "men",
    category: "clothes",
  },
  {
    id: crypto.randomUUID(),
    img: girl,
    // title: "girl's",
    tags: "womenMen",
    category: "clothes",
  },
];

export const Clothes = () => {
  return (
    <main className=" my-8 mx-3 md:container md:mx-auto overflow-x-hidden">
      <h3 className="text-center my-5 text-xl font-semibold">
        SHOP BY CLOTHES
      </h3>

      <section className="grid grid-cols-2 w-full place-items-center gap-3 md:grid-cols-4">
        {clothCat.map((s) => (
          <Link key={s.id} className="w-full" to={`/${s.category}/${s.tags}`}>
            <LazyLoadImage
              src={s.img}
              loading="lazy"
              effect="blur"
              className="rounded-md object-cover h-[120px] w-[400px] md:h-[200px] md:w-[230px] lg:w-[350px] lg:object-left-top"
            />
            <p className="text-xs font-semibold text-center uppercase">{s.title}</p>
          </Link>
        ))}
      </section>
    </main>
  );
};
