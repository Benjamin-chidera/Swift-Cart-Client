import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { FaRotate } from "react-icons/fa6";

const products = [
  {
    id: crypto.randomUUID(),
    img: "https://maraviyainfotech.com/projects/ekka/ekka-v37/ekka-admin/assets/img/products/p1.jpg",

    name: "shoe",
    desc: "lorem ipsum dolor sit amet, consectetur adip inc commodo",
    price: 30000,
    totalSales: 53,
  },
  {
    id: crypto.randomUUID(),
    img: "https://maraviyainfotech.com/projects/ekka/ekka-v37/ekka-admin/assets/img/products/p2.jpg",

    name: "hoodies for men",
    desc: "lorem ipsum dolor sit amet, consectetur adip inc commodo",
    price: 50000,
    totalSales: 23,
  },
  {
    id: crypto.randomUUID(),
    img: "https://maraviyainfotech.com/projects/ekka/ekka-v37/ekka-admin/assets/img/products/p3.jpg",

    name: "sleeve for men",
    desc: "lorem ipsum dolor sit amet, consectetur adip inc commodo",
    price: 10000,
    totalSales: 10,
  },
];

export const TopProducts = () => {
  return (
    <main className="shadow rounded p-3">
      <section className="flex items-center justify-between">
        <h2>Top Products</h2>
        <button>
          <FaRotate />
        </button>
      </section>

      <section className=" space-y-5 mt-3">
        {products.map((p) => (
          <div key={p.id} className="flex justify-between">
            <img src={p.img} alt="" className="w-20 h-20" />

            <div>
              <h2 className="font-semibold text-sm">{p.name}</h2>
              <p className="text-xs max-w-[230px]">{p.desc}</p>
              <p className=" text-xs">{formatCurrency(p.price)}</p>
            </div>
            <p className=" text-xs">{p.totalSales} Sales</p>
          </div>
        ))}
      </section>
    </main>
  );
};
