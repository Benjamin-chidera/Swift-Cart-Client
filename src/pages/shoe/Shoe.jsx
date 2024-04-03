import { featchCategories } from "@/redux/features/categorySlice";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency } from "@/lib/FormatCurrency";
import { addItem } from "@/redux/features/cartSlice";

const Shoe = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  const skinCare = categories?.payload;

  useEffect(() => {
    dispatch(featchCategories(category));
  }, [dispatch]);

  const handleAddCart = (s) => {
    dispatch(addItem(s));
  };

  return (
    <main className=" my-5 mx-3 md:container md:mx-auto">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center w-[800px] mx-auto shadow-2xl px-10 py-5 gap-5 rounded-xl max-w-full">
        {skinCare?.map((s) => (
          <div key={s.id} className=" hover:scale-[1.1] duration-200">
            <Link to={`/shoesDetails/${s.id}`}>
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

            <button
              className="border-2 py-1 w-full border-red-600 text-xs rounded-md"
              onClick={() => handleAddCart(s)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Shoe;
