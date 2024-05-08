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
import { MdPictureAsPdf } from "react-icons/md";

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

    doc.save(`userInvoice.pdf`);
  };

  return (
    <main className=" text-xs">
      <section>
        {/* table */}

        <table className="w-full">
          <thead className="w-full text-left table-auto">
            <tr>
              <th className="w-32 pb-2">Profile</th>
              <th className="w-32">Name</th>
              <th className="w-52">Email</th>
              <th className="w-32">Total Buy</th>
              <th className="w-32">Status</th>
              <th className="w-32">Join On</th>
              <th className="w-32">Action</th>
            </tr>
          </thead>

          <tbody>
            {displayUsers?.map((u) => (
              <tr
                key={u._id}
                // className=""
              >
                <td className="pt-2">
                  <LazyLoadImage src={u.image} className="h-10" />
                </td>
                <td className=" whitespace-nowrap capitalize">{u.name}</td>
                <td className="">{u.email}</td>

                <td className="">{u.totalBuy || "200"}</td>
                <td className=" uppercase">{u.status || "Active"}</td>
                <td className=" uppercase whitespace-nowrap">
                  {" "}
                  {`${new Date(u.updatedAt).getFullYear()}-${(
                    new Date(u.updatedAt).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${new Date(u.updatedAt)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`}
                </td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />

      <Button onClick={handleDownloadPdf}>
        Download
        <span className="ms-2">
          <MdPictureAsPdf size={25} />
        </span>
      </Button>
    </main>
  );
};
