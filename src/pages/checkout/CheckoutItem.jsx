/* eslint-disable react/prop-types */
import { formatCurrency } from "@/lib/FormatCurrency";
import { getTotalPrice } from "@/redux/features/cartSlice";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const CheckoutItem = ({ c }) => {
  const { id, image, title, price, quantity } = c;

 

  return (
    <main>
      <section className="flex flex-wrap items-center md:ms-10 justify-between mt-5">
        <div className=" relative">
          <LazyLoadImage src={image} className="w-[50px]" />
          <p className=" absolute -top-2 -right-2 bg-red-600 text-xs px-1.5 py-0.5 text-white rounded-full">
            {quantity}
          </p>
        </div>

        <div className="text-xs">
          <h3 className="font-bold">{title}</h3>
          <p>XL</p>
        </div>

        <p className="text-sm font-bold">{formatCurrency(price)}</p>
      </section>
    </main>
  );
};
