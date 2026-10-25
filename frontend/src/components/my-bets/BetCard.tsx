import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import BetMatchInfo from "./BetMatchInfo";

export type BetStatus = "pending" | "won" | "lost" | "void";

export type BetSelection = {
    matchId: number;
    matchName: string;
    market: string;
    selection: string;
    odds: number;
};

export type Bet = {
    id: number;
    stake: string;
    total_odds: string;
    potential_return: string;
    actual_return: string | null;
    status: BetStatus;
    bet_type: "single" | "multiple";
    placed_at: string;
    settled_at: string | null;
    selections: BetSelection[];
};

type BetCardProps = {
    bet: Bet;
};

function getStatusLabel(status: BetStatus) {
    if (status === "pending") {
        return "PENDING";
    }

    if (status === "won") {
        return "WON";
    }

    if (status === "lost") {
        return "LOST";
    }

    return "VOID";
}

function getStatusClasses(status: BetStatus) {
    if (status === "pending") {
        return "border-[#29435c] bg-[#172a3d] text-[#b9d2ea]";
    }

    if (status === "won") {
        return "border-[#159f75] bg-[#123b31] text-primary";
    }

    if (status === "lost") {
        return "border-[#d63a46] bg-[#3b1c22] text-[#ff6570]";
    }

    return "border-[#64748b] bg-[#1e293b] text-[#cbd5e1]";
}

function formatCurrency(value: string | number) {
    return `₹${Number(value).toFixed(2)}`;
}

function getMatchTeams(matchName: string) {
    const teams = matchName.split(" vs ");

    return {
        team1: teams[0] || matchName,
        team2: teams[1] || "",
    };
}

function getTeamLogo(team: string) {
    return team
        .split(/\s+/)
        .map(function (word) {
            return word[0] || "";
        })
        .join("")
        .slice(0, 3)
        .toUpperCase();
}

function BetCard({ bet }: BetCardProps) {
    const navigate = useNavigate();

    const placedAt = new Date(bet.placed_at);

    return (
        <article className="rounded-xl border border-[#24384a] bg-[#091521] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#9aaec2]">
                        Bet #{bet.id} ·{" "}
                        {bet.bet_type === "multiple"
                            ? "Multiple"
                            : "Single"}
                    </p>

                    <p className="mt-2 text-sm text-[#9aaec2]">
                        Placed{" "}
                        {Number.isNaN(placedAt.getTime())
                            ? "date unavailable"
                            : placedAt.toLocaleString()}
                    </p>
                </div>

                <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide ${getStatusClasses(
                        bet.status
                    )}`}
                >
                    {getStatusLabel(bet.status)}
                </span>
            </div>

            <div className="my-4 h-px bg-[#1d2d3c]" />

            <div className="space-y-5">
                {bet.selections.map(function (selection, index) {
                    const teams = getMatchTeams(selection.matchName);

                    return (
                        <div key={`${selection.matchId}-${index}`}>
                            <BetMatchInfo
                                team1={teams.team1}
                                team2={teams.team2}
                                team1Logo={getTeamLogo(teams.team1)}
                                team2Logo={getTeamLogo(teams.team2)}
                                sport="football"
                                league={selection.market}
                                date=""
                                time=""
                            />

                            <div className="mt-3">
                                <p className="text-xs text-[#9aaec2]">
                                    {selection.market}
                                </p>

                                <p className="mt-1 font-semibold text-white">
                                    {selection.selection}
                                </p>

                                <p className="mt-1 text-sm text-[#9aaec2]">
                                    Odds: {Number(selection.odds).toFixed(2)}
                                </p>
                            </div>

                            {index < bet.selections.length - 1 && (
                                <div className="mt-5 h-px bg-[#1d2d3c]" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="my-5 h-px bg-[#1d2d3c]" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                    <p className="text-xs text-[#9aaec2]">Stake</p>
                    <p className="mt-1 font-semibold text-white">
                        {formatCurrency(bet.stake)}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-[#9aaec2]">Total Odds</p>
                    <p className="mt-1 font-semibold text-white">
                        {Number(bet.total_odds).toFixed(2)}
                    </p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-[#9aaec2]">
                        {bet.status === "won"
                            ? "Actual Return"
                            : "Potential Return"}
                    </p>

                    <p className="mt-1 font-semibold text-primary">
                        {formatCurrency(
                            bet.status === "won" && bet.actual_return !== null
                                ? bet.actual_return
                                : bet.potential_return
                        )}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
                {bet.selections.map(function (selection, index) {
                    return (
                        <button
                            key={`${selection.matchId}-${index}`}
                            type="button"
                            onClick={function () {
                                navigate(`/matches/${selection.matchId}`);
                            }}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#294258] bg-[#142b3c] px-4 py-2 text-sm font-medium text-[#b9d2ea] transition-colors hover:bg-[#1b384d]"
                        >
                            {`Match ${index + 1}`}
                            <ExternalLink size={16} />
                        </button>
                    );
                })}
            </div>
        </article>
    );
}

export default BetCard;