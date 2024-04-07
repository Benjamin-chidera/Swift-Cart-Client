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

const BodySuitsMen = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

  const { categories, minPrice, maxPrice } = useSelector(
    (state) => state.categories
  );

  const skinCare = categories?.payload;

   const filteredProducts = skinCare?.filter(
     (product) => product.price >= minPrice && product.price <= maxPrice
   );

   const isFiltered =
     filteredProducts?.length < 1 ? skinCare : filteredProducts;

  useEffect(() => {
    dispatch(featchCategories(category));
  }, [dispatch]);


  return (
    <main className=" my-5 mx-3 md:container md:mx-auto flex">
      <Filter min={minPrice} max={maxPrice} setMax={setMax} setMin={setMin} />
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-[800px] mx-auto shadow-2xl px-10 py-5 gap-5 rounded-xl max-w-full">
        {isFiltered?.map((s) => (
          <div key={s.id} className=" hover:scale-[1.1] duration-200">
            <Link to={`/bodysuits-men-Details/${s.id}`}>
              <LazyLoadImage
                src={s.image}
                className="w-[70px] mx-auto h-[70px] lg:w-[120px] lg:h-[110px]
            
            "
              />
            </Link>
            <h3 className="my-2 text-xs md:text-sm">
              {s.title.substring(0, 20)}
            </h3>
            <p className="font-bold">{formatCurrency(s.price)}</p>

            <CartBtn s={s} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default BodySuitsMen;
