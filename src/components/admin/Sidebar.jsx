import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <main className="bg-gray-100 h-screen w-[200px] fixed top-0 left-0 mr-40 px-3">
      <section className="pt-5">
        <Link className="font-bold text-3xl">SwiftCart</Link>
      </section>

      <section className="mt-7 flex  flex-col gap-7 uppercase text-sm font-semibold text-gray-600">
        <Link>Dashboard</Link>
        <Link>Users</Link>
        <Link>Categories</Link>
        <Link>products</Link>
        <Link>orders</Link>
        <Link>reviews</Link>
      </section>
    </main>
  );
};
