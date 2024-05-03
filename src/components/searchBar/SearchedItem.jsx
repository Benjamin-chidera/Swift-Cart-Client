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
          className="w-24 h-24 md:w-28  md:h-28 object-cover"
        />
        <div>
          <h1 className="text-[11px] md:text-xs">{name}</h1>
          <p className="text-[11px] md:text-xs">{formatCurrency(price)}</p>
          <p className="text-[11px] md:text-xs">{description.substring(0, 60)}</p>
        </div>
      </Link>
    </div>
  );
};
