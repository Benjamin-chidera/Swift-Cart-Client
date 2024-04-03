import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Menubar = () => {
    const location = useLocation()
  const [menu, setMenu] = useState(false);

  const handleMouseEnter = () => {
    setMenu(true);
  };

  const handleMouseLeave = () => {
    setMenu(false);
  };

  return (
    <main>
      <section
        className="flex justify-between items-center gap-10 relative"
        onMouseEnter={handleMouseEnter}
         onMouseOut={handleMouseLeave}
      >
        <section className="hover:text-gray-500 cursor-pointer">
          <Link>SKIN</Link>
        </section>
        <section>
          <Link>CLOTHES</Link>
        </section>
        <section>
          <Link>SHOES</Link>
        </section>
        <section>
          <Link>BODYSUITS</Link>
        </section>
        <section>
          <Link>LOUNGE</Link>
        </section>
      </section>

      {menu && (
        <section
          className={`left-0 right-0 mx-auto mt-4 rounded-md absolute bg-white shadow-md p-5 w-full h-[200px] ${
            menu ? " opacity-100 duration-700" : "opacity-0"
          }`}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-center items-center">Menu Content</div>
        </section>
      )}
    </main>
  );
};
