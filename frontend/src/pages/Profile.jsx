
import { useEffect, useState } from "react";
 import userService from "@/services/usesrService";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await userService.getMe();
      console.log(response);
      
      setUser(response.data.user);
      
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  const accountDetails = user
    ? [
        {
          label: "Full name",
          value: user.name,
          icon: "U",
        },
        {
          label: "Email address",
          value: user.email,
          icon: "@",
        },
        {
          label: "Account role",
          value: user.role || "user",
          icon: "R",
        },
        {
          label: "User ID",
          value: user.id,
          icon: "#",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600" />
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf7] px-4">
        <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-xl shadow-orange-100/50">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl text-red-500">
            !
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-gray-900">
            Profile unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Go to Login
          </a>

          <button
            onClick={() => window.location.reload()}
            className="mt-3 block w-full rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* Header */}
      <header className="border-b border-orange-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-xl font-extrabold text-white shadow-md shadow-orange-200">
              J
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Job<span className="text-orange-600">Hub</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-orange-600 sm:inline-flex"
            >
              ← Dashboard
            </a>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600">
            ACCOUNT SETTINGS
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            View your personal information and check your account status.
          </p>
        </div>

        {/* Profile hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-500 to-red-600 p-6 text-white shadow-lg shadow-orange-200/60 sm:p-9">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-24 right-48 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white/30 bg-white/20 text-3xl font-extrabold shadow-inner backdrop-blur">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="break-words text-2xl font-extrabold sm:text-3xl">
                  {user.name}
                </h2>

                {user.isActive ? (
                  <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-red-950/20 px-3 py-1 text-xs font-semibold">
                    Inactive
                  </span>
                )}
              </div>

              <p className="mt-2 break-all text-sm text-orange-50 sm:text-base">
                {user.email}
              </p>

              <p className="mt-4 text-sm text-orange-50">
                Account role:{" "}
                <span className="font-bold capitalize text-white">
                  {user.role || "user"}
                </span>
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl bg-white/15 text-3xl sm:self-center">
              ✦
            </div>
          </div>
        </section>

        {/* Status cards */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-600">
              @
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-500">
                Email verification
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  user.emailVerified
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {user.emailVerified ? "Verified" : "Not verified"}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                {user.emailVerified
                  ? "Your email address is verified."
                  : "Email verification may be required for some features."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600">
              ✓
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Account status
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  user.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.isActive ? "Account active" : "Account inactive"}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                {user.isActive
                  ? "Your account is currently enabled."
                  : "Your account is currently disabled."}
              </p>
            </div>
          </div>
        </section>

        {/* Account information */}
        <section className="mt-8 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl font-extrabold">
                Personal information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Details retrieved from your account.
              </p>
            </div>

            <span className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
              Read only
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {accountDetails.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-2xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-600">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {item.label}
                    </p>

                    <p
                      title={String(item.value ?? "")}
                      className="mt-2 break-all text-sm font-semibold text-gray-800"
                    >
                      {item.value ?? "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security information */}
        <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-red-600">
              🔒
            </span>

            <div>
              <h3 className="font-bold text-gray-900">
                Account security
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-600">
                Keep your login credentials private. Your password is
                never displayed on this page.
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="shrink-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            Log out
          </button>
        </section>

        <footer className="py-8 text-center text-xs text-gray-400">
          JobHub · Manage your account securely.
        </footer>
      </main>
    </div>
  );
}
