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
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const UserList = () => {
  const { user } = useSelector((state) => state.auth);

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayUsers = user.user?.slice(pageVisited, pageVisited + postPerPage);

  const pageCount = Math?.ceil(user.user?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const title = "All Users";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;

    doc.text(title, center, padding);

    // add table header
    const tableHeader = [
      "Number",
      "Profile",
      "Name",
      "Email",
      "Total Buy",
      "Status",
      "Role",
      "Date Joined",
    ];

    // add table data
    const tableData = user?.user.map((datas, i) => [
      i + 1,
      datas.image,
      datas.name,
      datas.email,
      datas.purchased || 0,
      datas.status || "Active",
      datas.role,
      new Date(datas.createdAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [tableHeader],
      body: tableData,

      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 20 }, // Adjust cell widths based on content width
        2: { cellWidth: 20 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 20 },
        6: { cellWidth: 30 },
        7: { cellWidth: 20 },
      },
    });

    doc.save(`invoice.pdf`);
  };

  return (
    <main className=" text-xs">
      <section className="grid grid-cols-8 font-bold gap-20">
        <p>Profile</p>
        <p>Name</p>
        <p>Email</p>

        <p className=" whitespace-nowrap">Total Buy</p>
        <p>Status</p>
        <p>Join On</p>
        <p>Action</p>
      </section>

      <section className=" space-y-5 mt-5">
        {displayUsers?.map((u) => (
          <div
            key={u._id}
            className="grid grid-cols-8 text-sm items-center gap-20"
          >
            <LazyLoadImage src={u.image} className="h-10" />
            <h1 className=" whitespace-nowrap capitalize">{u.name}</h1>
            <h2 className="">{u.email}</h2>

            <h4 className="">{u.totalBuy || "200"}</h4>
            <h4 className=" uppercase">{u.status || "Active"}</h4>
            <h4 className=" uppercase whitespace-nowrap">
              {" "}
              {`${new Date(u.updatedAt).getFullYear()}-${(
                new Date(u.updatedAt).getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${new Date(u.updatedAt)
                .getDate()
                .toString()
                .padStart(2, "0")}`}
            </h4>
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

      <Button onClick={handleDownloadPdf}>Download PDF</Button>
    </main>
  );
};
