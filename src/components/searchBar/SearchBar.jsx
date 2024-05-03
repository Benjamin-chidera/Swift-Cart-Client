import React, { useState } from "react";
import { SearchedItem } from "./SearchedItem";
import axios from "axios";

export const SearchBar = ({ handleClosedSearched }) => {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const searchName = e.target.value;
    setName(searchName);

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/products/q/productName?name=${searchName}`
      );
      setSaved(data.search);
      setError("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setSaved([]);
        setError(error.response.data.msg);
      }
    }
  };

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
      <section className="grid grid-cols-4 place-items-center mt-5  w-[300px] md:w-[500px] lg:w-[800px] mx-auto gap-5">
        {name && saved.map((s) => <SearchedItem {...s} key={s._id} />)}
      </section>
    </main>
  );
};
