import { formatCurrency } from "@/lib/FormatCurrency";
import { payMent } from "@/redux/features/payStackSlice";
import React, { useEffect } from "react";
import { FaUserPlus, FaUserClock, FaBox } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export const DailyReports = () => {
  const dispatch = useDispatch();
  const { payStack } = useSelector((state) => state.payStack);
  const { product } = useSelector((state) => state.product);
  const { getAllUsers } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  // const pay = payStack?.data;
  // const pay = payStack?.data.filter((s) => s.status === "success");

  // console.log(pay);

  const checkAmount = Math.round(payStack?.meta?.total_volume);

  console.log(product);

  const TotalOrders = orders.order?.length;

  useEffect(() => {
    dispatch(payMent());
  }, [dispatch]);

  return (
    <main className=" flex items-center justify-between gap-5">
      <section className="flex items-center gap-3 shadow py-1 px-3 rounded w-full relative">
        <div>
          <h2 className="font-semibold text-2xl">{getAllUsers?.user?.length}</h2>
          <p className="text-xs">Total Registered Users</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-auto rounded-xl  flex justify-center items-center">
          <FaUserPlus color="white" size={50}/>
        </div>
      </section>

      <section className="flex items-center gap-3 shadow py-1 px-3 rounded w-full relative">
        <div>
          <h2 className="font-semibold text-2xl">{product?.numOfProduct}</h2>
          <p className="text-xs">Total Products</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-auto rounded-xl  flex justify-center items-center">
          <FaUserClock color="white" size={50}/>
        </div>
      </section>

      <section className="flex items-center gap-3 shadow py-1 px-3 rounded w-full relative">
        <div>
          <h2 className="font-semibold text-2xl">{TotalOrders}</h2>
          <p className="text-xs">Total Order</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-auto rounded-xl  flex justify-center items-center">
          <FaBox color="white" size={50}/>
        </div>
      </section>

      <section className="flex items-center gap-3 shadow py-1 px-3 rounded w-full relative">
        <div>
          <h2 className="font-semibold text-2xl">
            {formatCurrency(checkAmount)}
          </h2>
          <p className="text-xs">Daily Revenue</p>
        </div>
        <div className="bg-blue-300 py-2 w-[80px] h-[80px] mx-auto rounded-xl  flex justify-center items-center">
          <TbCurrencyNaira color="white" size={50}/>
        </div>
      </section>
    </main>
  );
};
