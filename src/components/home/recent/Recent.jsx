import { addItem, fetchFeature, removeItem } from "@/redux/features/cartSlice";
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

export const Recent = () => {
  const [gender, setGender] = useState("women");
  const [added, setAdded] = useState(false);
  const { products, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeature());
  }, [dispatch]);

  const myCart = products?.payload;

 

  // change genders
  const handleMale = () => {
    setGender("male");
  };
  const handleWomen = () => {
    setGender("women");
  };

  if (status === "loading") {
    return <p className="text-center font-bold my-10">Loading... 😁😁🛒</p>;
  }

  if (status === "rejected") {
    return (
      <p className="text-center font-bold my-10">
        Failed to loading recent products please check your internet connection.
        😢
      </p>
    );
  }

  return (
    <main className=" mx-14 md:container md:mx-auto my-5  md:px-20">
      <section className=" flex items-center justify-between flex-wrap mb-10">
        <h4 className="font-bold text-sm whitespace-nowrap md:text-lg text-red-800 uppercase">
          OUR Recent Product
        </h4>

        <div className="flex items-center gap-3 border rounded-full px-1 py-1 text-sm font-bold">
          <button
            className={`${
              gender === "women" && "bg-red-800 text-white"
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

      {gender === "women" && (
        <section>
          <section>
            <Carousel>
              <CarouselContent>
                {myCart?.map((s) => (
                  <CarouselItem
                    key={s.id}
                    className="basis-1/1 md:basis-1/3 lg:basis-1/5 cursor-grabbing relative"
                  >
                    <LazyLoadImage
                      src={s.image}
                      loading="lazy"
                      effect="blur"
                      className="w-[120px] h-[120px] md:w-[150px] md:h-[180px] object-cover object-left-top"
                    />

                    <p className=" text-sm">{s.title.substring(0, 20)}...</p>

                    <p className=" text-sm mt-3">
                      {s.description.substring(0, 20)}
                    </p>

                    <section className="">
                      <div className="flex justify-between items-center">
                        <p>{formatCurrency(Math.round(s.price))}</p>

                        <span className=" text-xs">
                          <GetRating rating={s.rating.rate} />
                        </span>
                      </div>

                      <div className=" mt-3">
                        <CartBtn s={s}/>
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
      )}

      {gender === "male" && (
        <section>
          <section>
            <Carousel>
              <CarouselContent>
                {myCart?.map((s) => (
                  <CarouselItem
                    key={s.id}
                    className="basis-1/1 md:basis-1/3 lg:basis-1/5 cursor-grabbing relative"
                  >
                    <LazyLoadImage
                      src={s.image}
                      loading="lazy"
                      effect="blur"
                      className="w-[120px] h-[120px] md:w-[150px] md:h-[180px] object-cover object-left-top"
                    />

                    <p className=" text-sm">{s.title.substring(0, 20)}...</p>

                    <p className=" text-sm mt-3">
                      {s.description.substring(0, 20)}
                    </p>

                    <section className="">
                      <div className="flex justify-between items-center">
                        <p>{formatCurrency(Math.round(s.price))}</p>

                        <span className=" text-xs">
                          <GetRating rating={s.rating.rate} />
                        </span>
                      </div>

                      <div className=" mt-3">
                        <button
                          className="border-2 py-1 w-full border-red-600 text-xs rounded-md"
                          onClick={() => handleAddToCart(s)}
                        >
                          ADD TO BAG
                        </button>
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
      )}
    </main>
  );
};
