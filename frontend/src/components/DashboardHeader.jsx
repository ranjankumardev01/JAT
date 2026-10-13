
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <header className="mb-7 flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Section */}
      <div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your job search and career progress.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-orange-950"
          />
        </div>

        {/* Profile Button */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
            U
          </div>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            My Profile
          </span>
        </button>
      </div>
    </header>
  );
}
