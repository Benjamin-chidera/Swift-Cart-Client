import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { FaRotate } from "react-icons/fa6";

const customers = [
  {
    id: crypto.randomUUID(),
    name: "ben",
    email: "ben@gmail.com",
    orders: 2,
    totalSale: "50000",
    img: "https://maraviyainfotech.com/projects/ekka/ekka-v37/ekka-admin/assets/img/user/u1.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "chidera",
    email: "chidera@gmail.com",
    orders: 2,
    totalSale: "20000",
    img: "https://maraviyainfotech.com/projects/ekka/ekka-v37/ekka-admin/assets/img/user/u2.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "benjamin",
    email: "chidera@gmail.com",
    orders: 12,
    totalSale: "50000",
    img: "https://maraviyainfotech.com/projects/ekka/ekka-v37/ekka-admin/assets/img/user/u2.jpg",
  },
];

export const NewCustomer = () => {
  return (
    <main className=" shadow p-3 rounded">
      <section className="flex items-center justify-between">
        <h2>New Customers</h2>
        <button>
          <FaRotate />
        </button>
      </section>

      <section className=" space-y-5 mt-5">
        {customers.map((c) => (
          <div
            key={c.id}
            className="  text-sm grid grid-cols-4 place-items-start"
          >
            <img src={c.img} alt="" className="w-10 h-10" />
            <div className="">
              <h3>{c.name}</h3>
              <p className=" text-xs">{c.email}</p>
            </div>

            <p className="ms-5">{c.orders} orders</p>
            <p>{formatCurrency(c.totalSale)}</p>
          </div>
        ))}
      </section>
    </main>
  );
};
