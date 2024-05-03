import React from "react";
import { Link } from "react-router-dom";

const getDate = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const getYear = new Date().getFullYear();

const dates = `${getDate}-${currentMonth}-${getYear}`;

const com = [
  {
    id: crypto.randomUUID(),
    stars: "⭐⭐⭐⭐⭐",
    title: "It's OK",
    description:
      "Well, it's a phone and it can make phone calls. Yeah, it's Android OS and it can connect to the Internet and run all of those Androidee apps. So, it's cool, OK.",
    date: dates,
    name: "Benjamin chidera benjmain",
  },
  {
    id: crypto.randomUUID(),
    stars: "⭐⭐⭐⭐⭐",
    title: "It's OK",
    description:
      "Well, it's a phone and it can make phone calls. Yeah, it's Android OS and it can connect to the Internet and run all of those Androidee apps. So, it's cool, OK.",
    date: dates,
    name: "Benjamin chidera benjmain",
  },
  {
    id: crypto.randomUUID(),
    stars: "⭐⭐⭐⭐⭐",
    title: "It's OK",
    description:
      "Well, it's a phone and it can make phone calls. Yeah, it's Android OS and it can connect to the Internet and run all of those Androidee apps. So, it's cool, OK.",
    date: dates,
    name: "Benjamin chidera benjmain",
  },
];

export const CustomerDetailsReviews = () => {
  return (
    <main className="mb-5 mt-20 mx-5 pb-7 md:container md:mx-auto shadow-xl shadow-slate-200">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-bold text-lg">Verified Customer Feedback</h1>
      </div>

      <section className="md:flex gap-20 mt-3 px-3">
        <div>
          <h3>VERIFIED RATINGS (10)</h3>

          <div className="my-5 bg-gray-100 grid place-items-center py-5">
            <p className="font-bold text-2xl text-yellow-500">4.3/5</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p className="text-lg max-w-[100px] text-yellow-500 font-semibold">
              10 verified ratings
            </p>
          </div>
        </div>
        <div>
          <div className=" space-y-3">
            {com.map((c) => (
              <div key={c.id} className=" space-y-3 text-sm">
                <p>{c.stars}</p>
                <h3>{c.title}</h3>
                <p className="">{c.description}</p>
                <div className="flex items-center gap-2">
                  <p>{c.date}</p>
                  <p>by</p>
                  <p>{c.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
