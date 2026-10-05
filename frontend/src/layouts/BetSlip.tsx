import { useContext } from "react";
import { FileText, X } from "lucide-react";
import BetSlipContext from "../context/BetSlipContext";

function BetSlip() {
    const context = useContext(BetSlipContext);

    if (context === null) {
        return null;
    }

    const selections = context.selections;
    const stake = context.stake;
    const setStake = context.setStake;

    const totalOdds = selections.reduce(function (total, selection) {
        return total * selection.odds;
    }, 1);

    const potentialPayout = stake * totalOdds;

    return (
        <aside className="w-[320px] shrink-0 border-l border-[#1d2930] bg-[#070d13]">
            {/* Header */}
            <div className="flex h-[68px] items-center justify-between border-b border-[#1d2930] px-5">
                <div>
                    <h2 className="text-base font-bold text-white">
                        Bet Slip
                    </h2>

                    <p className="mt-0.5 text-xs text-[#718096]">
                        {selections.length} selections
                    </p>
                </div>

                <button
                    type="button"
                    onClick={function () {
                        context.setSelections([]);
                        setStake(0);
                    }}
                    className="text-xs font-medium text-[#718096] transition-colors hover:text-white"
                >
                    Clear
                </button>
            </div>

            {/* Selections */}
            {selections.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0d171f]">
                        <FileText
                            size={25}
                            strokeWidth={1.6}
                            className="text-[#718096]"
                        />
                    </div>

                    <h3 className="mt-5 text-sm font-semibold text-white">
                        Your bet slip is empty
                    </h3>

                    <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#718096]">
                        Select a market or odd from a match to add it to your
                        bet slip.
                    </p>
                </div>
            ) : (
                <div className="space-y-2 p-4">
                    {selections.map(function (selection) {
                        return (
                            <div
                                key={selection.selectionId}
                                className="rounded-lg border border-[#1d2930] bg-[#101923] p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#718096]">
                                            {selection.matchName}
                                        </p>

                                        <div className="mt-2 flex items-center justify-between gap-4">
                                            <span className="text-sm font-semibold text-white">
                                                {selection.selection}
                                            </span>

                                            <span className="text-sm font-bold text-[#35d07f]">
                                                {selection.odds.toFixed(2)}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-xs text-[#718096]">
                                            {selection.market}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={function () {
                                            context.removeSelection(
                                                selection.selectionId
                                            );
                                        }}
                                        className="shrink-0 text-[#718096] transition-colors hover:text-white"
                                        aria-label={`Remove ${selection.selection}`}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Bottom */}
            <div className="border-t border-[#1d2930] p-5">
                <div>
                    <label
                        htmlFor="stake"
                        className="text-sm text-[#8c9aaa]"
                    >
                        Stake
                    </label>

                    <div className="mt-2 flex items-center rounded-lg border border-[#1d2930] bg-[#101923]">
                        <span className="px-3 text-sm text-[#718096]">
                            ₹
                        </span>

                        <input
                            id="stake"
                            type="number"
                            min="0"
                            value={stake}
                            onChange={function (event) {
                                setStake(Number(event.target.value));
                            }}
                            className="h-11 w-full bg-transparent pr-3 text-sm font-semibold text-white outline-none"
                            placeholder="Enter stake"
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-[#8c9aaa]">
                        Total Stake
                    </span>

                    <span className="text-sm font-semibold text-white">
                        ₹{stake.toFixed(2)}
                    </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-[#8c9aaa]">
                        Potential Payout
                    </span>

                    <span className="text-sm font-semibold text-[#35d07f]">
                        ₹{potentialPayout.toFixed(2)}
                    </span>
                </div>

                <button
                    type="button"
                    disabled={selections.length === 0}
                    className="mt-4 h-11 w-full rounded-lg bg-[#1a2922] text-sm font-semibold text-[#50685b]"
                >
                    Place Bet
                </button>
            </div>
        </aside>
    );
}

export default BetSlip;