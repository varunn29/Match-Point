import { ArrowRight, CircleDot, Goal } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020b13] text-white">

            {/* Stadium Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('landing-page-background.png')",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#020b13]/55" />

            {/* Top Branding */}
            <header className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-10 sm:right-10 lg:left-16 lg:right-16">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/match-point-icon-transparent.png"
                        alt="Match Point"
                        className="h-10 w-10 object-contain"
                    />

                    <span className="text-[18px] font-extrabold italic tracking-[-0.5px] text-white">
                        MATCH POINT
                    </span>
                </Link>

                <p className="hidden text-xs font-medium tracking-[0.2em] text-slate-300 sm:block">
                    PLAY SMART. BET SMARTER.
                </p>
            </header>

            {/* Main Content */}
            <section className="relative z-10 mx-5 flex w-full max-w-3xl flex-col items-center text-center">
                <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                    Your Game.
                    <br />
                    <span className="text-[#35d07f]">Our Focus.</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-lg sm:leading-8">
                    Live matches. Real-time updates.
                    <br className="hidden sm:block" />
                    Cricket and football, all in one place.
                </p>

                {/* Authentication Buttons */}
                <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row">
                    <Link
                        to="/signup"
                        className="flex min-h-14 flex-1 items-center justify-center gap-3 rounded-lg bg-[#35d07f] px-6 py-4 font-bold text-[#07130d] transition-colors hover:bg-[#2cbd70]"
                    >
                        Sign Up
                        <ArrowRight size={20} />
                    </Link>

                    <Link
                        to="/login"
                        className="flex min-h-14 flex-1 items-center justify-center gap-3 rounded-lg border border-[#35d07f] bg-[#020b13]/60 px-6 py-4 font-bold text-white transition-colors hover:bg-[#35d07f]/10"
                    >
                        Log In
                        <ArrowRight
                            size={20}
                            className="text-[#35d07f]"
                        />
                    </Link>
                </div>

                {/* Feature Highlights */}
                <div className="mt-12 flex items-center justify-center gap-5 text-xs text-slate-300 sm:gap-10 sm:text-sm">
                    <div className="flex flex-col items-center gap-2">
                        <Goal size={25} className="text-[#35d07f]" />
                        <span>Live Matches</span>
                    </div>

                    <div className="h-10 w-px bg-white/20" />

                    <div className="flex flex-col items-center gap-2">
                        <CircleDot
                            size={25}
                            className="text-[#35d07f]"
                        />
                        <span>Cricket & Football</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LandingPage;