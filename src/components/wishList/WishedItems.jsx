import { formatCurrency } from "@/lib/FormatCurrency";
import {
  getTotalPrice,
  getTotalQtyItem,
  removeItem,
  incItem,
  decItem,
  getCurrentQtyItem,
} from "@/redux/features/cartSlice";
import { removeWishList } from "@/redux/features/wishListSlice";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";

export const WishedItems = ({c}) => {
  const { id, image, title, price } = c;

  const dispatch = useDispatch();

  const removeCart = (c) => {
    dispatch(removeWishList(c));
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
        <h1 className="font-bold">{title.substring(0, 10)}</h1>
        <p className="font-bold">
          Color: <span className="font-medium">Red</span>
        </p>
        <p className="font-bold">
          Size: <span className="font-medium">XL</span>
        </p>
        <p className="font-bold">{formatCurrency(price)}</p>

        <div className="flex items-center gap-3">
    
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
