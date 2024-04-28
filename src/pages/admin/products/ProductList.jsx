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
import { useEffect, useState } from "react";
import Paginate from "@/components/paginate/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  deleted,
  deleteProduct,
  getProduct,
} from "@/redux/features/productSlice";
import Cookies from "js-cookie";

const ProductList = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const token = Cookies.get("user");

  const products = product?.product;

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayProducts = products?.slice(
    pageVisited,
    pageVisited + postPerPage
  );

  const pageCount = Math.ceil(products?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDeleteProduct = (_id) => {
    //  dispatch(deleted(_id));
    console.log("Deleting product with ID:", _id);
    dispatch(deleteProduct({ _id, token }));
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
        {displayProducts?.map((p) => (
          <div
            key={p._id}
            className="grid grid-cols-8 font-semibold text-sm place-items-center"
          >
            <LazyLoadImage
              src={p.image}
              className="w-14 h-14"
              loading="lazy"
              effect="blur"
            />

            <h1>{p.name.substring(0, 20)}</h1>
            <h2>{formatCurrency(p.price)}</h2>
            <h3>{p.purchased || 0}</h3>
            <h4>{p.quantity}</h4>
            <h5 className=" uppercase text-xs">{p.status}</h5>
            <h6>
              {`${new Date(p.updatedAt).getFullYear()}-${(
                new Date(p.updatedAt).getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${new Date(p.updatedAt)
                .getDate()
                .toString()
                .padStart(2, "0")}`}
            </h6>

            <DropdownMenu>
              <DropdownMenuTrigger className=" outline-none uppercase">
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button
                    className="text-xs"
                    onClick={() => handleDeleteProduct(p._id)}
                  >
                    Delete Product
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="w-full">
                    <Link
                      className="text-xs"
                      to={`/admin/edit-product/${p._id}`}
                    >
                      Edit Product
                    </Link>
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
