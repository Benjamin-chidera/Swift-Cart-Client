import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { say } from "../data/say";
import { GetRating } from "@/lib/Rating";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchReviews } from "@/redux/features/reviewsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Reviews = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("userToken");
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(token));
  }, [dispatch]);

  return (
    <main className=" text-center my-14 px-14 md:px-20 container mx-auto">
      <h1 className="text-center my-10 font-semibold text-xl">
        WHAT CUSTOMERS SAY...
      </h1>

      <section>
        <Carousel>
          <CarouselContent>
            {reviews?.review?.map((s) => (
              <CarouselItem
                key={s.id}
                className="basis-1/1 md:basis-1/3 lg:basis-1/5 cursor-grabbing"
              >
                <div className=" text-start">
                  <div className="flex gap-2">
                    <LazyLoadImage
                      src={!s?.author?.image ? "" : s?.author?.image}
                      className="w-10 h-10 rounded-full"
                    />
                    <h1 className="text-sm mb-4">
                      <GetRating rating={s.rating} />
                    </h1>
                  </div>

                  <p className="text-sm max-w-[200px] font-semibold">
                    {" "}
                    {s.comment}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
};

//  <CarouselItem className="basis-1/5">1</CarouselItem>;
