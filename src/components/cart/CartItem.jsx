/* eslint-disable react/prop-types */
import { formatCurrency } from "@/lib/FormatCurrency";
import {
  getTotalPrice,
  getTotalQtyItem,
  removeItem,
  incItem,
  decItem,
  getCurrentQtyItem,
} from "@/redux/features/cartSlice";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";

export const CartItem = ({ c, id }) => {
  const { image, name, price } = c;

  const dispatch = useDispatch();

  const removeCart = (c) => {
    dispatch(removeItem(c));
  };

  const increase = (c) => {
    dispatch(incItem(c));
  };
  const decrease = (c) => {
    dispatch(decItem(c));
  };

  const qty = useSelector(getCurrentQtyItem(id));

  return (
    <section className="flex gap-5">
      <img
        src={image}
        alt=""
        className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
      />

      <div className=" flex-1 text-xs max-w-[100px]">
        <h1 className="font-bold">{name?.substring(0, 10)}</h1>
        <p className="font-bold">
          Color: <span className="font-medium">Red</span>
        </p>
        <p className="font-bold">
          Size: <span className="font-medium">XL</span>
        </p>
        <p className="font-bold">{formatCurrency(price)}</p>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm rounded-full gap-4 border-2 font-bold mt-2 px-3">
            <button className=" font-black" onClick={() => decrease(id)}>
              -
            </button>
            <p>{qty}</p>
            <button className=" font-black" onClick={() => increase(id)}>
              +
            </button>
          </div>
          <button
            className="font-bold underline mt-2"
            onClick={() => removeCart(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </section>
  );
};
