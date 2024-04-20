/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addWishList, removeWishList } from "@/redux/features/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
export const WishBtn = ({ s }) => {
  const { wishList } = useSelector((state) => state.wishList);

  const isAddedToWishList = wishList.find((wish) => wish._id === s._id);

  // console.log(wishList.length);

  const dispatch = useDispatch();
  const handleAddToWishList = (s) => {
    dispatch(addWishList(s));
  };

  const handleRemoveFromWishList = (s) => {
    dispatch(removeWishList(s));
  };

  return (
    <div className="bg-white px-1.5 rounded-full py-0.5">
      {!isAddedToWishList ? (
        <button onClick={() => handleAddToWishList(s)}>
          <FaRegHeart color="red" />
        </button>
      ) : (
        <button onClick={() => handleRemoveFromWishList(s._id)}>
          <FaHeart color="red" />
        </button>
      )}
    </div>
  );
};
