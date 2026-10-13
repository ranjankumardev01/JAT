
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authServices";
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
import { toastService } from "@/services/toastService";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const email = form.email.trim();
  const password = form.password;

  if (!email) {
    toastService.error("Please enter your email address.");
    return;
  }

  if (password.length < 8) {
    toastService.error("Password must be at least 8 characters.");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      email,
      password,
    };

    const response = await authService.loginUser(payload);

    const token = response.token || response.accessToken;

    if (!token) {
      throw new Error("Login succeeded, but no authentication token was returned.");
    }

    localStorage.setItem("token", token);

    toastService.success(response.message || "Login successful!");

    navigate("/dashboard", { replace: true });
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


    const inputClass =
        "h-12 rounded-xl border-gray-200 bg-white focus-visible:border-orange-500 focus-visible:ring-orange-100";

    return (
        <main className="min-h-[calc(100vh-73px)] bg-white text-gray-900">
            <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl ">


                {/* Login form */}
                <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10 xl:px-16">
                    <div className="w-full max-w-lg">
                        <Card className="rounded-3xl border-orange-100 shadow-xl shadow-orange-100/60">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 pb-4 sm:p-9 sm:pb-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl font-bold text-white shadow-lg shadow-orange-200">
                                    J
                                </div>

                                <div>
                                    <CardTitle className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                        Welcome Back
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        Sign in to continue your job journey.
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="px-6 pb-6 sm:px-9 sm:pb-9">
                                {error && (
                                    <div
                                        role="alert"
                                        className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                    >
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
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
                                        <div className="flex items-center justify-between gap-2">
                                            <Label htmlFor="password">
                                                Password{" "}
                                                <span className="text-red-500">*</span>
                                            </Label>

                                            <Link
                                                to="/forgot-password"
                                                className="text-xs font-semibold text-orange-600 transition hover:text-red-600"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                value={form.password}
                                                onChange={handleChange}
                                                className={`${inputClass} pr-20`}
                                                required
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-lg text-xs text-orange-600 hover:bg-orange-50 hover:text-red-600"
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="h-12 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-red-700 focus-visible:ring-orange-200"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                Signing In...
                                            </span>
                                        ) : (
                                            <>
                                                Sign In <span aria-hidden="true">→</span>
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="my-6 flex items-center gap-4">
                                    <div className="h-px flex-1 bg-gray-200" />
                                    <span className="text-sm text-gray-400">
                                        Secure login
                                    </span>
                                    <div className="h-px flex-1 bg-gray-200" />
                                </div>

                                <p className="text-center text-sm text-gray-500">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="font-bold text-orange-600 transition hover:text-red-600"
                                    >
                                        Create account
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>

                        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
                            By signing in, you agree to our Terms of Service
                            and Privacy Policy.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
