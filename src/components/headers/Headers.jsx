import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";
import {
  FaRegHeart,
  FaRegUser,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  getTotalQtyItem,
  getTotalPrice,
  getCurrentQtyItem,
} from "@/redux/features/cartSlice";
import { SearchBar } from "../searchBar/SearchBar";
import { Cart } from "../cart/Cart";
import { WishList } from "../wishList/WishList";

export const Headers = () => {
  const [open, setOpen] = useState(false);

  const [searched, setSearched] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  console.log(cart);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSearched = () => {
    setSearched(!searched);
  };

  const handleClosedSearched = () => {
    setSearched(false);
  };

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
      <section
        className={`fixed top-0 left-0 right-0  px-3 w-full flex justify-between gap-5 md:container md:mx-auto h-[60px] items-center bg-white text-black  z-10 transition-opacity ${
          scrolled ? "opacity-100 shadow-md" : "opacity-1"
        }`}
      >
        <section>
          <Link className="font-bold md:text-2xl">SwiftCart</Link>
        </section>

        <section className="hidden lg:flex items-center gap-5 text-xs font-semibold">
          <Link>NEW</Link>
          <Link>RESTOCKED</Link>
          <Link>BODYSUITS</Link>
          <Link>TOPS</Link>
          <Link>LOUNGE</Link>
          <Link>MEN'S</Link>
          <Link>MORE</Link>
        </section>

        <section className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-300 w-24 py-1 px-2 rounded-full hidden md:block outline-none"
            onClick={handleSearched}
          />

          {searched && (
            <SearchBar handleClosedSearched={handleClosedSearched} />
          )}

          <div className=" relative mt-2">
            <WishList />
          </div>

          <Link>
            <FaRegUser size={18} />
          </Link>

          <div className="mt-2">
            <Cart />
          </div>
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

      {/*  mobile device Navbar  */}

      {open && (
        <section className="flex items-start flex-col gap-4 lg:hidden fixed bg-white w-full z-10 h-screen mt-12 pt-10">
          <Link className="px-3">NEW</Link>
          <div className="w-full h-0.5 bg-gray-100" />
          <Link className="px-3">RESTOCKED</Link>
          <div className="w-full h-0.5 bg-gray-100" />
          <Link className="px-3">BODYSUITS</Link>
          <div className="w-full h-0.5 bg-gray-100" />
          <Link className="px-3">TOPS</Link>
          <div className="w-full h-0.5 bg-gray-100" />
          <Link className="px-3">LOUNGE</Link>
          <div className="w-full h-0.5 bg-gray-100" />
          <Link className="px-3">MEN'S</Link>
          <div className="w-full h-0.5 bg-gray-100" />
          <Link className="px-3">MORE</Link>

          <section className=" bg-gray-100 w-full py-5 fixed bottom-0 h-[180px] px-3">
            <div className="flex items-center gap-3">
              <Link>
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
    </main>
  );
};