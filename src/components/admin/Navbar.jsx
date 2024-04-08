import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <main className="py-3 relative ">
      <section className=" flex items-center justify-end border-b-2 w-full px-10 pb-1 fixed bg-white top-0 h-16 container mx-auto">
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
            <DropdownMenuItem>
              <Button className=" w-full">Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </main>
  );
};
