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
      "Name",
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

    doc.save(`invoice.pdf`);
  };

  return (
    <main>
      <div>
        <h1 className="font-bold text-sm">New Orders</h1>
      </div>

      <section className="my-5 grid grid-cols-9 place-items-center text-sm">
        <p>Customer</p>
        <p>Email</p>
        <p>Items</p>
        <p>Price</p>
        <p>Payment</p>
        <p>Status</p>
        <p>Date</p>
        <p>Action</p>
      </section>

      <section className="my-5">
        {displayOrderHistory.map((o) => (
          <div
            key={o.id}
            className="my-5 grid grid-cols-9 place-items-center text-sm"
          >
            <h2>{o.customerName}</h2>
            <h3>{o.customerEmail}</h3>

            <h4>{o.items}</h4>
            <h5>{formatCurrency(o.price)}</h5>
            <h6 className="font-bold">Paid</h6>
            <p
              className={`capitalize text-xs ${
                o.status === "In Progress" ? "bg-blue-500" : "bg-green-600"
              } py-0.5 px-2 rounded-full text-white`}
            >
              {o.status}
            </p>
            <p>{o.Date}</p>

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
          </div>
        ))}
      </section>

      {/* pagination */}
      <Paginate pageCount={pageCount} ChangePage={ChangePage} />

      <div>
        <Button onClick={handleDownloadPdf}>Download PDF</Button>
      </div>
    </main>
  );
};

export default OrderHistory;
