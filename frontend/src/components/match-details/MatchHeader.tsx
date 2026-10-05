import { ArrowLeft, CalendarDays, CircleDot } from "lucide-react";

function MatchHeader() {
    return (
        <>
            {/* Back to Matches */}
            <button className="flex items-center gap-2 text-sm font-medium text-[#c1cad5] transition-colors hover:text-white">
                <ArrowLeft size={18} />
                <span>Back to Matches</span>
            </button>

            {/* Match Header */}
            <section className="mt-4 overflow-hidden rounded-xl border border-[#1d2930] bg-[#080f17]">

                {/* Match Information */}
                <div className="flex h-11 items-center justify-between border-b border-[#1d2930] bg-[#080f17] px-4">

                    <div className="flex items-center gap-3 text-sm">

                        <div className="flex items-center gap-2 text-white">
                            <CircleDot size={17} />
                            <span>Football</span>
                        </div>

                        <span className="text-[#4b5866]">
                            •
                        </span>

                        <span className="text-[#a0aab5]">
                            Premier League
                        </span>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#a0aab5]">

                        <CalendarDays size={14} />

                        <span>
                            12 Oct 2025
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            15:30
                        </span>

                    </div>

                </div>

                {/* Stadium Background */}
                <div className="relative h-[190px] overflow-hidden">

                    <img
                        src="/match-details-banner.png"
                        alt="Stadium Background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#061019]/20" />

                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#071711]/70 to-transparent" />

                    {/* Teams */}
                    <div className="relative z-10 flex h-full items-center justify-center px-16">

                        {/* Team 1 */}
                        <div className="flex flex-1 flex-col items-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#34485a] bg-[#101a25]/90 text-lg font-bold text-white shadow-lg">
                                MC
                            </div>

                            <h1 className="mt-3 text-lg font-bold text-white">
                                Manchester City
                            </h1>

                        </div>

                        {/* VS */}
                        <div className="px-8 text-2xl font-extrabold text-white">
                            VS
                        </div>

                        {/* Team 2 */}
                        <div className="flex flex-1 flex-col items-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#34485a] bg-[#101a25]/90 text-lg font-bold text-white shadow-lg">
                                LF
                            </div>

                            <h1 className="mt-3 text-lg font-bold text-white">
                                Liverpool
                            </h1>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default MatchHeader;