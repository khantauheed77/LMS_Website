import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Sidebar from "../../components/educator/Sidebar";
import FooterEdu from "../../components/educator/FooterEdu";

const Educator = () => {
  return (
    <div className="">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
       <div className="flex-1">
        { <Outlet />}
       </div>
      </div>
      <FooterEdu/>
    </div>
  );
};

export default Educator;
