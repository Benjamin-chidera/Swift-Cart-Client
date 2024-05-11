import { formatCurrency } from "@/lib/FormatCurrency";
import { useSelector } from "react-redux";

export const TopProducts = () => {
  const { product } = useSelector((state) => state.product);

  const products = product?.product?.slice(0, 3) || null;

  return (
    <main className="shadow rounded p-3">
      <section className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold ">Top Products</h2>
      </section>

      <section className=" space-y-5">
        {products?.map((p) => (
          <div key={p._id} className="grid grid-cols-3 gap-10">
            <img src={p.image} alt="" className="w-20 h-20" />

            <div>
              <h2 className="font-semibold text-sm">
                {p.name.substring(0, 20)}
              </h2>
              <p className="text-xs max-w-[230px]">
                {p.details.substring(0, 20)}
              </p>
              <p className=" text-xs">{formatCurrency(p.price)}</p>
            </div>
            <p className=" text-xs">{p.quantity} Sales</p>
          </div>
        ))}
      </section>
    </main>
  );
};
