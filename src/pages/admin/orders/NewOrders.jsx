// import { orders } from "@/components/data/orders";
import { formatCurrency } from "@/lib/FormatCurrency";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { FaDotCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { fetchOrders, updateStatus } from "@/redux/features/orderSlice";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const NewOrders = () => {
  const { register, handleSubmit } = useForm();
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const token = Cookies.get("userToken");
  const [decodedToken, setDecodedToken] = useState(null);

  const pageVisited = pageNumber * postPerPage;

  // const displayOrders = orders?.order?.slice(
  //   pageVisited,
  //   pageVisited + postPerPage
  // );

  
  const displayOrders = Array.isArray(orders?.order)
  ? orders?.order?.slice(pageVisited, pageVisited + postPerPage)
  : [];
  console.log(displayOrders);

  const pageCount = Math.ceil(orders?.order?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, [dispatch, token]);

  const handleUpdateStatus = ({ data, statusId }) => {
    try {
      const formData = new FormData();

      formData.append("OrderStatus", data.OrderStatus);

      console.log(data, statusId);
      dispatch(updateStatus({ formData, statusId: data._id }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle invalid token or decoding error
    }
  }, [token]);

  return (
    <main>
      <div>
        <h1 className="font-bold text-sm">New Orders</h1>
      </div>

      <section className="my-5 grid grid-cols-9 place-items-center text-sm">
        <p>Item</p>
        <p>Name / Size / Color</p>
        <p>Customer</p>
        <p>Items</p>
        <p>Price</p>
        <p>Payment</p>
        <p>Status</p>
        <p>Date</p>
        <p>Action</p>
      </section>

      <section className="my-5">
        {decodedToken?.role === "admin" ? (
          displayOrders?.map((o) => (
            <section key={o._id}>
              {o?.cart?.map((c) => (
                <section
                  key={c._id}
                  className="grid grid-cols-9 place-items-center"
                >
                  <div>
                    <LazyLoadImage
                      effect="blur"
                      loading="lazy"
                      src={c.image}
                      alt=""
                      className="w-20"
                    />
                  </div>
                  <div>
                    <p className="text-xs underline ">{c.name}</p>
                    <p className="text-xs">Size: {c.size}</p>
                    <p className="text-xs whitespace-nowrap">
                      Color: {c.color}
                    </p>
                  </div>

                  <p>{c.user || "ben"}</p>
                  <p>{c.quantity}</p>
                  <p>{formatCurrency(o.totalPrice)}</p>
                  <p className="font-bold">Paid</p>
                  <div className="flex items-center gap-2 text-yellow-400 underline text-xs">
                    <p>{o.OrderStatus} </p>
                    <span>
                      <FaDotCircle size={5} />
                    </span>
                  </div>
                  <p>
                    {" "}
                    {`${new Date(o.updatedAt).getFullYear()}-${(
                      new Date(o.updatedAt).getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}-${new Date(o.updatedAt)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`}
                  </p>
                  <form
                    action=""
                    onSubmit={() => handleSubmit(handleUpdateStatus(o._id))}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger className=" outline-none uppercase">
                        <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link to={`/admin/new-order/${o._id}`}>
                            View Order
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </form>
                </section>
              ))}
            </section>
          ))
        ) : (
          <p className=" text-center font-bold">Sign In Admin</p>
        )}
      </section>

      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />
    </main>
  );
};

export default NewOrders;
