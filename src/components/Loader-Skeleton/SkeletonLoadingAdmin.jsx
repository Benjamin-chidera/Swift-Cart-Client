import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonLoadingSoldItem = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className="grid grid-cols-3 gap-5  w-full bg-white">
      {l.map((i, index) => {
        return (
          <div className="grid grid-cols-3 gap-[115px]" key={index}>
            <div className="">
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SkeletonLoadingRecentOrder = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className="grid grid-cols-6 gap-5  w-full bg-white">
      {l.map((i, index) => {
        return (
          <div className="grid grid-cols-6 gap-[115px]" key={index}>
            <div className="">
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SkeletonLoadingNewUsers = ({ num }) => {
  let l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className="grid grid-cols-1 place-items-start gap-5  w-full bg-white">
      {l.map((i, index) => {
        return (
          <div className="grid grid-cols-4 w-full" key={index}>
            <Skeleton className="w-10 h-10" highlightColor="#444" />
            <div className="">
              <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
              <Skeleton height={"15px"} width={"120px"} highlightColor="#444" />
            </div>
            <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
            <Skeleton height={"15px"} width={"60px"} highlightColor="#444" />
          </div>
        );
      })}
    </div>
  );
};
