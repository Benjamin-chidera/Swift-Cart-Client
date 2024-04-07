import { fetchOrders } from "@/redux/features/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaDotCircle } from "react-icons/fa";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <main className=" my-5 mx-3 md:container md:mx-auto">
      <section className="w-[600px] p-3 mx-auto shadow-xl space-y-4 max-w-full">
        {orders.map((r) => (
          <section key={r.id} className="flex items-center gap-5">
            <LazyLoadImage
              src={r.image}
              className="w-[70px] h-[70px] object-contain"
              loading="lazy"
              effect="blur"
            />

            <div>
              <p className="text-xs flex items-center gap-3 text-yellow-400 underline">
                status: Delivery in Progress{" "}
                <span>
                  <FaDotCircle size={5} />
                </span>{" "}
              </p>
              <h2 className="text-sm">{r.title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <p>Size : L</p>
                <p>Color : Silver</p>
              </div>
            </div>
          </section>
        ))}
      </section>
    </main>
  );
};

export default Orders;
