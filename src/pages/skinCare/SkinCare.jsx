import { featchCategories } from "@/redux/features/categorySlice";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import { CartBtn } from "@/components/cart/CartBtn";
import { SkeletonLoadingProducts } from "@/components/Loader-Skeleton/SkeletonLoadingSearchBar";

export const SkinCare = () => {
  const { category, tags } = useParams();
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { categories, status } = useSelector(
    (state) => state.categories
  );

  const skinCare = categories?.payload?.product;

  const sortedProducts = skinCare?.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "all") {
      return skinCare;
    } else {
      return b.price - a.price;
    }
  });

  useEffect(() => {
    dispatch(featchCategories({ category, tags }));
  }, [dispatch, category, tags]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const filteredByColor = selectedColor
    ? sortedProducts?.filter((product) => product.color === selectedColor)
    : sortedProducts;

  const colorOptions = ["red", "blue", "green", "yellow", "white", "black", "brown"];

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const filteredBySize = selectedSize
    ? filteredByColor?.filter((product) => product.size === selectedSize)
    : filteredByColor;

  const sizeOptions = ["s", "m", "l", "xl", "xxl", "2xl"];

  return (
    <main className=" md:my-5  md:container md:mx-auto lg:flex gap-3">
      <div>
        <section className="my-3">
          <select
            name=""
            id=""
            onClick={handleSortChange}
            className=" outline-none"
          >
            <option value="all">Default</option>
            <option value="asc">Lowest Price</option>
            <option value="desc">Height Price</option>
          </select>
        </section>
        <section className="mx-3">
          <section className="my-3">
            <p>Filter by Color:</p>
            {colorOptions.map((color) => (
              <label key={color} className="flex gap-2 text-sm capitalize">
                <input
                  type="radio"
                  name="colorFilter"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => handleColorChange(color)}
                />
                {color}
              </label>
            ))}
          </section>

          {/* filter by size */}
          <section className="my-3">
            <p>Filter by Size:</p>
            {sizeOptions.map((size) => (
              <label key={size} className="flex gap-2 text-sm capitalize">
                <input
                  type="radio"
                  name="sizeFilter"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </section>
        </section>
      </div>
      <section
        className={`shadow-2xl w-[950px] max-w-full md:px-3 md:py-5 gap-5 rounded-xl ${
          status === "idle" && "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        } `}
      >
        {filteredBySize?.length < 1 ? (
          <p className=" font-bold text-xl whitespace-nowrap p-2 text-center flex justify-center">
            No Product Found
          </p>
        ) : status === "loading" ? (
          <SkeletonLoadingProducts num={filteredBySize?.length} />
        ) : (
          filteredBySize?.map((s) => (
            <div
              key={s._id}
              className=" md:hover:scale-[1.1] duration-200 shadow w-full p-2"
            >
              <Link to={`/${category}/${tags}/${s?._id}`}>
                <LazyLoadImage
                  src={s.image}
                  className="w-full mx-auto h-[100px] lg:w-full lg:h-[120px] object-cover"
                />
              </Link>
              <h3 className="my-1 text-xs md:text-sm  ">
                {s.name.substring(0, 20)}
              </h3>
              <p className="text-xs mb-1">{s.details.substring(0, 30)}</p>
              <p className="font-bold text-sm">{formatCurrency(s.price)}</p>

              <CartBtn s={s} />
            </div>
          ))
        )}
      </section>
    </main>
  );
};
