
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes with shared sidebar and header */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Default dashboard page */}
            <Route index element={<Dashboard />} />

            {/* Nested dashboard pages */}
            <Route path="profile" element={<Profile />} />

            {/* Add more pages here */}
            {/* <Route path="applications" element={<Applications />} /> */}
            {/* <Route path="companies" element={<Companies />} /> */}
            {/* <Route path="jobs" element={<Jobs />} /> */}
            {/* <Route path="resumes" element={<Resumes />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
