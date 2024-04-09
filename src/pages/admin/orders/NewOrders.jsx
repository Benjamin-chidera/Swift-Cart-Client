import { orders } from "@/components/data/orders";
import { formatCurrency } from "@/lib/FormatCurrency";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import Paginate from "@/components/paginate/Paginate";

const NewOrders = () => {
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayOrders = orders?.slice(pageVisited, pageVisited + postPerPage);

  const pageCount = Math.ceil(orders?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };


  return (
    <main>
      <div>
        <h1 className="font-bold text-sm">New Orders</h1>
      </div>

      <section className="my-5 grid grid-cols-9 place-items-center text-sm">
        <p>Item</p>
        <p>Name</p>
        <p>Customer</p>
        <p>Items</p>
        <p>Price</p>
        <p>Payment</p>
        <p>Status</p>
        <p>Date</p>
        <p>Action</p>
      </section>

      <section className="my-5">
        {displayOrders.map((o) => (
          <div
            key={o.id}
            className="my-5 grid grid-cols-9 place-items-center text-sm"
          >
            <LazyLoadImage
              src={o.img}
              loading="lazy"
              effect="blur"
              className="w-20 h-20"
            />

            <h1>{o.name}</h1>
            <div>
              <h2>{o.customerName}</h2>
              <h3>{o.customerEmail}</h3>
            </div>
            <h4>{o.items}</h4>
            <h5>{formatCurrency(o.price)}</h5>
            <h6 className="font-bold">Paid</h6>
            <p
              className={`capitalize text-xs ${
                o.status === "In progress" ? "bg-blue-500" : "bg-green-600"
              } py-0.5 px-2 rounded-full text-white`}
            >
              {o.status}
            </p>
            <p>{o.Date}</p>

            <DropdownMenu>
              <DropdownMenuTrigger className=" outline-none uppercase">
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button>Delete Order</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </section>

      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />
    </main>
  );
};

export default NewOrders;
