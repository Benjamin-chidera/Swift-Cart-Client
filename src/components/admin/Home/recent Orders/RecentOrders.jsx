import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";


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
  return (
    <main className="my-10 shadow p-3 rounded w-full">
      <h1 className="text-sm font-bold mb-3">Recent Order</h1>
      <section className="grid grid-cols-7 place-items-start">
        <p>Order ID</p>
        <p>Product Name</p>
        <p className="ms-3">Units</p>
        <p>Order Date</p>
        <p>Order Costs</p>
        <p>Status</p>
      </section>

      <section className=" space-y-4 mt-5 text-sm">
        {recent.map((r) => (
          <div key={r.id} className="grid grid-cols-7 place-items-start">
            <p>{r.orderId}</p>
            <p>{r.name}</p>
            <p className="ms-5">{r.units}</p>
            <p>{r.date}</p>
            <p>{formatCurrency(r.totalPrice)}</p>
            <p
              className={`${
                r.status === "delivered" ? "bg-green-700" : "bg-blue-600"
              } text-white px-3 rounded-full text-xs capitalize`}
            >
              {r.status}
            </p>

            <button>
              <BsThreeDotsVertical />
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};
