import BetDetails from "./BetDetails";
import BetMatchInfo from "./BetMatchInfo";

export type BetStatus = "pending" | "won" | "lost";

export type Bet = {
    id: number;
    team1: string;
    team2: string;
    team1Logo: string;
    team2Logo: string;
    sport: "football" | "cricket";
    league: string;
    date: string;
    time: string;
    status: BetStatus;
    market: string;
    selection: string;
    odds: string;
    stake: string;
    payout: string;
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

    return "LOST";
}

function getStatusClasses(status: BetStatus) {
    if (status === "pending") {
        return "border-[#29435c] bg-[#172a3d] text-[#b9d2ea]";
    }

    if (status === "won") {
        return "border-[#159f75] bg-[#123b31] text-primary";
    }

    return "border-[#d63a46] bg-[#3b1c22] text-[#ff6570]";
}

function BetCard({ bet }: BetCardProps) {
    return (
        <article className="rounded-xl border border-[#24384a] bg-[#091521] px-6 py-5">
            {/* Match Information + Status */}
            <div className="flex items-start justify-between">
                <BetMatchInfo
                    team1={bet.team1}
                    team2={bet.team2}
                    team1Logo={bet.team1Logo}
                    team2Logo={bet.team2Logo}
                    sport={bet.sport}
                    league={bet.league}
                    date={bet.date}
                    time={bet.time}
                />

                <span
                    className={`ml-4 shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide ${getStatusClasses(
                        bet.status
                    )}`}
                >
                    {getStatusLabel(bet.status)}
                </span>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-[#1d2d3c]" />

            <BetDetails
                market={bet.market}
                selection={bet.selection}
                odds={bet.odds}
                stake={bet.stake}
                payout={bet.payout}
                status={bet.status}
            />
        </article>
    );
}

export default BetCard;