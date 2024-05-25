import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { review } from "@/components/data/reviews";
import { GetRating } from "@/lib/Rating";
import { useEffect, useState } from "react";
import Paginate from "@/components/paginate/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "@/redux/features/reviewsSlice";
import Cookies from "js-cookie";

const Reviews = () => {
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;
  const dispatch = useDispatch();
  const token = Cookies.get("userToken");
  const { reviews } = useSelector((state) => state.reviews);

  const pageVisited = pageNumber * postPerPage;

  const displayReviews = reviews.review?.slice(
    pageVisited,
    pageVisited + postPerPage
  );

  const pageCount = Math.ceil(review?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(fetchReviews(token));
  }, [dispatch]);

  console.log(displayReviews);

  return (
    <main>
      <div>
        <h1 className="font-bold text-xl mb-5">New Orders</h1>
      </div>
      <table className="w-full">
        <thead className="w-full text-left table-auto">
          <tr>
            <th className="w-32">Product</th>
            <th className="w-52">Name</th>
            <th className="w-32">Profile</th>
            <th className="w-40">User Name</th>
            <th className="w-40">Rating</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody className="my-5">
          {displayReviews.map((o) => (
            <tr key={o.id}>
              <td className="pt-2">
                <LazyLoadImage src={o?.product?.image} className="w-14 h-14" />
              </td>
              <td className="text-sm">{o?.product?.name}</td>

              <td>
                <LazyLoadImage
                  src={!o?.author?.image ? "" : o?.author?.image}
                  className="w-10 h-10"
                />
              </td>
              <td>{!o?.author?.name ? "not yet" : o?.author?.name}</td>
              <td className="font-bold">
                <GetRating rating={o.rating} />
              </td>
              <td>
                {" "}
                {`${new Date(o.updatedAt).getFullYear()}-${(
                  new Date(o.updatedAt).getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${new Date(o.updatedAt)
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />
    </main>
  );
};

export default Reviews;
