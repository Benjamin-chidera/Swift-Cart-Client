import { DailyReports } from "@/components/admin/Home/Dashboard/DailyReports";
import { NewCustomer } from "@/components/admin/Home/New customers/NewCustomer";
import { RecentOrders } from "@/components/admin/Home/recent Orders/RecentOrders";
import { SalesReport } from "@/components/admin/Home/Sales Report/SalesReport";
import { SoldItems } from "@/components/admin/Home/soldItems/SoldItems";
import { TopProducts } from "@/components/admin/Home/Top products/TopProducts";
import { UserActivity } from "@/components/admin/Home/user Activity/UserActivity";
import React from "react";

export const Dashboard = () => {
  return (
    <main>
      <DailyReports />
      <SalesReport />
      <UserActivity />
      <SoldItems />
      <RecentOrders />

      <section className="my-10 w-full flex  justify-between">
        <div className="w-[48%]">
          <NewCustomer />
        </div>
        <div className="w-[48%]">
          <TopProducts />
        </div>
      </section>
    </main>
  );
};
