type BetStatusTabsProps = {
    activeTab: string;
};

function BetStatusTabs({ activeTab }: BetStatusTabsProps) {
    const tabs = [
        "All Bets",
        "Pending",
        "Won",
        "Lost"
    ];

    return (
        <div className="mt-7 flex items-center gap-3">
            {tabs.map(function (tab) {
                const isActive = tab === activeTab;

                return (
                    <button
                        key={tab}
                        className={`h-10 rounded-full px-6 text-sm font-medium transition-colors ${
                            isActive
                                ? "bg-primary font-semibold text-[#07100b]"
                                : "bg-[#142438] text-[#c1cad5] hover:bg-[#1a2d43] hover:text-white"
                        }`}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}

export default BetStatusTabs;