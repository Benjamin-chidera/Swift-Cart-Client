/* eslint-disable react/prop-types */
import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

export const SearchedItem = ({
  _id,
  name,
  image,
  price,
  description,
  category,
  tags,
  handleClose,
}) => {
  return (
    <div>
      <Link
        className="flex gap-2"
        to={`/${category}/${tags}/${_id}`}
        onClick={handleClose}
      >
        <LazyLoadImage
          src={image}
          effect="blur"
          loading="lazy"
          className="w-28 h-28 object-cover"
        />
        <div>
          <h1 className="text-xs">{name}</h1>
          <p className="text-xs">{formatCurrency(price)}</p>
          <p className="text-xs">{description.substring(0, 60)}</p>
        </div>
      </Link>
    </div>
  );
};
