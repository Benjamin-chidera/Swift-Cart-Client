import React from "react";
import men from "../../../../assets/shoes/men.jpeg"
import women from "../../../../assets/shoes/women.webp"
import boy from "../../../../assets/shoes/boy.webp"
import girl from "../../../../assets/shoes/girl.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const shoeCat = [
  {
    id: crypto.randomUUID(),
    img: men,
 
    tags: "men",
    category: "shoes",
  },
  {
    id: crypto.randomUUID(),
    img: women,
  
    tags: "women",
    category: "shoes",
  },
  {
    id: crypto.randomUUID(),
    img: boy,

    tags: "boy",
    category: "shoes",
  },
  {
    id: crypto.randomUUID(),
    img: girl,
   
    tags: "girl",
    category: "shoes",
  },
];

export const Shoes = () => {
  return (
    <main className=" my-8 mx-3 md:container md:mx-auto overflow-x-hidden">
      <h3 className="text-center my-5 text-xl font-semibold">SHOP BY SHOES</h3>

      <section className="grid grid-cols-2 w-full place-items-center gap-3 md:grid-cols-4">
        {shoeCat.map((s) => (
          <Link key={s.id} className="w-full" to={`/${s.category}/${s.tags}`}>
            <LazyLoadImage
              src={s.img}
              loading="lazy"
              effect="blur"
              className="rounded-md object-cover h-[120px] w-[400px] md:h-[200px] md:w-[230px] lg:w-[350px]"
            />
            <p className="text-xs font-semibold text-center uppercase">
              {s.title}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
};
