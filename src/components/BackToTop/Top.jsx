import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";


export const Top = () => {
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

  const ToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={ToTop}
      className={`fixed right-1 bottom-2 md:right-2 z-10 bg-white py-2 px-2 rounded-full shadow-slate-400 shadow ${
        scrolled ? " opacity-[1] duration-500" : " opacity-0 duration-300"
      } hover:scale-[1.1]`}
    >
      <FaArrowUp/>
    </button>
  );
};
