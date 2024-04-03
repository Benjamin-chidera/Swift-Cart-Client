import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchFeature, removeItem } from "@/redux/features/cartSlice";

export const CartBtn = ({ s }) => {
  const { cart } = useSelector((state) => state.cart);
  
  const isInCart = cart.find((c) => c.id === s.id)

  console.log(isInCart);
  const dispatch = useDispatch();

  const handleAddToCart = (s) => {
    dispatch(addItem(s));
  };

  const handleRemoveFromCart = (s) => {
    dispatch(removeItem(s));
  };

  return (
    <main>
    {!isInCart ?  <button
        className="border-2 py-1 w-full border-red-600 text-xs rounded-md"
        onClick={() => handleAddToCart(s)}
      >
        ADD TO BAG
      </button> :
      <button
        className="border-2 py-1 w-full border-red-600 text-xs rounded-md"
        onClick={() => handleRemoveFromCart(s.id)}
      >
        Remove FROM BAG
      </button>}
    </main>
  );
};
