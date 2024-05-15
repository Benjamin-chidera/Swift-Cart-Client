import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";

export const SalesReport = () => {
  const { orders } = useSelector((state) => state.orders);

  const check = orders?.order?.flatMap((c) => c.cart);

  const skin = check?.filter((c) => c?.category === "skin");
  const clothes = check?.filter((c) => c?.category === "clothes");
  const shoes = check?.filter((c) => c?.category === "shoes");
  const bodysuits = check?.filter((c) => c?.category === "bodysuits");
  const lounge = check?.filter((c) => c?.category === "lounge");

  const myChart = [
    {
      label: "skin",
      value: skin?.length,
    },
    {
      label: "clothes",
      value: clothes?.length,
    },
    {
      label: "shoes",
      value: shoes?.length,
    },
    {
      label: "bodysuits",
      value: bodysuits?.length,
    },
    {
      label: "lounge",
      value: lounge?.length,
    },
  ];

  return (
    <main className="my-10">
      <section>
        <h1 className="font-bold text-sm">Sales Report</h1>

        <section className=" h-[300px] w-full">
          <Line
            data={{
              labels: myChart?.map((data) => data?.label),
              datasets: [
                {
                  label: "Sold Items",
                  data: myChart?.map((data) => data?.value),
                  backgroundColor: ["rgb(255, 99, 132)"],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </section>
      </section>
    </main>
  );
};
