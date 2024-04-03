import React from "react";

export const SearchBar = ({ handleClosedSearched }) => {
  return (
    <main className=" fixed top-0 h-full z-10 bg-white w-full left-0 right-0 overflow-y-hidden">
      <section className="container mx-auto">
        <div className="text-end my-5">
          <button onClick={handleClosedSearched}>❌</button>
        </div>
        <div className="flex justify-center items-center ">
          <form action="">
            <input
              type="text"
              className=" border-b-2 outline-none p-2 w-[300px] md:w-[500px] lg:w-[800px] placeholder:xl md:placeholder:text-4xl text-gray-500 text-3xl max-w-full"
              placeholder="Search..."
            />
          </form>
        </div>
      </section>
    </main>
  );
};
