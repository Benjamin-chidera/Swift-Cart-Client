import React from "react";
import skin1 from "../../../../assets/skin/skin1.webp";
import skin2 from "../../../../assets/skin/skin2.webp";
import skin3 from "../../../../assets/skin/skin3.webp";
import skin4 from "../../../../assets/skin/skin4.webp";
import skin5 from "../../../../assets/skin/skin5.webp";
import skin6 from "../../../../assets/skin/skin6.webp";
import skin7 from "../../../../assets/skin/skin7.webp";
import skin8 from "../../../../assets/skin/skin8.webp";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const skinCat = [
  {
    id: crypto.randomUUID(),
    img: skin1,
    // title: "jewelery",
    tags: "skincare",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin2,
    // title: "electronics",
    tags: "haircare",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin3,
    // title: "men's clothing",
    tags: "bodycare",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin4,
    // title: "women's clothing",
    tags: "sunprotection",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin5,
    // title: "electronics",
    tags: "makeup",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin6,
    // title: "jewelery",
    tags: "men's",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin7,
    // title: "men's clothing",
    tags: "scentfree",
    category: "skin",
  },
  {
    id: crypto.randomUUID(),
    img: skin8,
    // title: "women's clothing",
    tags: "toothpaste",
    category: "skin",
  },
];

export const Skin = () => {
  return (
    <main className=" my-5 mx-3 md:container md:mx-auto">
      <h3 className="text-center my-5 text-xl font-semibold">SHOP BY SKIN</h3>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {skinCat.map((s) => (
          <Link key={s.id} to={`/${s.category}/${s.tags}`}>
            <LazyLoadImage
              src={s.img}
              loading="lazy"
              effect="blur"
              className=" rounded-md"
            />
            <p className="text-xs font-semibold text-center uppercase">
              {s.tags}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
};
