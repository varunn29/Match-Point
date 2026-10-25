import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/config";

function SignUp() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const formData = {
            full_name: fullName.trim(),
            username: username,
            email: email.trim(),
            password: password
        };

        setIsSubmitting(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Could not create your account.");
                return;
            }

            setSuccess(data.message || "Account created successfully.");

            setFullName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            navigate("/home");
        } catch (error) {
            console.error("Registration error:", error);

            setError(
                "Could not connect to the server. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleUsernameChange(value: string) {
        setUsername(value.toLowerCase());
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020812] px-5 py-20 text-white">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('landing-page-background.png')",
                }}
            />

            <div className="fixed inset-0 bg-[#020812]/80" />

            <Link
                to="/"
                className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#07111d]/70 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-200 hover:border-[#35d07f]/50 hover:text-white sm:left-8 sm:top-8"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>

            <section className="relative z-10 w-full max-w-md">
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
                        Create your account
                    </h1>

                    <p className="mt-2 text-center text-sm text-[#8c9aaa]">
                        Join Match Point and follow every moment.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07111d]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Full name
                            </label>

                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                required
                                className="w-full rounded-lg border border-white/10 bg-[#020812]/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#35d07f]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                autoComplete="username"
                                value={username}
                                onChange={(event) =>
                                    handleUsernameChange(event.target.value)
                                }
                                required
                                minLength={3}
                                maxLength={20}
                                pattern="[a-z0-9_]+"
                                title="Use 3–20 lowercase letters, numbers, or underscores."
                                className="w-full rounded-lg border border-white/10 bg-[#020812]/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#35d07f]"
                            />

                            <p className="mt-2 text-xs text-slate-500">
                                Use 3–20 lowercase letters, numbers, or underscores.
                            </p>
                        </div>

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
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className="w-full rounded-lg border border-white/10 bg-[#020812]/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#35d07f]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                    minLength={8}
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
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Confirm password
                            </label>

                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    required
                                    minLength={8}
                                    className="w-full rounded-lg border border-white/10 bg-[#020812]/80 px-4 py-3 pr-12 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#35d07f]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="text-sm text-red-400"
                            >
                                {error}
                            </p>
                        )}

                        {success && (
                            <p
                                role="status"
                                className="text-sm text-[#35d07f]"
                            >
                                {success}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#35d07f] px-5 py-3 font-bold text-[#07130d] transition-colors duration-200 hover:bg-[#2cbd70] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                            <ArrowRight size={19} />
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#8c9aaa]">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{ color: "#35d07f" }}
                            className="inline-block cursor-pointer font-semibold transition-all duration-200 hover:!text-white hover:underline hover:decoration-[#35d07f] hover:underline-offset-4"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    By creating an account, you agree to use Match Point
                    responsibly.
                </p>
            </section>
        </main>
    );
}

export default SignUp;