import React, { useState, useEffect } from "react";
import { SearchedItem } from "./SearchedItem";
import axios from "axios";

export const SearchBar = ({ handleClosedSearched }) => {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Number of items to load per request
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async (e) => {
    const searchName = e.target.value;
    setName(searchName);

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/products/q/productName?name=${searchName}&page=${currentPage}`
      ); // Add page parameter to the API request
      setSaved(data.search);
      setError("");
      setHasMore(data.search.hasMore); // Check for "hasMore" in the response
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setSaved([]);
        setError(error.response.data.msg);
      }
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore) return; // Prevent unnecessary requests if no more data

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/products/q/productName?name=${name}&page=${nextPage}`
      );
      setSaved((prevSaved) => [...prevSaved, ...data.search]); // Append new data
      setHasMore(data.search.hasMore); // Update "hasMore" based on new response
    } catch (error) {
      console.error("Error loading more:", error);
      // Handle loading errors gracefully (e.g., display an error message)
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <main className="fixed top-14 h-full z-10 bg-white w-full left-0 right-0 overflow-y-hidden">
      <section className="container mx-auto">
        <div className="text-end my-5">
          <button onClick={handleClosedSearched}>❌</button>
        </div>
        <div className="flex justify-center items-center">
          <form action="">
            <input
              type="text"
              className="border-b-2 outline-none p-2 w-[300px] md:w-[500px] lg:w-[800px] placeholder:xl md:placeholder:text-4xl text-gray-500 text-3xl max-w-full"
              placeholder="Search..."
              value={name}
              onChange={handleSearch}
            />
          </form>
        </div>
      </section>

      {error && (
        <div className="text-red-500 text-center mt-5 font-bold text-2xl">
          {error}
        </div>
      )}
      <section className="grid grid-cols-4 place-items-center mt-5  w-[300px] md:w-[500px] lg:w-[800px] mx-auto gap-5">
        {name && saved.map((s) => <SearchedItem {...s} key={s._id} />)}
      </section>

      {hasMore && (
        <button
          className="text-center mt-5 font-bold text-xl bg-blue-500 text-black p-2 rounded hover:bg-blue-700"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </main>
  );
};
