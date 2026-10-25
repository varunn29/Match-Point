import { useContext } from "react";
import BetSlipContext from "../../context/BetSlipContext";

type MarketSelectionProps = {
    selectionId: number;
    matchId: number;
    matchName: string;
    market: string;
    label: string;
    odds: number;
};

function MarketSelection({
    selectionId,
    matchId,
    matchName,
    market,
    label,
    odds,
}: MarketSelectionProps) {
    const context = useContext(BetSlipContext);

    const isSelected =
        context?.selections.some(function (selection) {
            return (
                selection.matchId === matchId &&
                selection.market.trim().toLowerCase() ===
                    market.trim().toLowerCase() &&
                selection.selection === label
            );
        }) ?? false;

    function handleSelection() {
        if (context === null) {
            return;
        }

        context.addSelection({
            selectionId,
            matchId,
            matchName,
            market,
            selection: label,
            odds,
        });
    }

    return (
        <button
            type="button"
            onClick={handleSelection}
            aria-pressed={isSelected}
            className={`flex min-w-0 flex-col items-center justify-between gap-3 rounded-lg border px-4 py-3 text-center transition-colors ${
                isSelected
                    ? "border-[#35d07f] bg-[#13271e]"
                    : "border-[#1d2930] bg-[#101923] hover:border-[#35d07f] hover:bg-[#13231c]"
            }`}
        >
            <span className="text-sm font-medium text-white">
                {label}
            </span>

            <span className="text-sm font-bold text-[#35d07f]">
                {odds.toFixed(2)}
            </span>
        </button>
    );
}

export default MarketSelection;