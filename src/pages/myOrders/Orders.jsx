import { createOrders, fetchOrders } from "@/redux/features/orderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaDotCircle } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import "../myOrders/order.css";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const myOrder = localStorage.getItem("orders");

  const order = JSON.parse(myOrder);

  // const check = localStorage.getItem("persist:root");

  // const final = JSON.parse(check);

  // console.log(final.cart);

  useEffect(() => {
    dispatch(fetchOrders(order));
  }, [dispatch]);

  return (
    <main className=" my-5 mx-3 md:container md:mx-auto">
      <section className="w-full p-3 mx-auto shadow-xl space-y-4 max-w-full">
        <h1 className="text-2xl font-bold uppercase underline text-gray-600">
          Orders
        </h1>

        {/* small devices */}

        <section className="w-full lg:hidden overflow-x-scroll whitespace-nowrap">
          <div className="w-full text-left grid grid-cols-7 gap-28 ">
            <p className="">Order</p>
            <p className="">Quantity</p>
            <p className="">Price</p>
            <p className="">Order number</p>
            <p className="">Order date</p>
            <p className="">Delivery date</p>
            <p className="">Status</p>
          </div>

          <div className="w-full text-left">
            {orders?.order?.map((o) => (
              <div
                key={o._id}
                className=" grid grid-cols-7 gap-28 items-center "
              >
                {o.cart.map((c) => (
                  <>
                    <section className="flex items-center gap-3">
                      <LazyLoadImage
                        effect="blur"
                        loading="lazy"
                        src={c.image}
                        alt=""
                        className="w-20 h-20"
                      />
                      <div>
                        <p className="text-xs underline">{c.name}</p>
                        <p className="text-xs">Size: {c.size}</p>
                        <p className="text-xs">Color: {c.color}</p>
                      </div>
                    </section>
                    <p>{c.quantity}</p>
                    <p>{formatCurrency(c.price)}</p>
                  </>
                ))}

                <p>{o.orderNumber || 0}</p>
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
                <p>{o.deliveryDate || 0}</p>
                <p>
                  <div className="flex items-center gap-2 text-yellow-400 underline text-xs">
                    <p>{o.status} </p>
                    <span>
                      <FaDotCircle size={5} />
                    </span>
                  </div>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* small devices */}

        {/* large devices */}
        <table className="lg:w-full  hidden lg:block">
          <thead className="lg:w-full text-left table-auto">
            <tr>
              <th className="w-36 pb-2">Order</th>
              <th className="w-32">Quantity</th>
              <th className="w-32">Price</th>
              <th className="w-32">Order number</th>
              <th className="w-32">Order date</th>
              <th className="w-32">Delivery date</th>
              <th className="w-32">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders?.order?.map((o) => (
              <tr key={o._id}>
                {o.cart.map((c) => (
                  <>
                    <td>
                      <section className="flex items-center gap-3">
                        <LazyLoadImage
                          effect="blur"
                          loading="lazy"
                          src={c.image}
                          alt=""
                          className="w-20"
                        />
                        <div>
                          <p className="text-xs underline">{c.name}</p>
                          <p className="text-xs">Size: {c.size}</p>
                          <p className="text-xs">Color: {c.color}</p>
                        </div>
                      </section>
                    </td>
                    <td>{c.quantity}</td>
                    <td>{formatCurrency(c.price)}</td>
                  </>
                ))}
                <td>{o.orderNumber || 0}</td>
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
                <td>{o.deliveryDate || 0}</td>
                <td>
                  <div className="flex items-center gap-2 text-yellow-400 underline text-xs">
                    <p>{o.status} </p>
                    <span>
                      <FaDotCircle size={5} />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Orders;
