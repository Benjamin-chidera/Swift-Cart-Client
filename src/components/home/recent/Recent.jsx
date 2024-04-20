import { addItem, removeItem } from "@/redux/features/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GetRating } from "@/lib/Rating";
import { formatCurrency } from "@/lib/FormatCurrency";
import { WishBtn } from "@/components/wishList/wishListBtn/WishBtn";
import { CartBtn } from "@/components/cart/CartBtn";
import { Men } from "./Men";
import { Women } from "./Women";

export const Recent = () => {
  const [gender, setGender] = useState("female");
  
  // change genders
  const handleMale = () => {
    setGender("male");
  };
  const handleWomen = () => {
    setGender("female");
  };

  // if (status === "loading") {
  //   return <p className="text-center font-bold my-10">Loading... 😁😁🛒</p>;
  // }

  // if (status === "rejected") {
  //   return (
  //     <p className="text-center font-bold my-10">
  //       Failed to loading recent products please check your internet connection.
  //       😢
  //     </p>
  //   );
  // }

  return (
    <main className=" mx-14 md:container md:mx-auto my-5  md:px-20">
      <section className=" flex items-center justify-between flex-wrap mb-10">
        <h4 className="font-bold text-sm whitespace-nowrap md:text-lg text-red-800 uppercase">
          OUR Recent Product
        </h4>

        <div className="flex items-center gap-3 border rounded-full px-1 py-1 text-sm font-bold">
          <button
            className={`${
              gender === "female" && "bg-red-800 text-white"
            } px-3 py-0.5 rounded-full text-black`}
            onClick={handleWomen}
          >
            WOMEN'S
          </button>
          <button
            className={`${
              gender === "male" && "bg-red-800 text-white"
            } px-3 py-0.5 rounded-full text-black`}
            onClick={handleMale}
          >
            MEN'S
          </button>
        </div>
      </section>

      {gender === "female" && <Women />}

      {gender === "male" && <Men />}
    </main>
  );
};
