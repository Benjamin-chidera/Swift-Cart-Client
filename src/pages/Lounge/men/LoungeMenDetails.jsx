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

const LoungeMenDetails = () => {
  const { loungeId } = useParams();
  const dispatch = useDispatch();
  const { categoriesDetails } = useSelector((state) => state.categories);

  console.log(categoriesDetails.payload);
  useEffect(() => {
    dispatch(featchCategoriesDetails(loungeId));
  }, [dispatch]);

  const details = categoriesDetails?.payload;

  return (
    <main>
      <section className=" my-5 mx-3 md:container md:mx-auto md:flex justify-around">
        <LazyLoadImage
          src={details?.image}
          className="w-[200px] md:w-[300px] md:h-[400px] mx-auto object-contain"
        />

        <section>
          <h1 className="font-bold max-w-md">{details?.title}</h1>
          <div className="flex items-center gap-3">
            <p className="font-bold">{formatCurrency(details?.price)}</p>
            <p>
              <GetRating rating={details?.rating?.rate} /> (
              {details?.rating?.count})
            </p>
          </div>

          <p className="max-w-md text-sm">{details?.description}</p>

          <section className="text-xs mt-5">
            <div>
              {/* this is for color select */}
              <p className="uppercase font-bold">Color: </p>
            </div>

            <div className="my-10">
              {/* this is for size select */}
              <p className=" font-bold uppercase">Size: </p>

              <button className="border-red-600 border-2 font-semibold mt-5 px-10 text-sm py-1 rounded-full">
                SELECT A SIZE
              </button>
            </div>

            <button className="border-red-600 border-2 w-full py-2 text-sm">
              Add To Cart
            </button>

            <div>
              {/* this is for color select */}
              <p className="uppercase font-bold mt-5">Product details: </p>
            </div>
          </section>
        </section>
      </section>

      <SimilarProducts />

      <CustomerDetailsReviews />
    </main>
  );
};

export default LoungeMenDetails;
