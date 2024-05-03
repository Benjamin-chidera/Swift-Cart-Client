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

const BodySuitsWomen = () => {
  const { category, gender } = useParams();
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const { categoriesGender, minPrice, maxPrice } = useSelector(
    (state) => state.categories
  );

  console.log(categoriesGender);
  const skinCare = categoriesGender?.payload?.product;

  const filteredProducts = skinCare?.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  const isFiltered = filteredProducts?.length < 1 ? skinCare : filteredProducts;

  useEffect(() => {
    dispatch(featchCategoriesAndGender({ category, gender }));
  }, [dispatch, category, gender]);

  return (
    <main className=" my-5 mx-3 md:container md:mx-auto lg:flex">
      <Filter min={minPrice} max={maxPrice} setMax={setMax} setMin={setMin} />
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-[800px] mx-auto shadow-2xl px-10 py-5 gap-5 rounded-xl max-w-full">
        {isFiltered?.length < 1 ? (
          <p className=" font-bold text-xl whitespace-nowrap">
            No Product Found
          </p>
        ) : (
          isFiltered?.map((s) => (
            <div
              key={s._id}
              className=" hover:scale-[1.1] duration-200 shadow w-[150px] p-2"
            >
              <Link to={`/bodysuits-women-Details/${s._id}`}>
                <LazyLoadImage
                  src={s.image}
                  className="w-[70px] mx-auto h-[70px] lg:w-full lg:h-[120px] object-cover
            
            "
                />
              </Link>
              <h3 className="my-2 text-xs md:text-sm text-center font-semibold">
                {s.name.substring(0, 20)}
              </h3>
              <p className="font-bold">{formatCurrency(s.price)}</p>

              <CartBtn s={s} />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default BodySuitsWomen;
