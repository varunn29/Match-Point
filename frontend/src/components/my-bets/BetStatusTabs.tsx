
import type { BetStatus } from "./BetCard";

export type BetFilter = "all" | BetStatus;

type BetStatusTabsProps = {
    activeTab: BetFilter;
    onTabChange: (tab: BetFilter) => void;
};

function BetStatusTabs({ activeTab, onTabChange }: BetStatusTabsProps) {
    const tabs: { label: string; value: BetFilter }[] = [
        { label: "All Bets", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
    ];

    return (
        <div className="mt-7 flex flex-wrap items-center gap-3">
            {tabs.map(function (tab) {
                const isActive = tab.value === activeTab;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={function () {
                            onTabChange(tab.value);
                        }}
                        aria-pressed={isActive}
                        className={`h-10 rounded-full px-6 text-sm font-medium transition-colors ${
                            isActive
                                ? "bg-primary font-semibold text-[#07100b]"
                                : "bg-[#142438] text-[#c1cad5] hover:bg-[#1a2d43] hover:text-white"
                        }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

export default BetStatusTabs;
