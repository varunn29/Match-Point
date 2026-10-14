import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020812] px-5 py-20 text-white">
            {/* Background */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('landing-page-background.png')",
                }}
            />

            <div className="fixed inset-0 bg-[#020812]/80" />

            {/* Back to Home */}
            <Link
                to="/"
                className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#07111d]/70 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-200 hover:border-[#35d07f]/50 hover:text-white sm:left-8 sm:top-8"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>

            {/* Login Form */}
            <section className="relative z-10 w-full max-w-md">
                {/* Logo and Heading */}
                <div className="mb-8 flex flex-col items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/match-point-icon-transparent.png"
                            alt="Match Point"
                            className="h-12 w-12 object-contain"
                        />

                        <span className="text-xl font-extrabold italic tracking-[-0.5px] text-white">
                            MATCH POINT
                        </span>
                    </Link>

                    <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-center text-sm text-[#8c9aaa]">
                        Log in to get back in the game.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/10 bg-[#07111d]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                                className="w-full rounded-lg border border-white/10 bg-[#020812]/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#35d07f]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-200"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        alert("Password recovery is not set up yet.")
                                    }
                                    className="text-xs font-medium text-[#35d07f] transition-colors duration-200 hover:text-white hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-[#020812]/80 px-4 py-3 pr-12 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#35d07f]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#35d07f] px-5 py-3 font-bold text-[#07130d] transition-colors duration-200 hover:bg-[#2cbd70]"
                        >
                            Log In
                            <ArrowRight size={19} />
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-sm text-[#8c9aaa]">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            style={{ color: "#35d07f" }}
                            className="inline-block cursor-pointer font-semibold transition-all duration-200 hover:!text-white hover:underline hover:decoration-[#35d07f] hover:underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Every Match Matters.
                </p>
            </section>
        </main>
    );
}

export default Login;