import React from "react";

export const OurFav = () => {
  return (
    <main className="mt-3  mx-3 md:container md:mx-auto">
      <section className=" flex items-center justify-between flex-wrap">
        <h4 className="font-bold text-sm whitespace-nowrap md:text-lg text-red-800">
          OUR FAVORITES
        </h4>

        <div className="flex items-center gap-3 border rounded-full px-1 py-1 text-sm font-bold">
          <button className="bg-red-800 px-3 py-0.5 rounded-full text-white">
            WOMEN'S
          </button>
          <button className="bg-white px-3 py-0.5 rounded-full text-black">
            MEN'S
          </button>
        </div>
      </section>
    </main>
  );
};
