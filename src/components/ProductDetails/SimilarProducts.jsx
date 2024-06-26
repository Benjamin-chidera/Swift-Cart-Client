import React from "react";
import { addItem, 
  // fetchFeature 
} from "@/redux/features/cartSlice";
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
import { CartBtn } from "../cart/CartBtn";
import { SkeletonLoadingRecentProduct } from "../Loader-Skeleton/SkeletonLoadingSearchBar";

export const SimilarProducts = () => {
  const { singleProduct, status } = useSelector((state) => state.product);
  const myCart = singleProduct?.similarProduct;

  console.log(myCart);

  return (
    <main className=" mx-14 md:container md:mx-auto my-5  md:px-20 mt-20">
      <section className=" flex items-center justify-between flex-wrap mb-10">
        <h4 className="font-bold text-sm whitespace-nowrap md:text-lg text-red-800 uppercase">
          Similar Product
        </h4>
      </section>

      <section>
        <section>
          <Carousel>
            <CarouselContent>
              {status === "loading" ? <SkeletonLoadingRecentProduct num={4}/> : myCart?.map((s) => (
                <CarouselItem
                  key={s.id}
                  className="basis-1/1 md:basis-1/3 lg:basis-1/5 cursor-grabbing relative"
                >
                  <LazyLoadImage
                    src={s.image}
                    loading="lazy"
                    effect="blur"
                    className="w-[120px] h-[120px] md:w-full md:h-[180px] object-cover lg:w-[300px]"
                  />

                  <p className=" text-sm">{s.name.substring(0, 20)}...</p>

                  <p className=" text-sm mt-3 font-bold">
                    {s.details.substring(0, 20)}
                  </p>

                  <section className="">
                    <div className="flex justify-between items-center">
                      <p>{formatCurrency(Math.round(s.price))}</p>

                      <span className=" text-xs">
                        {/* <GetRating rating={s.rating.rate} /> */} 
                      </span>
                    </div>

                    <div className=" mt-3">
                      <CartBtn s={s} />
                    </div>

                    <div className=" absolute top-0">
                      <WishBtn s={s} />
                    </div>
                  </section>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </section>
    </main>
  );
};
