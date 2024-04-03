import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { say } from "../data/say";
import { GetRating } from "@/lib/Rating";

export const Reviews = () => {
  return (
    <main className=" text-center my-14 px-14 md:px-20 container mx-auto">
      <h1 className="text-center my-10 font-semibold text-xl">
        WHAT YOU SAY...
      </h1>

      <section>
        <Carousel>
          <CarouselContent>
            {say.map((s) => (
              <CarouselItem
                key={s.id}
                className="basis-1/1 md:basis-1/3 lg:basis-1/4 cursor-grabbing"
              >
                <div className=" text-start">
                  <h1 className="text-sm mb-4">
                    <GetRating rating={s.rating} />
                  </h1>

                  <p className="text-sm max-w-[200px] font-semibold">
                    {" "}
                    {s.msg}
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
