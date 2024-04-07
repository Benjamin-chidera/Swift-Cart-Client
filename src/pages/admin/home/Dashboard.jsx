import { DailyReports } from "@/components/admin/Dashboard/DailyReports";
import { NewCustomer } from "@/components/admin/New customers/NewCustomer";
import { RecentOrders } from "@/components/admin/recent Orders/RecentOrders";
import { SalesReport } from "@/components/admin/Sales Report/SalesReport";
import { SoldItems } from "@/components/admin/soldItems/SoldItems";
import { TopProducts } from "@/components/admin/Top products/TopProducts";
import { UserActivity } from "@/components/admin/user Activity/UserActivity";
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
