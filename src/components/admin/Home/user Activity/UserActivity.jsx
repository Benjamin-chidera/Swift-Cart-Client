import { getUser } from "@/redux/features/authSlice";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";

export const UserActivity = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { getAllUsers } = useSelector((state) => state.auth);

  const myChart = [
    {
      label: "Registered Users",
      value: getAllUsers?.user?.length,
    },
  ];

  return (
    <main className="my-10">
      <section>
        <h1 className="font-bold text-sm">User Activity</h1>

        <section className=" h-[300px] w-full">
          <Line
            data={{
              labels: myChart.map((data) => data.label),
              datasets: [
                {
                  label: "User Activity",
                  data: myChart.map((data) => data.value),
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
