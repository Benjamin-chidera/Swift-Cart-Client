import React, { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/redux/features/productSlice";

export const ProductActivities = () => {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const products = product?.product;

  const skin = products?.filter((c) => c.category === "skin");
  const clothes = products?.filter((c) => c.category === "clothes");
  const shoes = products?.filter((c) => c.category === "shoes");
  const bodysuits = products?.filter((c) => c.category === "bodysuits");
  const lounge = products?.filter((c) => c.category === "lounge");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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
        <h1 className="font-bold text-sm">Product Activities</h1>

        <section className=" h-[300px] w-full">
          <Doughnut
            data={{
              labels: myChart.map((data) => data.label),
              datasets: [
                {
                  label: "Product Activities",
                  data: myChart.map((data) => data.value),
                  backgroundColor: ["black", "blue", "green", "yellow", "grey"],
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
