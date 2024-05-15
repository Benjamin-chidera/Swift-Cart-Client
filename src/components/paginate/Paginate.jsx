import React from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Paginate = ({ pageCount, ChangePage }) => {
  return (
    <div className=" flex gap-8 justify-center">
      <ReactPaginate
        previousLabel={<IoIosArrowBack size={20} />}
        nextLabel={<IoIosArrowForward size={20} />}
        pageCount={pageCount}
        onPageChange={ChangePage}
        containerClassName="flex gap-10 item-center mx-auto mt-7 bg-gray-50 py-1 px-5 rounded-md"
        previousClassName="bg-gray-200 text-black-700 px-3 py-2 rounded-l-md hover:bg-gray-300"
        nextClassName="bg-gray-200 text-black-700 px-3 py-2 rounded-r-md hover:bg-gray-300"
        disabledClassName="text-gray-400 cursor-not-allowed"
        activeClassName="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
      />
    </div>
  );
};

export default Paginate;
