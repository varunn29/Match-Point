import { CircleDot, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import LiveMatchScore from "./LiveMatchScore";
import LiveOdds from "./LiveOdds";

export type LiveMatch = {
    id: number;
    sport: "football" | "cricket";
    league: string;
    team1: string;
    team2: string;
    team1Logo: string;
    team2Logo: string;
    score1: string;
    score2: string;
    matchTime: string;
    market: string;
    odds: {
        label: string;
        value: string;
    }[];
};

type LiveMatchCardProps = {
    match: LiveMatch;
};

function getSportIcon(sport: LiveMatch["sport"]) {
    if (sport === "cricket") {
        return (
            <CircleDot
                size={16}
                strokeWidth={1.8}
            />
        );
    }

    return (
        <Trophy
            size={16}
            strokeWidth={1.8}
        />
    );
}

function LiveMatchCard({
    match
}: LiveMatchCardProps) {
    return (
        <article className="rounded-xl border border-[#24384a] bg-[#091521] p-5">
            {/* Match Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8c9aaa]">
                    {getSportIcon(match.sport)}

                    <span>
                        {match.league}
                    </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#4b242c] bg-[#30191e] px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ef233c]" />

                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#ff6570]">
                        Live
                    </span>

                    <span className="text-[11px] font-medium text-[#c97980]">
                        {match.matchTime}
                    </span>
                </div>
            </div>

            {/* Teams and Score */}
            <LiveMatchScore
                team1={match.team1}
                team2={match.team2}
                team1Logo={match.team1Logo}
                team2Logo={match.team2Logo}
                score1={match.score1}
                score2={match.score2}
            />

            {/* Odds */}
            <LiveOdds
                market={match.market}
                odds={match.odds}
            />

            {/* View Match */}
            <Link
                to={`/matches/${match.id}`}
                className="mt-4 flex h-11 w-full items-center justify-center rounded-lg border border-[#34485c] text-sm font-semibold text-white transition-colors hover:border-primary"
            >
                View Match
            </Link>
        </article>
    );
}

export default LiveMatchCard;