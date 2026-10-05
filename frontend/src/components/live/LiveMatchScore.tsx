import { Clock3 } from "lucide-react";

type LiveMatchScoreProps = {
    team1: string;
    team2: string;
    team1Logo: string;
    team2Logo: string;
    score1: string;
    score2: string;
};

function LiveMatchScore({
    team1,
    team2,
    team1Logo,
    team2Logo,
    score1,
    score2
}: LiveMatchScoreProps) {
    return (
        <div className="mt-6 flex items-center">
            {/* Team 1 */}
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#34485c] bg-[#142438] text-xs font-bold text-white">
                    {team1Logo}
                </div>

                <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-white">
                        {team1}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        {score1}
                    </p>
                </div>
            </div>

            {/* Live Indicator */}
            <div className="mx-8 flex shrink-0 flex-col items-center">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#596673]">
                    Live
                </span>

                <Clock3
                    size={17}
                    strokeWidth={1.8}
                    className="mt-2 text-[#718096]"
                />
            </div>

            {/* Team 2 */}
            <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
                <div className="min-w-0 text-right">
                    <p className="truncate text-base font-semibold text-white">
                        {team2}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                        {score2}
                    </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#34485c] bg-[#142438] text-xs font-bold text-white">
                    {team2Logo}
                </div>
            </div>
        </div>
    );
}

export default LiveMatchScore;