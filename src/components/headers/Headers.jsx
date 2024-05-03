import React, { useEffect, useState } from "react";

import { Link, useLocation, useParams } from "react-router-dom";
import {
  FaRegUser,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaBox,
} from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { SearchBar } from "../searchBar/SearchBar";
import { Cart } from "../cart/Cart";
import { WishList } from "../wishList/WishList";
// import { Menubar } from "../headers/Menubar";
import { SearchedItem } from "../searchBar/SearchedItem";
import axios from "axios";
import "./header.css";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { SkeletonLoadingSearchBar } from "../Loader-Skeleton/SkeletonLoadingSearchBar";

export const Headers = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { token } = useParams();

  // for search functionality

  const [name, setName] = useState("");
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [close, setClose] = useState(true);

  const handleClose = () => {
    setClose(!close);
    setName("");
    document.body.classList.remove("no-scroll"); 
  };

  const handleSearch = async (e) => {
    const searchName = e.target.value;
    setName(searchName);

    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://swift-cart-server.onrender.com/api/v1/products/q/productName?name=${searchName}`
      );
      setSaved(data.search);
      setLoading(false);
      setError("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setLoading(false);
        setSaved([]);
        setError(error.response.data.msg);
      }
    }
  };

  // for search functionality

  const handleOpen = () => {
    setOpen(!open);
     if (open) {
       document.body.classList.remove("no-scroll"); // Enable scrolling when closing the mobile navbar
     } else {
       document.body.classList.add("no-scroll"); // Disable scrolling when opening the mobile navbar
     }
  };

    useEffect(() => {
      return () => {
        document.body.classList.remove("no-scroll"); // Clean up: Enable scrolling when the component unmounts
      };
    }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <main>
      {location.pathname !== "/signup" &&
        location.pathname !== "/signin" &&
        location.pathname !== "/forgotten-password" &&
        location.pathname !== `/reset-password/${token}` && (
          <section>
            <div>
              <section
                className={`fixed top-0 left-0 right-0  px-3  flex justify-between items-center gap-5 md:container md:mx-auto h-[60px] bg-white text-black  z-10 transition-opacity ${
                  scrolled ? "opacity-100 shadow-md" : "opacity-1"
                }`}
              >
                {/* <section className=" "> */}
                <div>
                  <Link className="font-bold md:text-2xl">SwiftCart</Link>{" "}
                </div>
                <section className="flex items-center gap-5 ms-5">
                  <form action="" onSubmit={(e) => e.preventDefault()}>
                    <section>
                      <input
                        type="text"
                        placeholder="Search"
                        className="border-2 md:w-[300px] lg:w-[600px] xl:w-[980px] h-10 py-1 px-2  hidden md:block outline-none rounded"
                        // onClick={handleSearched}
                        value={name}
                        onChange={handleSearch}
                      />
                    </section>
                  </form>
                  {/* // for search functionality */}
                  {name && (
                    <div className="bg-gray-50 p-5 fixed z-10 top-14 md:w-[300px] lg:w-[600px] xl:w-[980px] border border-red-400">
                      {error && (
                        <div className="text-red-500 text-center mt-5 font-bold text-2xl">
                          {error}
                        </div>
                      )}
                      <section className="grid grid-cols-4 place-items-center mt-5 gap-5">
                        {/* {loading && <SkeletonLoadingSearchBar/>} */}
                        {name && loading ? (
                          <SkeletonLoadingSearchBar num={saved.length} />
                        ) : (
                          saved.map((s) => (
                            <SearchedItem
                              {...s}
                              key={s._id}
                              handleClose={handleClose}
                              close={close}
                            />
                          ))
                        )}
                      </section>
                    </div>
                  )}
                  {/* // for search functionality */}
                  <div className=" relative mt-2">
                    <WishList />
                  </div>
                  <section className=" hidden md:block">
                    {/* user - Authenticate */}

                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger>
                          {" "}
                          <FaRegUser size={18} />{" "}
                          <span className=" text-xs whitespace-nowrap ms-1">
                            Hi, Benjamin
                          </span>
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            <Link to={"/signup"} className="flex items-center">
                              <FaRegUser size={18} />
                              <span className=" text-xs whitespace-nowrap ms-1">
                                My Account
                              </span>
                            </Link>
                          </MenubarItem>{" "}
                          <MenubarSeparator />
                          <MenubarItem>
                            <FaBox size={18} />
                            <Link className="ms-2">My Orders</Link>
                          </MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>
                            <Button className={"text-xs w-full"}>LOGOUT</Button>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </section>
                  <div className="mt-2">
                    <Cart />
                  </div>
                  {/* </section> */}
                </section>

                <section className="hidden lg:flex items-center gap-5 text-xs font-semibold">
                  {/* <Menubar /> */}
                </section>

                <section className="mt-1 lg:hidden">
                  {/* mobile device menu */}
                  {!open ? (
                    <button onClick={handleOpen}>
                      <RiMenu3Fill size={23} />
                    </button>
                  ) : (
                    <button onClick={handleOpen}>
                      <IoClose size={23} />
                    </button>
                  )}
                </section>
              </section>
            </div>

            {/*  mobile device Navbar  */}

            {open && (
              <section className="flex items-start flex-col gap-4 lg:hidden fixed bg-white w-full z-10 h-screen mt-12 pt-10">
                {/* <div className="px-2"> */}
                <div className="mb-2 w-full px-2">
                  <form action="" onSubmit={(e) => e.preventDefault()}>
                    <section>
                      <input
                        type="text"
                        placeholder="Search"
                        className="border-2 w-full h-10 py-1 px-2  md:hidden outline-none rounded"
                        // onClick={handleSearched}
                        value={name}
                        onChange={handleSearch}
                      />
                    </section>
                  </form>

                  {/* // for search functionality */}
                  {name && (
                    <div className="bg-gray-50 p-2 fixed z-10 top-34 w-full border border-red-400">
                      {error && (
                        <div className="text-red-500 text-center mt-5 font-bold text-2xl">
                          {error}
                        </div>
                      )}
                      <section className="grid grid-cols-2 place-items-center mt-3 gap-2 pe-2">
                        {/* {loading && <SkeletonLoadingSearchBar/>} */}
                        {name && loading ? (
                          // <SkeletonLoadingSearchBar num={saved.length} />
                          <p>Loading</p>
                        ) : (
                          saved.map((s) => (
                            <SearchedItem
                              {...s}
                              key={s._id}
                              handleClose={handleClose}
                              close={close}
                            />
                          ))
                        )}
                      </section>
                    </div>
                  )}
                  {/* // for search functionality */}
                </div>

                <div className="px-2 w-full">
                  <Button className={"text-xs w-full"}>LOGOUT</Button>
                </div>
                {/* </div> */}

                <section className=" bg-gray-100 w-full py-5 fixed bottom-0 h-[180px] px-3">
                  <div className="flex items-center gap-3">
                    <Link to={"/signup"}>
                      <FaRegUser size={25} />
                    </Link>
                    <h1>Account</h1>
                  </div>
                  <p className="text-lg mt-2">Return and Exchanges</p>

                  <div className="flex items-center gap-8 justify-center h-[60px]">
                    <a href="#">
                      <FaFacebookF size={25} />
                    </a>
                    <a href="#">
                      <FaInstagram size={25} />
                    </a>
                    <a href="#">
                      <FaPinterestP size={25} />
                    </a>
                    <a href="#">
                      <FaTiktok size={25} />
                    </a>
                    <a href="#">
                      <FaTwitter size={25} />
                    </a>
                    <a href="#">
                      <FaYoutube size={25} />
                    </a>
                  </div>
                </section>
              </section>
            )}
          </section>
        )}
    </main>
  );
};
