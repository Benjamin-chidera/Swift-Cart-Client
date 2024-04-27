/* eslint-disable react/prop-types */
import { formatCurrency } from "@/lib/FormatCurrency";
import { getTotalPrice, getTotalQtyItem } from "@/redux/features/cartSlice";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";

export const CheckoutItem = ({ c }) => {
  const { image, name, price, quantity, size, shipping } = c;
  const totalPrice = useSelector(getTotalPrice);

  const amount = Math.floor(totalPrice * 0.4);

  const grandTotal = amount + totalPrice;

  return (
    <main>
      <section className="flex flex-wrap items-center md:ms-10 gap-10 mt-5">
        <div className=" relative">
          <LazyLoadImage src={image} className="w-[50px]" />
          <p className=" absolute -top-2 -right-2 bg-red-600 text-xs px-1.5 py-0.5 text-white rounded-full">
            {quantity}
          </p>
        </div>

        <div className="text-xs">
          <h3 className="font-bold">{name}</h3>
          <p>Size {size}</p>
          <p className="text-sm font-bold">{formatCurrency(price)}</p>
        </div>
      </section>

      <section className="mx-10 mt-5 font-semibold flex justify-between text-lg">
        <h1>Shipping</h1>
        <p>{formatCurrency(amount)}</p>
      </section>

      <div className="mx-10 mt-5 font-semibold flex justify-between text-lg">
        <h1>Total</h1>
        <p>{formatCurrency(grandTotal)}</p>
      </div>
    </main>
  );
};
