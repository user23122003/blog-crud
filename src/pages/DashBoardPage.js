import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import Header from "../Layout/Header";

import Sidebar from "../module/dashboard/Sidebar";
import PageNotFound from "./PageNotFound";

const DashBoardPage = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <PageNotFound></PageNotFound>;
  return (
    <>
      <Header></Header>
      <div
        className="w-full md:max-w-[1300px] sm:max-w-[500px] mx-auto md:mt-10 sm:mt-5 p-4
         rounded-2xl
       bg-bg-secondary flex sm:flex-col md:flex-row md:gap-10 sm:gap-2"
      >
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default DashBoardPage;
