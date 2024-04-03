import React from "react";
import { Headers } from "../../headers/Headers";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/footer/Footer";
export const User = () => {
  return (
    <div className="">
      <Headers />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};
