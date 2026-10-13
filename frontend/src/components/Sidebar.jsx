
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Overview", icon: "⌂", path: "/dashboard", end: true },
  { label: "Profile", icon: "👤", path: "/dashboard/profile" },
  { label: "Applications", icon: "▤", path: "/dashboard/applications" },
  { label: "Companies", icon: "▦", path: "/dashboard/companies" },
  { label: "Jobs", icon: "⌕", path: "/dashboard/jobs" },
  { label: "Resumes", icon: "▧", path: "/dashboard/resumes" },
  { label: "Email Accounts", icon: "✉", path: "/dashboard/email-accounts" },
  { label: "Templates", icon: "▱", path: "/dashboard/templates" },
  { label: "Follow-ups", icon: "◷", path: "/dashboard/follow-ups" },
];

export default function Sidebar({
  sidebarOpen = false,
  setSidebarOpen = () => {},
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-gray-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64
          flex-col border-r border-orange-100 bg-white
          transition-transform duration-200
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center
          justify-between border-b border-gray-100 px-6">

          <NavLink
            to="/dashboard"
            end
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center
              justify-center rounded-xl bg-gradient-to-br
              from-orange-500 to-red-600 text-xl
              font-extrabold text-white">
              J
            </span>

            <span className="text-xl font-extrabold text-gray-900">
              Job<span className="text-orange-600">Hub</span>
            </span>
          </NavLink>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="text-xl text-gray-400 lg:hidden"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pt-6">
          <p className="px-3 text-xs font-bold uppercase
            tracking-widest text-gray-400">
            Workspace
          </p>

          <nav className="mt-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl
                    px-3 py-3 text-left text-sm font-medium
                    transition ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200"
                        : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                    }`
                }
              >
                <span className="w-6 text-center text-lg">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="shrink-0 p-4">
          <div className="rounded-2xl bg-gradient-to-br
            from-orange-50 to-red-50 p-4">

            <div className="flex h-9 w-9 items-center
              justify-center rounded-xl bg-white
              text-lg text-orange-600 shadow-sm">
              ✦
            </div>

            <p className="mt-3 text-sm font-bold text-gray-900">
              Keep moving forward
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Keep your applications and follow-ups organized.
            </p>
          </div>

          <NavLink
            to="/dashboard/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `mt-3 flex w-full items-center gap-3
                rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                }`
            }
          >
            <span className="text-lg">⚙</span>
            Settings
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3
              rounded-xl px-3 py-3 text-sm text-gray-600
              transition hover:bg-red-50 hover:text-red-600"
          >
            <span className="text-lg">↪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
