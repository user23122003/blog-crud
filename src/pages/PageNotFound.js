import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center flex-col">
      <div className="w-[700px] h-[400px] mb-10 rounded-xl ">
        <img
          className="h-full w-full object-cover rounded-xl"
          src="https://blog.stackfindover.com/wp-content/uploads/2022/05/404-svg-animated-page-concept.jpg"
          alt=""
        />
      </div>
      <h1 className="text-lg font-bold mb-6">Không tìm thấy trang Oops ...</h1>
      <NavLink
        to={"/"}
        className="text-base font-bold py-4 px-6 bg-bg-dark rounded-lg"
      >
        Quay về Trang Chủ ...
      </NavLink>
    </div>
  );
};

export default PageNotFound;
