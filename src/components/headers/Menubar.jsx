import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Menubar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  const handleMouseEnter = () => {
    setMenu(true);
  };

  const handleMouseLeave = () => {
    setMenu(false);
  };

  return (
    <main>
      <section className="flex justify-between items-center gap-10 relative">
        <div className={`group`}>
          <Link>SKIN</Link>
          <div className="h-8 absolute top-3  w-8"></div>
          <section
            className={`left-0  duration-150 group-hover:block  mx-auto mt-1 hidden rounded-md fixed bg-white shadow-md p-5 w-full  h-[200px] `}
          >
            <div className="flex justify-center items-center">Skin Content</div>
          </section>
        </div>
        <div className="group">
          <Link>CLOTHES</Link>
          <div className="h-8 absolute top-3  w-8"></div>
          <section
            className={`left-0  duration-150 group-hover:block  mx-auto mt-1 hidden rounded-md fixed bg-white shadow-md p-5 w-full  h-[200px] `}
          >
            <div className="flex justify-center items-center">
              Clothes Content
            </div>
          </section>
        </div>
        <div className="group">
          <Link>SHOES</Link>
          <div className="h-8 absolute top-3  w-8"></div>
          <section
            className={`left-0  duration-150 group-hover:block  mx-auto mt-1 hidden rounded-md fixed bg-white shadow-md p-5 w-full  h-[200px] `}
          >
            <div className="flex justify-center items-center">Shoe Content</div>
          </section>
        </div>
        <div className="group">
          <Link>BODYSUITS</Link>
          <div className="h-8 absolute top-3  w-8"></div>
          <section
            className={`left-0  duration-150 group-hover:block  mx-auto mt-1 hidden rounded-md fixed bg-white shadow-md p-5 w-full  h-[200px] `}
          >
            <div className="flex justify-center items-center">
              Bodysuit Content
            </div>
          </section>
        </div>
        <div className="group">
          <Link>LOUNGE</Link>
          <div className="h-8 absolute top-3  w-8"></div>
          <section
            className={`left-0  duration-150 group-hover:block  mx-auto mt-1 hidden rounded-md fixed bg-white shadow-md p-5 w-full  h-[200px] `}
          >
            <div className="flex justify-center items-center">
              Lounge Content
            </div>
          </section>
        </div>
      </section>
      {/* <div
        className="h-8 absolute left-0 w-full"
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseLeave}
      ></div> */}
    </main>
  );
};
