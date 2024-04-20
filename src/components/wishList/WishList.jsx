import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/FormatCurrency";
import { getTotalPrice, getTotalQtyItem } from "@/redux/features/cartSlice";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";

import { FaRegHeart } from "react-icons/fa";
import { WishedItems } from "./WishedItems";
import { clearWishList } from "@/redux/features/wishListSlice";

export const WishList = () => {
  const { wishList } = useSelector((state) => state.wishList);

  const dispatch = useDispatch();

  const clearList = () => {
    dispatch(clearWishList());
  };

  return (
    <main>
      <Sheet>
        <SheetTrigger>
          <div>
            <FaRegHeart size={17} />
            {wishList.length > 0 && (
              <span className=" absolute -top-3 -right-2.5 bg-red-600 text-xs rounded-full px-1.5 text-white py-[1.5px]">
                {wishList.length}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Saved Items</SheetTitle>
            <SheetDescription>
              {wishList.length > 0 ? (
                <section className=" space-y-5 ">
                  {wishList.map((c) => (
                    <SheetDescription key={c._id}>
                      <WishedItems c={c} id={c._id} />
                    </SheetDescription>
                  ))}
                  <div>
                    <button
                      className="bg-red-600 w-full py-1 font-black text-xs text-white rounded-full"
                      onClick={clearList}
                    >
                      CLEAR ITEMS
                    </button>
                  </div>
                </section>
              ) : (
                <div className="grid place-items-center h-screen font-bold">
                  <p>NO ITEM SAVED</p>
                  <p>🛒</p>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
};
