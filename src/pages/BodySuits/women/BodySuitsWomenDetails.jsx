import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { featchCategoriesDetails } from "@/redux/features/categorySlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import { GetRating } from "@/lib/Rating";
import { SimilarProducts } from "@/components/ProductDetails/SimilarProducts";
import { CustomerDetailsReviews } from "@/components/reviews/CustomerDetailsReviews";
import { CartBtn } from "@/components/cart/CartBtn";
import { SkeletonLoadingSingleProduct } from "@/components/Loader-Skeleton/SkeletonLoadingSearchBar";
import { AccordionDetails } from "@/pages/skinCare/AccordionDetails";

const BodySuitsWomenDetails = () => {
  const { bodysuitId } = useParams();
  const dispatch = useDispatch();
  const { categoriesDetails, status } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(featchCategoriesDetails(bodysuitId));
  }, []);

  const details = categoriesDetails.payload.product;

  return (
    <main>
      {status === "loading" ? (
        <SkeletonLoadingSingleProduct num={1} />
      ) : (
        <section className=" my-5 px-3 md:container md:mx-auto md:flex justify-between w-full gap-5">
          <div className="md:w-[50%]">
            <LazyLoadImage
              src={details?.image}
              loading="lazy"
              effect="blur"
              className="w-screen h-[200px] md:w-full md:h-[400px]  mx-auto lg:w-[600px] lg:h-[500px] object-cover"
            />
          </div>

          <section className="md:w-[50%]">
            <h1 className="font-bold max-w-md">{details?.name}</h1>
            <div className="flex items-center gap-3">
              <p className="font-bold">{formatCurrency(details?.price)}</p>
              {/* <p>
              <GetRating rating={details?.rating.rate} /> (
              {details?.rating.count})
            </p> */}
            </div>

            <p className="max-w-md text-sm">{details?.description}</p>

            <section className="text-xs mt-5">
              <div>
                {/* this is for color select */}
                <p className="uppercase font-bold">Color: {details?.color} </p>
              </div>

              <div className="my-10">
                {/* this is for size select */}
                <p className=" font-bold uppercase">Size: {details?.size} </p>

                <button className="border-red-600 border-2 font-semibold mt-5 px-10 text-sm py-1 rounded-full">
                  SELECT A SIZE
                </button>
              </div>

              <CartBtn s={details} />

              <div>
                {/* this is for color select */}
                <p className="uppercase font-bold mt-5">
                  Product details: {details?.description}
                </p>
              </div>
            </section>

            <AccordionDetails details={details} />
          </section>
        </section>
      )}

      <SimilarProducts />

      <CustomerDetailsReviews />
    </main>
  );
};

export default BodySuitsWomenDetails;
