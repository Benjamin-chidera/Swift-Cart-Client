import {
  featchCategories,
  setMinPrice,
  setMaxPrice,
} from "@/redux/features/categorySlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export const Filter = ({ min, max, setMax, setMin, handleFilter }) => {
  const dispatch = useDispatch();

  const handleMinPriceChange = (e) => {
    dispatch(setMinPrice(parseFloat(e.target.value)));
  };

  const handleMaxPriceChange = (e) => {
    dispatch(setMaxPrice(parseFloat(e.target.value)));
  };

  return (
    <main className="flex flex-col gap-5">
      <section className="flex items-center gap-2">
        <div>
          {" "}
          <Input
            type="number"
            placeholder="Min"
            className={"border w-[100px]"}
            value={min}
            onChange={handleMinPriceChange}
          />
        </div>
        <div>
          {" "}
          <Input
            type="number"
            placeholder="Max"
            className={"border w-[100px]"}
            value={max}
            onChange={handleMaxPriceChange}
          />
        </div>
      </section>
      {/* <Button className={"w-full mt-2"} onClick={handleFilter}>
        Filter
      </Button> */}

      <p>colors</p>
      <p>size</p>
    </main>
  );
};
