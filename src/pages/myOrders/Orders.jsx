import { createOrders, fetchOrders } from "@/redux/features/orderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaDotCircle } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import "../myOrders/order.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Paginate from "@/components/paginate/Paginate";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const myOrder = localStorage.getItem("orders");
  const TotalOrders = orders?.order?.length;
  const token = Cookies.get("userToken");
  const [decodedToken, setDecodedToken] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;
  const order = JSON.parse(myOrder);

    const pageVisited = pageNumber * postPerPage;

    const displayOrders = Array.isArray(orders?.order)
      ? orders?.order?.slice(pageVisited, pageVisited + postPerPage)
      : [];

    const pageCount = Math.ceil(orders?.order?.length / postPerPage);

    const ChangePage = ({ selected }) => {
      setPageNumber(selected);
    };

    useEffect(() => {
      dispatch(fetchOrders(token));
    }, [dispatch, token]);

    console.log(displayOrders);

  return (
    <main className=" my-5 mx-3 md:container md:mx-auto">
      <section className="w-full p-3 mx-auto shadow-xl space-y-4 max-w-full">
        {decodedToken?.role === "user" && (
          <h1 className="text-2xl font-bold uppercase underline text-gray-600">
            Orders {TotalOrders}
          </h1>
        )}

        {/* small devices */}

        <section className="w-full lg:hidden space-y-5  border p-2">
          {!decodedToken?.role === "user" || !orders?.order ? (
            <p className="text-center my-10 font-bold text-xl">
              Sign in to see or place order
            </p>
          ) : (
            displayOrders?.map((o) => (
              <section key={o?._id} className=" space-y-5">
                {o?.cart?.map((c) => (
                  <section key={c?._id} className="">
                    <div className="flex gap-5">
                      <LazyLoadImage
                        effect="blur"
                        loading="lazy"
                        src={c?.image}
                        alt=""
                        className="w-20 h-20"
                      />
                      <div>
                        <p className="text-xs underline">{c?.name}</p>
                        <p className="text-xs text-gray-600">
                          {o?.orderNumber || 12748939}
                        </p>

                        <div className="flex items-center gap-2 text-yellow-400 underline text-xs">
                          <p>{o?.OrderStatus} </p>
                          <span>
                            <FaDotCircle size={5} />
                          </span>
                        </div>
                        <p className="text-xs font-bold mt-1">
                          On {o?.deliveryDate || "02-04-24"}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}
              </section>
            ))
          )}
        </section>

        {/* small devices */}

        {/* large devices */}

        <section className=" hidden lg:block">
          <div className="grid grid-cols-7 place-items-center">
            <th className="w-36 pb-2">Order</th>
            <th className="w-32">Quantity</th>
            <th className="w-32">Total Price</th>
            <th className="w-32">Order number</th>
            <th className="w-32">Order date</th>
            <th className="w-32">Delivery date</th>
            <th className="w-32">Status</th>
          </div>

          {!decodedToken?.role === "user" || !orders?.order ? (
            <p className="text-center my-10 font-bold text-xl hidden lg:block">
              Sign in to see or place order
            </p>
          ) : (
            displayOrders?.map((o) => (
              <section key={o?._id} className="">
                {o?.cart?.map((c) => (
                  <section
                    key={c?._id}
                    className="grid grid-cols-7 place-items-center"
                  >
                    <div className=" grid grid-cols-2 place-items-center gap-5 space-y-4">
                      <div>
                        <LazyLoadImage
                          effect="blur"
                          loading="lazy"
                          src={c?.image}
                          alt=""
                          className="w-20"
                        />
                      </div>

                      <div className="">
                        <p className="text-xs underline">{c?.name}</p>
                        <p className="text-xs">Size: {c?.size}</p>
                        <p className="text-xs whitespace-nowrap">
                          Color: {c?.color}
                        </p>
                      </div>
                    </div>
                    <p>{c?.quantity}</p>
                    <p>{formatCurrency(o?.totalPrice)}</p>
                    <p>{o?.orderNumber || 0}</p>
                    <p>
                      {" "}
                      {`${new Date(o?.updatedAt).getFullYear()}-${(
                        new Date(o?.updatedAt).getMonth() + 1
                      )
                        .toString()
                        .padStart(2, "0")}-${new Date(o?.updatedAt)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`}
                    </p>

                    <p className="font-semibold">
                      {o.deliveryDate
                        ? `${new Date(o?.deliveryDate).getFullYear()}-${(
                            new Date(o?.deliveryDate).getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${new Date(o?.deliveryDate)
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`
                        : "No Date Yet"}
                    </p>

                    <div>
                      <div className="flex items-center gap-2 text-yellow-400 underline text-xs">
                        <p>{o?.OrderStatus} </p>
                        <span>
                          <FaDotCircle size={5} />
                        </span>
                      </div>

                      <Link className="text-[11px]" to={`/order/${o?._id}`}>
                        View Details
                      </Link>
                    </div>
                  </section>
                ))}
              </section>
            ))
          )}
        </section>

        {/* pagination */}
        <Paginate pageCount={pageCount} ChangePage={ChangePage} />
      </section>
    </main>
  );
};

export default Orders;
