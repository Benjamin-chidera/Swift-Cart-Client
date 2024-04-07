import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { FaRotate } from "react-icons/fa6";

const sold = [
  {
    id: crypto.randomUUID(),
    name: "backpack",
    numItem: 6,
    price: 2000,
  },
  {
    id: crypto.randomUUID(),
    name: "T-Shirt",
    numItem: 6,
    price: 2000,
  },
  {
    id: crypto.randomUUID(),
    name: "coat",
    numItem: 6,
    price: 2000,
  },
  {
    id: crypto.randomUUID(),
    name: "Shoes",
    numItem: 6,
    price: 2000,
  },
];

export const SoldItems = () => {
  return (
    <main className="my-10 w-[50%] shadow p-3 rounded-md">
      <section className="flex items-center justify-between">
        <h2>Sold by Items</h2>
        <button>
          <FaRotate />
        </button>
      </section>
      <div className="grid grid-cols-3">
        <p>Item</p>
        <p>Num Of Item</p>
        <p>Price</p>
      </div>

      <section className="mt-2">
        {sold.map((s) => (
          <div key={s.id} className="grid grid-cols-3">
            <h4>{s.name}</h4>
            <p className="">{s.numItem}</p>
            <p>{formatCurrency(s.price)}</p>
          </div>
        ))}
      </section>
    </main>
  );
};
