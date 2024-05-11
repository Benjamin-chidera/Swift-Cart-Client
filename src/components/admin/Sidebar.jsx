import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Sidebar = () => {
  const location = useLocation();
  return (
    <main>
      {location.pathname !== "/admin/signup" &&
        location.pathname !== "/admin/signin" && (
          <section className="bg-gray-100 h-screen w-[200px] fixed top-0 left-0 mr-40 px-3 z-10">
            <section className="pt-5">
              <Link className="font-bold text-3xl">SwiftCart</Link>
            </section>

            <section className="mt-7 flex  flex-col gap-7 uppercase text-sm font-semibold text-gray-600">
              <Link to={"/admin"}>Dashboard</Link>
              <div>
                {/* user */}
                <DropdownMenu>
                  <DropdownMenuTrigger className=" outline-none uppercase">
                    User
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to={"/admin/userList"}>User List</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                {/* Products */}
                <DropdownMenu>
                  <DropdownMenuTrigger className=" outline-none uppercase">
                    Products
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to={"/admin/add-products"}>Add Product</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"/admin/product-list"}>Products List</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                {/* Orders */}
                <DropdownMenu>
                  <DropdownMenuTrigger className=" outline-none uppercase">
                    Orders
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to={"/admin/new-order"}>New Order</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link to={"/admin/reviews"}>reviews</Link>
            </section>
          </section>
        )}
    </main>
  );
};
