import { featchCategoriesAndGender } from "@/redux/features/categorySlice";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import { addItem } from "@/redux/features/cartSlice";
import { CartBtn } from "@/components/cart/CartBtn";
import { Filter } from "@/components/filters/Filter";
import { SkeletonLoadingProducts } from "@/components/Loader-Skeleton/SkeletonLoadingSearchBar";

const BodySuitsWomen = () => {
  const { category, gender } = useParams();
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { categoriesGender, minPrice, maxPrice, status } = useSelector(
    (state) => state.categories
  );

  const skinCare = categoriesGender?.payload?.product;

  const filteredProducts = skinCare?.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  const isFiltered = filteredProducts?.length < 1 ? skinCare : filteredProducts;

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
    dispatch(featchCategoriesAndGender({ category, gender }));
  }, [dispatch, category, gender]);

   const handleSortChange = (e) => {
     setSortOrder(e.target.value);
   };

   const handleColorChange = (color) => {
     setSelectedColor(color);
   };

   const filteredByColor = selectedColor
     ? sortedProducts?.filter((product) => product.color === selectedColor)
     : sortedProducts;

    const colorOptions = [
      "red",
      "blue",
      "green",
      "yellow",
      "white",
      "black",
      "brown",
    ];

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
              <Link to={`/${category}/${gender}/${s._id}`}>
                <LazyLoadImage
                  src={s.image}
                  className="w-full mx-auto h-[100px] md:h-[150px] lg:w-full lg:h-[200px] object-cover object-top"
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

export default BodySuitsWomen;
