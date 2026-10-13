
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const activeNav =
    location.pathname === "/dashboard"
      ? "Overview"
      : location.pathname
          .split("/")
          .filter(Boolean)
          .pop()
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="min-h-screen lg:pl-64">

        {/* Page Content */}
        <main className="mx-auto max-w-[1600px] p-4 sm:p-8">
          <DashboardHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
