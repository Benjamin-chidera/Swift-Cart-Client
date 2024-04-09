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
        <h1 className="font-bold text-sm">New Orders</h1>
      </div>

      <section className="my-5 grid grid-cols-7 place-items-center text-sm">
        <p>Product</p>
        <p>Name</p>
        <p>Profile</p>
        <p>User Name</p>
        <p>Rating</p>
        <p>Date</p>
      </section>

      <section className="my-5">
        {displayReviews.map((o) => (
          <div
            key={o.id}
            className="my-5 grid grid-cols-7 place-items-center text-sm"
          >
            <LazyLoadImage src={o.img} className="w-14 h-14" />
            <h3>{o.name}</h3>

            <LazyLoadImage src={o.profile} className="w-10 h-10" />
            <h5>{o.customerName}</h5>
            <h6 className="font-bold">
              <GetRating rating={o.rating} />
            </h6>
            <p>{o.Date}</p>
          </div>
        ))}
      </section>

      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />
    </main>
  );
};

export default Reviews;
