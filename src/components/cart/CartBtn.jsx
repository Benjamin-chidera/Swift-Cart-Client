import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux/features/cartSlice";
import { Button } from "../ui/button";

export const CartBtn = ({ s }) => {
  const { cart } = useSelector((state) => state.cart);
  
  const isInCart = cart.find((c) => c?._id === s?._id)

  const dispatch = useDispatch();

  const handleAddToCart = (s) => {
    dispatch(addItem(s));
  };

  const handleRemoveFromCart = (s) => {
    dispatch(removeItem(s));
  };

  return (
    <main>
    {!isInCart ?  <Button
        className="border-2 py-1 w-full border-red-600 text-xs rounded-md"
        onClick={() => handleAddToCart(s)}
      >
        ADD TO BAG
      </Button> :
      <Button
        className="border-2 py-1 w-full border-red-600 text-xs rounded-md uppercase"
        onClick={() => handleRemoveFromCart(s._id)}
      >
        Remove FROM BAG
      </Button>}
    </main>
  );
};
