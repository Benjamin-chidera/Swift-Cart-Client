import { SkeletonLoadingSoldItem } from "@/components/Loader-Skeleton/SkeletonLoadingAdmin";
import { formatCurrency } from "@/lib/FormatCurrency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const SoldItems = () => {
  const [loading, setLoading] = useState(true);
  const { orders } = useSelector((state) => state?.orders);
  const soldItem = orders?.order?.slice(0, 4);

  useEffect(() => {
    const load = setInterval(() => {
      setLoading(false);
    }, 3000);

    return () => clearInterval(load);
  }, []);

  return (
    <main className="my-10 w-[50%] shadow p-3 rounded-md">
      <section className="flex items-center justify-between">
        <h2 className="text-sm font-bold mb-3">Sold by Items</h2>
      </section>
      <div className="grid grid-cols-3">
        <p>Item</p>
        <p>Num Of Item</p>
        <p>Price</p>
      </div>

      <section className="mt-2 text-sm">
        {loading ? (
          <SkeletonLoadingSoldItem num={3} />
        ) : (
          soldItem?.map((s) => (
            <section key={s?._id}>
              {s?.cart?.map((c) => (
                <section key={c?._id} className="grid grid-cols-3 space-y-2">
                  <h4>{c?.name}</h4>
                  <p className="ms-5">{c?.quantity}</p>
                  <p>{formatCurrency(c?.price)}</p>
                </section>
              ))}
            </section>
          ))
        )}
      </section>
    </main>
  );
};
