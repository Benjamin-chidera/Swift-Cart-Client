import { SkeletonLoadingNewUsers } from "@/components/Loader-Skeleton/SkeletonLoadingAdmin";
import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { FaRotate } from "react-icons/fa6";
import { useSelector } from "react-redux";

export const NewCustomer = () => {
  const { user, status } = useSelector((state) => state.auth);

  const customers = user?.user?.slice(0, 3) || null;

  return (
    <main className=" shadow p-3 rounded">
      <section className="flex items-center justify-between">
        <h2 className="text-sm font-bold mb-3">New Customers</h2>
      </section>

      <section className=" space-y-5">
        {status === "loading" ? (
          <SkeletonLoadingNewUsers num={customers.length} />
        ) : (
          customers?.map((c) => (
            <div
              key={c._id}
              className="  text-sm grid grid-cols-4 place-items-start"
            >
              <img src={c.image} alt="" className="w-10 h-10" />
              <div className="">
                <h3>{c.name}</h3>
                <p className=" text-xs">{c.email}</p>
              </div>

              <p className="ms-5">{c.orders || "100"} orders</p>
              <p>{formatCurrency(c.totalSale || "2000")}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
};
