import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="md:grid grid-cols-12">
      <Sidebar />
      <div className="col-span-9 lg:col-span-10">
        <div className=" h-full max-w-7xl mx-auto overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
