import { ArrowLeft, CalendarDays, CircleDot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Match } from "../../types/match";

type MatchHeaderProps = {
    match: Match;
};

function MatchHeader({ match }: MatchHeaderProps) {
    const navigate = useNavigate();
    const isLive = match.status === "Live";

    return (
        <>
            <button
                type="button"
                onClick={function () {
                    navigate("/home");
                }}
                className="flex items-center gap-2 text-sm font-medium text-[#c1cad5] transition-colors hover:text-white"
            >
                <ArrowLeft size={18} />
                <span>Back to Matches</span>
            </button>

            <section className="mt-4 overflow-hidden rounded-xl border border-[#1d2930] bg-[#080f17]">
                {/* Match Information */}
                <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-[#1d2930] px-4 py-2">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-white">
                            <CircleDot size={17} />
                            <span>{match.sport}</span>
                        </div>

                        <span className="text-[#4b5866]">•</span>

                        <span className="text-[#a0aab5]">
                            {match.league}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#a0aab5]">
                        {isLive ? (
                            <>
                                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                                <span className="font-bold uppercase text-red-400">
                                    Live
                                </span>
                            </>
                        ) : (
                            <>
                                <CalendarDays size={14} />
                                <span>{match.date ?? "Upcoming"}</span>

                                {match.time && (
                                    <>
                                        <span>•</span>
                                        <span>{match.time}</span>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Stadium Background */}
                <div className="relative min-h-[230px] overflow-hidden">
                    <img
                        src="/match-details-banner.png"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#061019]/50" />

                    {/* Bottom Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071711]/80 to-transparent" />

                    {/* Teams and Score */}
                    <div className="relative z-10 grid min-h-[230px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-6 sm:gap-8 sm:px-10">
                        {/* Team 1 */}
                        <div className="flex min-w-0 flex-col items-center text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#34485a] bg-[#101a25]/90 text-base font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-lg">
                                {match.team1
                                    .split(" ")
                                    .map(function (word) {
                                        return word[0];
                                    })
                                    .join("")
                                    .slice(0, 3)
                                    .toUpperCase()}
                            </div>

                            <h1 className="mt-3 text-sm font-bold text-white sm:text-lg">
                                {match.team1}
                            </h1>
                        </div>

                        {/* Score */}
                        <div className="flex flex-col items-center">
                            {isLive ? (
                                <div
                                    className="whitespace-nowrap text-4xl font-extrabold tabular-nums text-white sm:text-5xl"
                                    aria-label={`Score ${match.score1 ?? 0} to ${match.score2 ?? 0}`}
                                >
                                    {match.score1 ?? 0}
                                    <span className="text-[#8c9aaa]"> – </span>
                                    {match.score2 ?? 0}
                                </div>
                            ) : (
                                <span className="text-xl font-extrabold text-white sm:text-2xl">
                                    VS
                                </span>
                            )}
                        </div>

                        {/* Team 2 */}
                        <div className="flex min-w-0 flex-col items-center text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#34485a] bg-[#101a25]/90 text-base font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-lg">
                                {match.team2
                                    .split(" ")
                                    .map(function (word) {
                                        return word[0];
                                    })
                                    .join("")
                                    .slice(0, 3)
                                    .toUpperCase()}
                            </div>

                            <h1 className="mt-3 text-sm font-bold text-white sm:text-lg">
                                {match.team2}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MatchHeader;