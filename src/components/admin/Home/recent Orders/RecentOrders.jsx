import {
  SkeletonLoadingRecentOrder,
  SkeletonLoadingSoldItem,
} from "@/components/Loader-Skeleton/SkeletonLoadingAdmin";
import { formatCurrency } from "@/lib/FormatCurrency";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

const recent = [
  {
    id: crypto.randomUUID(),
    name: "	Coach Swagger",
    units: "2",
    date: "	Oct 20, 2018",
    totalPrice: 20000,
    status: "in progress",
    orderId: 24583,
  },
  {
    id: crypto.randomUUID(),
    name: "Toddler Shoes, Gucci Watch",
    units: "5",
    date: "	Oct 20, 2018",
    totalPrice: 20000,
    status: "delivered",
    orderId: 24583,
  },
  {
    id: crypto.randomUUID(),
    name: "	Hat Black Suits",
    units: "4",
    date: "	Oct 20, 2018",
    totalPrice: 20000,
    status: "delivered",
    orderId: 24583,
  },
  {
    id: crypto.randomUUID(),
    name: "Backpack Gents, Swimming Cap Slin",
    units: "4",
    date: "	Oct 20, 2018",
    totalPrice: 20000,
    status: "in progress",
    orderId: 24583,
  },
];

export const RecentOrders = () => {
  const [loading, setLoading] = useState(true);
  const { orders } = useSelector((state) => state.orders);
  //  console.log(orders.order);

  const recentOrder = orders.order?.slice(0, 5);
  

  useEffect(() => {
    const load = setInterval(() => {
      setLoading(false);
    }, 3000);

    return () => clearInterval(load);
  }, []);

  return (
    <main className="my-10 shadow p-3 rounded w-full">
      <h1 className="text-sm font-bold mb-3">Recent Order</h1>
      <section className="grid grid-cols-6 place-items-start w-full">
        <p>Order ID</p>
        <p>Product Name</p>
        <p>Units</p>
        <p>Order Date</p>
        <p>Order Costs</p>
        <p>Status</p>
      </section>

      <section className=" space-y-4 mt-5 text-sm">
        {loading ? (
          <SkeletonLoadingRecentOrder num={6} />
        ) : (
          recentOrder?.map((o) => (
            <section key={o._id} className=" space-y-4">
              {o?.cart?.map((c) => (
                <section key={c._id} className="grid grid-cols-6">
                  <div>
                    <p>{o.orderId || 14387476363}</p>
                  </div>
                  <div>
                    <p className="text-xs underline">{c.name}</p>
                  </div>

                  <p>{c.quantity}</p>
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
                  <p>{formatCurrency(c.price)}</p>
                  <div className="flex items-center gap-2 text-yellow-400 underline text-xs">
                    <p>{o.OrderStatus} </p>
                    <span>
                      <FaDotCircle size={5} />
                    </span>
                  </div>
                </section>
              ))}
            </section>
          ))
        )}
      </section>
    </main>
  );
};
