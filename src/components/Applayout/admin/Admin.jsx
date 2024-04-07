import { Footer } from "@/components/admin/Footer";
import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <main className=" xl:container xl:mx-auto px-5">
      <div>
        <Navbar />
        <Sidebar />
      </div>
      <div className="ms-48 pt-14">
        <Outlet />
      </div>

      <div className="ms-48">
        <Footer />
      </div>
    </main>
  );
};
