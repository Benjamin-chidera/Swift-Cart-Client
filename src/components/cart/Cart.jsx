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
import { useSelector } from "react-redux";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const totalQty = useSelector(getTotalQtyItem);
  const totalPrice = useSelector(getTotalPrice);

  const { cart } = useSelector((state) => state.cart);

  return (
    <main>
      <Sheet>
        <SheetTrigger>
          <div className=" relative">
            <LiaShoppingBagSolid size={20} />
            {totalQty > 0 && (
              <span className=" absolute -top-3 -right-2 bg-red-600 text-xs rounded-full px-1.5 text-white py-[1.5px]">
                {totalQty}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className=" overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            {cart.length > 0 ? (
              <section className=" space-y-5 ">
                {cart.map((c) => (
                  <SheetDescription key={c.id}>
                    <CartItem c={c} />
                  </SheetDescription>
                ))}
                <div>
                  <button className="bg-red-600 w-full py-1 font-black text-xs text-white rounded-full">
                    CHECK OUT - {formatCurrency(totalPrice)}
                  </button>
                </div>
              </section>
            ) : (
              <div className="grid place-items-center h-screen font-bold">
                <p >CART IS EMPTY</p>
                <p>🛒</p>
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
};
