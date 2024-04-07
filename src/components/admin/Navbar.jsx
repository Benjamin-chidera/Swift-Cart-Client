import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <main className="py-3 relative ">
      <section className=" flex items-center justify-end border-b-2 w-full px-10 pb-1 fixed bg-white top-0 h-16 container mx-auto">
        <LazyLoadImage
          src="https://images.pexels.com/photos/20732688/pexels-photo-20732688/free-photo-of-man-in-suit-standing-in-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          className="h-10 w-10 rounded-full"
        />
      </section>

     
    </main>
  );
};
