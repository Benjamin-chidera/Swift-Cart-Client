import React from "react";
import { Headers } from "../../headers/Headers";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/footer/Footer";
export const User = () => {
  const location = useLocation();
  return (
    <div className="">
      {location.pathname === "/checkout" ? null : <Headers />}
      <div className={location.pathname === "/checkout" ? "pt-5" : "pt-16"}>
        <Outlet />
      </div>
      {location.pathname === "/checkout" ? null : <Footer />}
    </div>
  );
};
