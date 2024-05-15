import { GetRating } from "@/lib/Rating";
import { fetchReviewsProduct } from "@/redux/features/reviewsSlice";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getDate = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const getYear = new Date().getFullYear();

const token = Cookies.get("userToken");

export const CustomerDetailsReviews = (productId) => {
  const { reviewsProduct } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewsProduct({ token, productId: productId.productId }));
  }, [dispatch, productId.productId]);

  const calculateRating = reviewsProduct?.review?.find((r) => r?.rating);
  

  

  return (
    <main className="mb-5 mt-20 mx-5 pb-7 md:container md:mx-auto shadow-xl shadow-slate-200">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-bold text-lg">Verified Customer Feedback</h1>
      </div>

      <section className="md:flex gap-20 mt-3 px-3">
        <div>
          <h3>VERIFIED RATINGS ({reviewsProduct?.review?.length})</h3>

          <div className="my-5 bg-gray-100 grid place-items-center py-5">
            <p className="font-bold text-2xl text-yellow-500">
              {Math.round(calculateRating?.rating || 0)}/5
            </p>
            <p>
              <GetRating rating={calculateRating?.rating} />
            </p>
            <p className="text-lg max-w-[100px] text-yellow-500 font-semibold">
              {reviewsProduct.review.length} verified ratings
            </p>
          </div>
        </div>

        <div>
          <div className=" space-y-3">
            {reviewsProduct?.review?.map((c) => (
              <div key={c._id} className=" space-y-3 text-sm">
                <p>
                  <GetRating rating={c.rating} />
                </p>

                <p className="">{c.comment}</p>
                <div className="flex items-center gap-2">
                  <p>
                    {" "}
                    {`${new Date(c.updatedAt).getFullYear()}-${(
                      new Date(c.updatedAt).getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}-${new Date(c.updatedAt)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`}
                  </p>
                  <p>by</p>
                  <p className="font-bold">{c?.author?.name || "not yet"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
