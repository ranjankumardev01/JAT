import { useState } from "react";
import { Link } from "react-router-dom";

import { authService } from "../services/authServices";
import { toastService } from "../services/toastService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Register() {
  // Tailwind: state for form data, password visibility, and loading status.
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) {
      toastService.error("Please enter your full name.");
      return;
    }

    if (!email) {
      toastService.error("Please enter your email address.");
      return;
    }

    if (form.password.length < 8) {
      toastService.error("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toastService.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        email,
        password: form.password,
      };

      const response = await authService.registerUser(payload);

      toastService.success(
        response.message ||
        "Account created successfully! You can now log in."
      );

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      toastService.error(
        err.response?.data?.message ||
        err.message ||
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Tailwind: shared input styling for consistent look across all fields.
  const inputClass =
    "h-11 rounded-xl border-gray-200 bg-white focus-visible:border-orange-500 focus-visible:ring-orange-100";

  const features = [
    {
      icon: "⌕",
      title: "Find Great Jobs",
      description:
        "Explore opportunities that match your skills and goals.",
    },
    {
      icon: "↗",
      title: "Grow Your Career",
      description:
        "Take the next step toward your professional future.",
    },
    {
      icon: "◎",
      title: "Build Connections",
      description:
        "Connect with employers and other professionals.",
    },
  ];

  return (
    // Tailwind: full-height main container with white background and dark text.
    <main className="min-h-[calc(100vh-73px)] bg-white text-gray-900">
      {/* Tailwind: two-column responsive grid for left panel and form. */}
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl ">
        {/* Left panel */}
        {/* Tailwind: hidden on mobile, gradient background, centered content. */}
         

        {/* Registration form */}
        {/* Tailwind: centered form section with responsive padding. */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10 xl:px-16">
          <div className="w-full max-w-lg">
            {/* Tailwind: card with rounded corners, orange border, and soft shadow. */}
            <Card className="rounded-3xl border-orange-100 shadow-xl shadow-orange-100/60">
              {/* Tailwind: header with icon and title side by side. */}
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 pb-4 sm:p-9 sm:pb-5">
                {/* Tailwind: gradient icon container for the plus sign. */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl font-bold text-white shadow-lg shadow-orange-200">
                  +
                </div>

                <div>
                  {/* Tailwind: bold card title with responsive size. */}
                  <CardTitle className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Create Account
                  </CardTitle>

                  {/* Tailwind: muted description below the title. */}
                  <CardDescription className="mt-1">
                    Start building your future today.
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Tailwind: card content with responsive padding. */}
              <CardContent className="px-6 pb-6 sm:px-9 sm:pb-9">
                {/* Tailwind: form with vertical spacing between fields. */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full name */}
                  {/* Tailwind: wrapper for label and input with small gap. */}
                  <div className="space-y-2">
                    {/* Tailwind: label with red asterisk for required field. */}
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      maxLength={100}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address{" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>

                    {/* Tailwind: relative wrapper for positioning the show/hide button. */}
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={handleChange}
                        className={`${inputClass} pr-20`}
                        required
                        minLength={8}
                      />

                      {/* Tailwind: ghost button positioned inside the input on the right. */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-1 top-1/2 h-8 -translate-y-1/2 rounded-lg text-xs text-orange-600 hover:bg-orange-50 hover:text-red-600"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>

                    {/* Tailwind: small helper text for password requirements. */}
                    <p className="text-xs text-gray-400">
                      Use at least 8 characters.
                    </p>
                  </div>

                  {/* Confirm password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password{" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    {/* Tailwind: relative wrapper for positioning the show/hide button. */}
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`${inputClass} pr-20`}
                        required
                      />

                      {/* Tailwind: ghost button positioned inside the input on the right. */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-1 top-1/2 h-8 -translate-y-1/2 rounded-lg text-xs text-orange-600 hover:bg-orange-50 hover:text-red-600"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>

                  {/* Submit */}
                  {/* Tailwind: full-width gradient button with hover lift effect and loading spinner. */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-red-700 focus-visible:ring-orange-200"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        {/* Tailwind: spinning loader border. */}
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Creating Account...
                      </span>
                    ) : (
                      <>
                        Create Account{" "}
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </Button>
                </form>

                {/* Tailwind: horizontal divider with centered text. */}
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-sm text-gray-400">
                    Secure registration
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Tailwind: centered sign-in link with hover color change. */}
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-orange-600 transition hover:text-red-600"
                  >
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Tailwind: small legal text centered below the card. */}
            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              By creating an account, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}