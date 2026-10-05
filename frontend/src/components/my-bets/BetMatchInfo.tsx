import { CircleDot, Trophy } from "lucide-react";

type BetMatchInfoProps = {
    team1: string;
    team2: string;
    team1Logo: string;
    team2Logo: string;
    sport: "football" | "cricket";
    league: string;
    date: string;
    time: string;
};

function BetMatchInfo({
    team1,
    team2,
    team1Logo,
    team2Logo,
    sport,
    league,
    date,
    time
}: BetMatchInfoProps) {
    return (
        <div>
            {/* Teams */}
            <div className="flex items-center gap-3">
                {/* Team 1 */}
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#34485c] bg-[#142438] text-[10px] font-bold text-white">
                        {team1Logo}
                    </div>

                    <span className="truncate text-base font-semibold text-white">
                        {team1}
                    </span>
                </div>

                <span className="shrink-0 text-sm font-medium text-[#718096]">
                    vs
                </span>

                {/* Team 2 */}
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#34485c] bg-[#142438] text-[10px] font-bold text-white">
                        {team2Logo}
                    </div>

                    <span className="truncate text-base font-semibold text-white">
                        {team2}
                    </span>
                </div>
            </div>

            {/* Match Information */}
            <div className="mt-3 flex items-center gap-2 text-xs text-[#8c9aaa]">
                {sport === "football" ? (
                    <Trophy
                        size={16}
                        strokeWidth={1.8}
                    />
                ) : (
                    <CircleDot
                        size={16}
                        strokeWidth={1.8}
                    />
                )}

                <span>{league}</span>

                <span className="text-[#4d5c6b]">
                    •
                </span>

                <span>{date}</span>

                <span className="text-[#4d5c6b]">
                    •
                </span>

                <span>{time}</span>
            </div>
        </div>
    );
}

export default BetMatchInfo;