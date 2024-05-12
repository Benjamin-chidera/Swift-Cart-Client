import { fetchSingleOrders } from "@/redux/features/orderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaDotCircle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import { TbTruckReturn } from "react-icons/tb";

import Cookies from "js-cookie";
import { OrderReviews } from "./orderReviews";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { singleOrder } = useSelector((state) => state.orders);

  const token = Cookies.get("userToken");

  useEffect(() => {
    dispatch(fetchSingleOrders({ orderId, token }));
  }, [dispatch, orderId]);

  return (
    <main className=" my-5 mx-3 md:container md:mx-auto">
      <section>
        <div className="flex justify-between items-center">
          <Link to={-1} className="flex items-center gap-2">
            <FaArrowLeft /> Back
          </Link>

          {/* <div>
            <OrderReviews />
          </div> */}
        </div>
        <hr className="my-2" />
      </section>

      <section>
        {singleOrder?.order?.cart?.map((c) => (
          <section key={c._id}>
            <div>
              <OrderReviews id={c._id} />
            </div>
            <p className="font-semibold">
              Order no: {singleOrder.order.orderNumber || 3223887623}
            </p>
            <div className="text-sm text-gray-500">
              <p>
                {c.quantity} {c.quantity < 2 ? "Item" : "Items"}
              </p>
              <p>
                {" "}
                Placed On
                <span className="ms-2">{`${new Date(
                  c.updatedAt
                ).getFullYear()}-${(new Date(c.updatedAt).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${new Date(c.updatedAt)
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`}</span>
              </p>
              <p>Total: {singleOrder.order.totalPrice}</p>
              <hr className="my-5" />
            </div>
            <p className="font-semibold">ITEMS IN YOUR ORDER</p>

            <section className="border p-2">
              <div className="flex items-center gap-2 text-yellow-400 underline text-xs mb-2">
                <p>{singleOrder.order.OrderStatus} </p>
                <span>
                  <FaDotCircle size={5} />
                </span>
              </div>

              <p className="font-semibold text-sm">
                <p>
                  <span>
                    {singleOrder.order.deliveryDate
                      ? `${new Date(
                          singleOrder.order.deliveryDate
                        ).getFullYear()}-${(
                          new Date(singleOrder.order.deliveryDate).getMonth() +
                          1
                        )
                          .toString()
                          .padStart(2, "0")}-${new Date(
                          singleOrder.order.deliveryDate
                        )
                          .getDate()
                          .toString()
                          .padStart(2, "0")}`
                      : "Giving update soon..."}
                  </span>
                </p>
              </p>

              <div className="flex gap-2">
                <LazyLoadImage
                  effect="blur"
                  loading="lazy"
                  src={c.image}
                  alt=""
                  className="w-24 h-20"
                />

                <div className="flex flex-col gap-2">
                  <p className="text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500">QTY: {c.quantity}</p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(c.price)}
                  </p>
                </div>
              </div>
              <p className="text-sm my-3 text-gray-500 flex item-center gap-2">
                <TbTruckReturn size={20} /> The return period ends in{" "}
                {c.returns.replace("in", "").replace("return", "")}
              </p>
            </section>

            <section className="w-full flex items-center gap-10 mt-5">
              <div className="w-[50%] border rounded-md h-[230px]">
                <p className="text-sm font-semibold px-2 py-1">
                  PAYMENT INFORMATION
                </p>
                <hr className="mb-2" />

                <div className="p-2 flex gap-3 flex-col">
                  <p className="text-sm font-semibold">PAYMENT Details</p>
                  <p className="text-sm text-gray-500">
                    Items total: {formatCurrency(c.price)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Delivery Fees: {formatCurrency(c.price)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: {singleOrder.order.totalPrice}
                  </p>
                </div>
              </div>

              <div className="w-[50%] border rounded-md h-[230px]">
                <p className="text-sm font-semibold px-2 py-1">
                  DELIVERY INFORMATION
                </p>
                <hr className="mb-2" />

                <div className="p-2 flex gap-3 flex-col">
                  <p className="text-sm font-semibold">Shipping Address</p>
                  <p className="text-sm text-gray-500">
                    {singleOrder.order.shippingAddress.name ||
                      "Benjamin Chidera"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {singleOrder.order.shippingAddress.address}
                  </p>
                </div>

                <div className="p-2 flex gap-3 flex-col">
                  <p className="text-sm font-semibold">Shipping Details</p>
                  <p className="text-sm text-gray-500">
                    Delivery on{" "}
                    <span>{`${new Date(
                      singleOrder.order.deliveryDate
                    ).getFullYear()}-${(
                      new Date(singleOrder.order.deliveryDate).getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}-${new Date(
                      singleOrder.order.deliveryDate
                    )
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`}</span>
                  </p>
                </div>
              </div>
            </section>
          </section>
        ))}
      </section>
    </main>
  );
};

export default OrderDetails;
