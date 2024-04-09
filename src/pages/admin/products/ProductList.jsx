import { productList } from "@/components/data/productList";
import { formatCurrency } from "@/lib/FormatCurrency";
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
import { Link } from "react-router-dom";
import { useState } from "react";
import Paginate from "@/components/paginate/Paginate";

const ProductList = () => {
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayProducts = productList?.slice(pageVisited, pageVisited + postPerPage);

  const pageCount = Math.ceil(productList?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <main>
      <section className="grid grid-cols-8 font-semibold text-sm text-center">
        <p>Product</p>
        <p>Name</p>
        <p>Price</p>
        <p>Purchased</p>
        <p>Stock</p>
        <p>Status</p>
        <p>Date</p>
        <p>Action</p>
      </section>

      <section className=" space-y-3 mt-3">
        {displayProducts.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-8 font-semibold text-sm place-items-center"
          >
            <LazyLoadImage
              src={p.img}
              className="w-14 h-14"
              loading="lazy"
              effect="blur"
            />

            <h1>{p.name}</h1>
            <h2>{formatCurrency(p.price)}</h2>
            <h3>{p.purchased}</h3>
            <h4>{p.stock}</h4>
            <h5 className=" uppercase text-xs">{p.status}</h5>
            <h6>{p.Date}</h6>

            <DropdownMenu>
              <DropdownMenuTrigger className=" outline-none uppercase">
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button className="text-xs">Delete Product</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="w-full">
                    <Link className="text-xs">Edit Product</Link>
                  </Button>
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

export default ProductList;
