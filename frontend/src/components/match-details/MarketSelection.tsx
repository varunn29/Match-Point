import { useContext } from "react";
import BetSlipContext from "../../context/BetSlipContext";

type MarketSelectionProps = {
    selectionId: number;
    matchId: number;
    matchName: string;
    label: string;
    odds: number;
};

function MarketSelection({
    selectionId,
    matchId,
    matchName,
    label,
    odds
}: MarketSelectionProps) {
    const context = useContext(BetSlipContext);

    function handleSelection() {
        if (context === null) {
            return;
        }

        context.addSelection({
            selectionId: selectionId,
            matchId: matchId,
            matchName: matchName,
            market: "",
            selection: label,
            odds: odds
        });
    }

    return (
        <button
            type="button"
            onClick={handleSelection}
            className="flex flex-col gap-3 items-center justify-between rounded-lg border border-[#1d2930] bg-[#101923] px-4 py-3 text-left transition-colors hover:border-[#35d07f] hover:bg-[#13231c]"
        >
            <div>
                <p className="text-sm font-medium text-white">
                    {label}
                </p>
            </div>

            <span className="text-sm font-bold text-[#35d07f]">
                {odds.toFixed(2)}
            </span>
        </button>
    );
}

export default MarketSelection;