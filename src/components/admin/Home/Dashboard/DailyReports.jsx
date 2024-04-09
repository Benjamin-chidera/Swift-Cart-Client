import { formatCurrency } from "@/lib/FormatCurrency";
import React from "react";
import { FaUserPlus, FaUserClock, FaBox } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";

export const DailyReports = () => {
  return (
    <main className=" flex items-center justify-between">
      <section className="flex items-center gap-3 shadow py-1 px-3 rounded">
        <div>
          <h2 className="font-semibold text-2xl">1,503</h2>
          <p className="text-xs">Daily Signups</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-aut rounded-xl  flex justify-center items-center">
          <FaUserPlus color="white" size={50} />
        </div>
      </section>

      <section className="flex items-center gap-3 shadow py-1 px-3 rounded">
        <div>
          <h2 className="font-semibold text-2xl">79,503</h2>
          <p className="text-xs">Daily Visitors</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-aut rounded-xl  flex justify-center items-center">
          <FaUserClock color="white" size={50} />
        </div>
      </section>

      <section className="flex items-center gap-3 shadow py-1 px-3 rounded">
        <div>
          <h2 className="font-semibold text-2xl">15,503</h2>
          <p className="text-xs">Daily Order</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-aut rounded-xl  flex justify-center items-center">
          <FaBox color="white" size={50} />
        </div>
      </section>

      <section className="flex items-center gap-3 shadow py-1 px-3 rounded">
        <div>
          <h2 className="font-semibold text-2xl">{formatCurrency(98503)}</h2>
          <p className="text-xs">Daily Revenue</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-aut rounded-xl  flex justify-center items-center">
          <TbCurrencyNaira color="white" size={50} />
        </div>
      </section>
    </main>
  );
};
