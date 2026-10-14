import { useContext } from "react";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BetSlipContext from "../../context/BetSlipContext";
import type { Match } from "../../types/match";

type MatchCardProps = {
    match: Match;
};

function MatchCard({ match }: MatchCardProps) {
    const isLive = match.status === "Live";
    const navigate = useNavigate();
    const betSlipContext = useContext(BetSlipContext);

    const market = "Match Winner";

    function openMatchDetails() {
        navigate(`/matches/${match.id}`);
    }

    function selectOutcome(
        selectionId: number,
        selection: string,
        odds: string
    ) {
        if (betSlipContext === null) {
            return;
        }

        const numericOdds = Number(odds);

        if (!Number.isFinite(numericOdds) || numericOdds <= 1) {
            return;
        }

        betSlipContext.addSelection({
            selectionId,
            matchId: match.id,
            matchName: `${match.team1} vs ${match.team2}`,
            market,
            selection,
            odds: numericOdds,
        });
    }

    function isSelected(selectionId: number) {
        if (betSlipContext === null) {
            return false;
        }

        return betSlipContext.selections.some(function (selection) {
            return selection.selectionId === selectionId;
        });
    }

    function getOddsButtonClass(selectionId: number) {
        const selected = isSelected(selectionId);

        if (selected) {
            return "h-14 rounded-md border border-primary bg-[#14513e] px-2 text-xs text-white";
        }

        return "h-14 rounded-md border border-[#243342] bg-[#101a25] px-2 text-xs text-white transition-colors hover:border-[#34485a]";
    }

    function renderOddsButton(
        selectionId: number,
        label: string,
        odds: string
    ) {
        const unavailable = !Number.isFinite(Number(odds)) || Number(odds) <= 1;

        return (
            <button
                key={selectionId}
                type="button"
                disabled={unavailable}
                aria-pressed={isSelected(selectionId)}
                onClick={function (event) {
                    event.stopPropagation();
                    selectOutcome(selectionId, label, odds);
                }}
                className={`${getOddsButtonClass(selectionId)} ${
                    unavailable ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                }`}
            >
                <span className="block truncate text-[11px]">{label}</span>
                <span className="mt-1 block font-bold">
                    {unavailable ? "—" : Number(odds).toFixed(2)}
                </span>
            </button>
        );
    }

    return (
        <article
            onClick={openMatchDetails}
            onKeyDown={function (event) {
                if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                ) {
                    event.preventDefault();
                    openMatchDetails();
                }
            }}
            role="link"
            tabIndex={0}
            aria-label={`View details for ${match.team1} vs ${match.team2}`}
            className="cursor-pointer rounded-xl border border-[#1d2930] bg-[#080f17] px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18d89b]"
        >
            {/* Top information */}
            <div className="flex items-center gap-3">
                {isLive && (
                    <span className="rounded-md bg-[#ef233c] px-2 py-1 text-[11px] font-bold uppercase text-white">
                        Live
                    </span>
                )}
                <span className="text-xs text-[#a0aab5]">{match.sport}</span>
                <span className="text-[#3b4652]">•</span>
                <span className="text-xs text-[#718096]">{match.league}</span>
            </div>

            <div className="mt-3 flex items-center">
                {/* Match information */}
                <div className="min-w-0 flex-1">
                    {isLive ? (
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex min-w-0 items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team1.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="ml-3 truncate text-sm font-semibold text-white">
                                        {match.team1}
                                    </span>
                                </div>
                                <div className="ml-3 text-sm font-bold text-white">
                                    {match.score1}
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex min-w-0 items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team2.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="ml-3 truncate text-sm font-semibold text-white">
                                        {match.team2}
                                    </span>
                                </div>
                                <div className="ml-3 text-sm font-bold text-white">
                                    {match.score2}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center">
                                <div className="flex min-w-0 items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team1.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="ml-3 truncate text-sm font-semibold text-white">
                                        {match.team1}
                                    </span>
                                </div>

                                <span className="mx-3 shrink-0 text-[9px] font-semibold text-[#718096]">
                                    VS
                                </span>

                                <div className="flex min-w-0 items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263340] bg-[#101a25] text-[10px] font-bold text-white">
                                        {match.team2.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="ml-3 truncate text-sm font-semibold text-white">
                                        {match.team2}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2 text-xs text-[#718096]">
                                <CalendarDays size={13} strokeWidth={1.8} />
                                <span>{match.date}</span>
                                <span>•</span>
                                <span>{match.time}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="mx-5 mt-[-15px] h-[88px] w-px shrink-0 bg-[#263340]" />

                {/* Odds */}
                <div className="mt-[-15px] min-w-0 flex-1">
                    <p className="mb-3 text-xs font-medium text-[#c1cad5]">
                        {market}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                        {renderOddsButton(
                            match.id * 10 + 1,
                            match.team1,
                            match.odds.team1
                        )}

                        {renderOddsButton(
                            match.id * 10 + 2,
                            "Draw",
                            match.odds.draw
                        )}

                        {renderOddsButton(
                            match.id * 10 + 3,
                            match.team2,
                            match.odds.team2
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default MatchCard;