import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type BetSelection = {
    selectionId: number;
    matchId: number;
    matchName: string;
    market: string;
    selection: string;
    odds: number;
};

type BetSlipContextValue = {
    selections: BetSelection[];
    stake: number;
    setStake: Dispatch<SetStateAction<number>>;
    setSelections: Dispatch<SetStateAction<BetSelection[]>>;
    addSelection: (selection: BetSelection) => void;
    removeSelection: (selectionId: number) => void;
};

const BetSlipContext = createContext<BetSlipContextValue | null>(null);

function BetSlipProvider({ children }: { children: ReactNode }) {
    const [selections, setSelections] = useState<BetSelection[]>([]);
    const [stake, setStake] = useState<number>(0);

    function addSelection(selection: BetSelection) {
        setSelections(function (currentSelections) {
            const normalizedMarket = selection.market.trim().toLowerCase();

            const existingSelection = currentSelections.find(
                function (currentSelection) {
                    return (
                        currentSelection.matchId === selection.matchId &&
                        currentSelection.market.trim().toLowerCase() ===
                            normalizedMarket
                    );
                }
            );

            if (
                existingSelection &&
                existingSelection.selectionId === selection.selectionId &&
                existingSelection.selection === selection.selection
            ) {
                return currentSelections;
            }

            if (existingSelection) {
                return currentSelections.map(function (currentSelection) {
                    if (
                        currentSelection.matchId === selection.matchId &&
                        currentSelection.market.trim().toLowerCase() ===
                            normalizedMarket
                    ) {
                        return selection;
                    }

                    return currentSelection;
                });
            }

            return [...currentSelections, selection];
        });
    }

    function removeSelection(selectionId: number) {
        setSelections(function (currentSelections) {
            return currentSelections.filter(function (selection) {
                return selection.selectionId !== selectionId;
            });
        });
    }

    return (
        <BetSlipContext.Provider
            value={{
                selections,
                setSelections,
                addSelection,
                removeSelection,
                stake,
                setStake,
            }}
        >
            {children}
        </BetSlipContext.Provider>
    );
}

export default BetSlipContext;
export { BetSlipProvider };