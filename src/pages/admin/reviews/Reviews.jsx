import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { review } from "@/components/data/reviews";
import { GetRating } from "@/lib/Rating";
import { useState } from "react";
import Paginate from "@/components/paginate/Paginate";

const Reviews = () => {
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayReviews = review?.slice(pageVisited, pageVisited + postPerPage);

  const pageCount = Math.ceil(review?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <main>
      <div>
        <h1 className="font-bold text-xl mb-5">New Orders</h1>
      </div>
      <table className="w-full">
        <thead className="w-full text-left table-auto">
          <tr>
            <th className="w-40">Product</th>
            <th className="w-40">Name</th>
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
                <LazyLoadImage src={o.img} className="w-14 h-14" />
              </td>
              <td>{o.name}</td>

              <td>
                <LazyLoadImage src={o.profile} className="w-10 h-10" />
              </td>
              <td>{o.customerName}</td>
              <td className="font-bold">
                <GetRating rating={o.rating} />
              </td>
              <td>{o.Date}</td>
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
