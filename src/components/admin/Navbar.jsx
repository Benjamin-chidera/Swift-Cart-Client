import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const location = useLocation();

  const userToken = Cookies.get("userToken");

  let decode = null;

  console.log(decode);

  try {
    // Ensure token exists before attempting to decode
    if (userToken) {
      decode = jwtDecode(userToken);
    }
  } catch (error) {
    // Handle decoding errors (e.g., invalid userToken format)
    console.error("Error decoding userToken:", error);
  }

  const handleLogout = () => {
    Cookies.remove("userToken");
    window.location.href = "/admin/signin";
  };

  return (
    <main className="py-3 relative z-10">
      {location.pathname !== "/admin/signup" &&
        location.pathname !== "/admin/signin" && (
          <section className=" flex items-center justify-end border-b-2 w-full px-10 pb-1 fixed bg-white top-0 h-16 container mx-auto left-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger className=" outline-none uppercase">
                <div className=" overflow-hidden rounded-full">
                  <LazyLoadImage
                    src="https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    className="h-10 w-10 rounded-full hover:scale-[1.3] duration-300"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {userToken && decode && decode.role === "admin" && (
                  <DropdownMenuItem>
                    <Button className=" w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        )}
    </main>
  );
};
