
import { useState } from "react";
import type { MarketCategory } from "./OtherMarkets";

const tabs: {
    label: string;
    category: MarketCategory | null;
    target: string;
}[] = [
    {
        label: "Main Markets",
        category: null,
        target: "market-match-winner",
    },
    {
        label: "Goals",
        category: "Goals",
        target: "market-category-goals",
    },
    {
        label: "Halves",
        category: "Halves",
        target: "market-category-halves",
    },
    {
        label: "Corners",
        category: "Corners",
        target: "market-category-corners",
    },
    {
        label: "Cards",
        category: "Cards",
        target: "market-category-cards",
    },
    {
        label: "Specials",
        category: "Specials",
        target: "market-category-specials",
    },
];

type MarketTabsProps = {
    onCategorySelect: (category: MarketCategory | null) => void;
};

function MarketTabs({ onCategorySelect }: MarketTabsProps) {
    const [activeTab, setActiveTab] = useState("Main Markets");

    function handleTabClick(
        label: string,
        category: MarketCategory | null,
        targetId: string
    ) {
        setActiveTab(label);
        onCategorySelect(category);

        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    return (
        <div className="mt-3 flex h-12 items-end gap-1 overflow-x-auto border-b border-[#1d2930]">
            {tabs.map(function (tab) {
                const isActive = activeTab === tab.label;

                return (
                    <button
                        key={tab.label}
                        type="button"
                        onClick={function () {
                            handleTabClick(
                                tab.label,
                                tab.category,
                                tab.target
                            );
                        }}
                        className={`relative h-full shrink-0 px-4 text-sm transition-colors ${
                            isActive
                                ? "font-semibold text-white"
                                : "font-medium text-[#8c9aaa] hover:text-white"
                        }`}
                    >
                        {tab.label}

                        {isActive && (
                            <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-primary" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default MarketTabs;
