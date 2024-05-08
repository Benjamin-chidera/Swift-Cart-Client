import { formatCurrency } from "@/lib/FormatCurrency";
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
import { orderhistory } from "@/components/data/orderHistorys";
import Paginate from "@/components/paginate/Paginate";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdPictureAsPdf } from "react-icons/md";

const OrderHistory = () => {
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayOrderHistory = orderhistory?.slice(
    pageVisited,
    pageVisited + postPerPage
  );

  const pageCount = Math.ceil(orderhistory?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const title = "All Orders";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;

    doc.text(title, center, padding);

    // add table header
    const tableHeader = [
      "Number",
      "Customer Name",
      "Product Name",
      "Email",
      "Items",
      "Price",
      "Payment",
      "Status",
      "Date Created",
    ];

    // add table data
    const tableData = orderhistory.map((datas, i) => [
      i + 1,
      datas.customerName,
      datas.name,
      datas.customerEmail,
      datas.items,
      datas.price,
      datas.payment || "Paid",
      datas.status || "Delivered",
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
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 },
      },
    });

    doc.save(`orders-Invoice.pdf`);
  };

  return (
    <main>
      <div>
        <h1 className="font-bold text-xl mb-5 underline">New Orders</h1>
      </div>

      <table className="w-full">
        <thead className="w-full text-left table-auto">
          <tr>
            <th className="w-32">Customer</th>
            <th className="w-32">Email</th>
            <th className="w-32">Items</th>
            <th className="w-32">Price</th>
            <th className="w-32">Payment</th>
            <th className="w-32">Status</th>
            <th className="w-32">Date</th>
            <th className="w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {displayOrderHistory.map((o) => (
            <tr key={o.id} className="">
              <td className="py-2">{o.customerName}</td>
              <td className="py-2 w-48">{o.customerEmail}</td>

              <td>{o.items}</td>
              <td className="w-40">{formatCurrency(o.price)}</td>
              <td className="font-bold">Paid</td>
              <td className="w-32">
                <div></div>
                <p
                  className={`capitalize text-xs w-20 text-center ${
                    o.status === "In Progress" ? "bg-blue-500" : "bg-green-600"
                  } py-0.5 px-2 rounded-full text-white`}
                >
                  {o.status}
                </p>
              </td>
              <td>{o.Date}</td>

              <td className="w-32">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" outline-none uppercase">
                    <BsThreeDotsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Button>Delete Order</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />

      <div>
        <Button onClick={handleDownloadPdf}>
          Download
          <span className="ms-2">
            <MdPictureAsPdf size={25} />
          </span>
        </Button>
      </div>
    </main>
  );
};

export default OrderHistory;
