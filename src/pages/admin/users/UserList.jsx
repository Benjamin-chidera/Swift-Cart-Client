import { userList } from "@/components/data/userList";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import Paginate from "@/components/paginate/Paginate";

export const UserList = () => {
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayUsers = userList?.slice(pageVisited, pageVisited + postPerPage);

  const pageCount = Math.ceil(userList?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <main className=" text-xs">
      <section className="grid grid-cols-8 font-bold place-items-center gap-20">
        <p>Profile</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p className=" whitespace-nowrap">Total Buy</p>
        <p>Status</p>
        <p>Join On</p>
        <p>Action</p>
      </section>

      <section className=" space-y-5 mt-5">
        {displayUsers?.map((u) => (
          <div
            key={u.id}
            className="grid grid-cols-8 text-sm items-center place-items-center gap-20"
          >
            <LazyLoadImage src={u.img} className="h-10" />
            <h1 className=" whitespace-nowrap">{u.name}</h1>
            <h2>{u.email}</h2>
            <h3 className="ms-8 whitespace-nowrap">{u.phone}</h3>
            <h4>{u.totalBuy}</h4>
            <h4 className=" uppercase">{u.status}</h4>
            <h4 className=" uppercase whitespace-nowrap">{u.joinDate}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger className=" outline-none uppercase">
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button>Delete User</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </section>

      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />
    </main>
  );
};
