import type { Match } from "../types/match";
import { CalendarDays, ChevronRight } from "lucide-react";

type MatchCardProps = {
    match: Match;
};

function MatchCard({ match }: MatchCardProps) {
    const isLive = match.status === "Live";

    return (
        <article className="rounded-xl border border-[#1d2930] bg-[#080f17] px-4 py-3">

            {/* Top information */}
            <div className="flex items-center gap-3">

                {isLive && (
                    <span className="rounded-md bg-[#ef233c] px-2 py-1 text-[11px] font-bold uppercase text-white">
                        Live
                    </span>
                )}

                <span className="text-xs text-[#a0aab5]">
                    {match.sport}
                </span>

                <span className="text-[#3b4652]">
                    •
                </span>

                <span className="text-xs text-[#718096]">
                    {match.league}
                </span>

            </div>

            <div className="mt-3 flex items-center">

                {/* Match information */}
                <div className=" flex-1">

                    {isLive ? (

                        /* Live match */
                        <div>

                            {/* Team 1 */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team1.slice(0, 2).toUpperCase()}
                                    </div>

                                    <span className="ml-3 text-sm font-semibold text-white">
                                        {match.team1}
                                    </span>
                                </div>

                                <div className="ml-3 text-sm font-bold text-white">
                                    {match.score1}
                                </div>
                            </div>

                            {/* Team 2 */}
                            <div className="mt-3 flex items-center justify-between">

                                <div className="flex items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team2.slice(0, 2).toUpperCase()}
                                    </div>

                                    <span className="ml-3 text-sm font-semibold text-white">
                                        {match.team2}
                                    </span>
                                </div>

                                <div className="ml-3 text-sm font-bold text-white">
                                    {match.score2}
                                </div>

                            </div>

                        </div>

                    ) : (

                        /* Upcoming match */
                        <div>

                            {/* Teams */}
                            <div className="flex items-center">

                                {/* Team 1 */}
                                <div className="flex items-center">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team1.slice(0, 2).toUpperCase()}
                                    </div>

                                    <span className="ml-3 text-sm font-semibold text-white">
                                        {match.team1}
                                    </span>

                                </div>

                                {/* VS */}
                                <span className="mx-6 text-[9px] font-semibold text-[#718096]">
                                    VS
                                </span>

                                {/* Team 2 */}
                                <div className="flex items-center">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team2.slice(0, 2).toUpperCase()}
                                    </div>

                                    <span className="ml-3 text-sm font-semibold text-white">
                                        {match.team2}
                                    </span>

                                </div>

                            </div>

                            {/* Date + Time */}
                            <div className="mt-3 flex items-center gap-2 text-xs text-[#718096]">

                                <CalendarDays
                                    size={13}
                                    strokeWidth={1.8}
                                />

                                <span>{match.date}</span>

                                <span>•</span>

                                <span>{match.time}</span>

                            </div>

                        </div>

                    )}

                </div>

                {/* Divider */}
                <div className="mx-5 h-[88px] mt-[-15px] w-px bg-[#263340]" />

                {/* Market */}
                <div className="flex-1 shrink-0 mt-[-15px]">

                    <p className="mb-3 text-xs font-medium text-[#c1cad5]">
                        Match Winner
                    </p>

                    <div className="grid grid-cols-3 gap-2">

                        {/* Team 1 */}
                        <button className="h-14 rounded-md border border-primary bg-[#0b3027] px-2 text-xs text-white transition-colors hover:bg-[#0e3d30]">

                            <span className="block text-[11px]">
                                {match.team1}
                            </span>

                            <span className="mt-1 block font-bold">
                                {match.odds.team1}
                            </span>

                        </button>

                        {/* Draw */}
                        <button className="h-14 rounded-md border border-[#243342] bg-[#101a25] px-2 text-xs text-white transition-colors hover:border-[#34485a]">

                            <span className="block text-[11px]">
                                Draw
                            </span>

                            <span className="mt-1 block font-bold">
                                {match.odds.draw}
                            </span>

                        </button>

                        {/* Team 2 */}
                        <button className="h-14 rounded-md border border-[#243342] bg-[#101a25] px-2 text-xs text-white transition-colors hover:border-[#34485a]">

                            <span className="block text-[11px]">
                                {match.team2}
                            </span>

                            <span className="mt-1 block font-bold">
                                {match.odds.team2}
                            </span>

                        </button>

                    </div>

                </div>

                {/* Arrow */}
                <button className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center text-[#718096] transition-colors hover:text-white">
                    <ChevronRight size={20} />
                </button>

            </div>

        </article>
    );
}

export default MatchCard;