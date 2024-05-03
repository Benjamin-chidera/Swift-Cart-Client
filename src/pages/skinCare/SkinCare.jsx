import { featchCategories } from "@/redux/features/categorySlice";
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

export const SkinCare = () => {
  const { category, tags } = useParams();
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  // const {} = useSelector((state) => state.filters);

  const { categories, minPrice, maxPrice, status } = useSelector(
    (state) => state.categories
  );

  const skinCare = categories?.payload?.product;

  const filteredProducts = skinCare?.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  const isFiltered = filteredProducts?.length < 1 ? skinCare : filteredProducts;

  useEffect(() => {
    dispatch(featchCategories({ category, tags }));
  }, [dispatch, category, tags]);

  // if () {
  //   return
  // }

  return (
    <main className=" md:my-5  md:container md:mx-auto lg:flex gap-3">
      <section className="mx-3">
        <Filter min={minPrice} max={maxPrice} setMax={setMax} setMin={setMin} />
      </section>
      <section className={`shadow-2xl w-[950px] max-w-full md:px-3 md:py-5 gap-5 rounded-xl ${status === "idle"&& "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} `}>
        {isFiltered?.length < 1 ? (
          <p className=" font-bold text-xl whitespace-nowrap">
            No Product Found
          </p>
        ) : status === "loading" ? (
          <SkeletonLoadingProducts num={isFiltered?.length} />
        ) : (
          isFiltered?.map((s) => (
            <div
              key={s._id}
              className=" hover:scale-[1.1] duration-200 shadow w-[150px] p-2"
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
              <p className="text-xs mb-1">{s.description.substring(0, 30)}</p>
              <p className="font-bold text-sm">{formatCurrency(s.price)}</p>

              <CartBtn s={s} />
            </div>
          ))
        )}
      </section>
    </main>
  );
};
