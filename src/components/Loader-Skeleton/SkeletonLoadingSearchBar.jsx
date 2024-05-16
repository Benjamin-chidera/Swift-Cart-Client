/* eslint-disable react/prop-types */
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonLoadingSearchBar = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center  p-5 fixed z-10 top-14 md:w-[500px] lg:w-[600px] xl:w-[980px] bg-white">
      {l.map((i, index) => {
        return (
          <div className="grid grid-cols-5 gap-[115px]" key={index}>
            <Skeleton className="rounded-lg  w-28 h-28" />
            <div className="w-40">
              <Skeleton height={"20px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"60px"} highlightColor="#444" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SkeletonLoadingRecentProduct = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className=" gap-12 justify-center basis-1/1 md:basis-1/3 lg:basis-1/5 flex">
      {l.map((i, index) => {
        return (
          <div className="" key={index}>
            <Skeleton className="rounded-lg w-full h-[120px] md:w-[150px] md:h-[150px] object-cover lg:w-[300px] " />
            <div className="w-40">
              <Skeleton height={"20px"} width={"100px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"100%"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"100%"} highlightColor="#444" />
              <Skeleton className="w-full h-[40px] md:w-[150px]  object-cover lg:w-[300px] " />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SkeletonLoadingSingleProduct = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className=" my-5 px-3 md:container md:mx-auto md:flex justify-between w-full gap-5">
      {l.map((i, index) => {
        return (
          <div className="w-full md:flex gap-5" key={index}>
            <div className="md:w-[50%]">
              <Skeleton className="rounded-lg w-full h-[200px] md:w-[300px] md:h-[400px]  mx-auto lg:w-full lg:h-[500px] object-cover" />
            </div>
            <div className="md:w-[50%] flex flex-col gap-3">
              <Skeleton height={"20px"} width={"80px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"100px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"80px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"80px"} highlightColor="#444" />
              <Skeleton
                height={"40px"}
                className="w-full h-[200px] md:w-[300px] md:h-[400px]  mx-auto lg:w-full lg:h-[500px]"
                highlightColor="#444"
              />
              <Skeleton height={"20px"} width={"300px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"200px"} highlightColor="#444" />
              <Skeleton height={"20px"} width={"200px"} highlightColor="#444" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SkeletonLoadingProducts = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className=" p-2  gap-5 rounded-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[950px] max-w-full">
      {l.map((i, index) => {
        return (
          <div className="" key={index}>
            <Skeleton
              className="rounded-lg  w-full mx-auto h-[100px] lg:w-full lg:h-[120px] 
             "
            />
            <div className="w-40">
              <Skeleton
                height={"20px"}
                className="w-[70px] md:w-[100px]"
                highlightColor="#444"
              />
              <Skeleton
                height={"20px"}
                className="w-[90px] md:w-[150px]"
                highlightColor="#444"
              />
              <Skeleton
                height={"20px"}
                className="w-[50px] md:w-[120px]"
                highlightColor="#444"
              />
              <Skeleton
                height={"40px"}
                className="w-[140px] md:w-[150px]"
                highlightColor="#444"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
