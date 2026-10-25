import type { Bet } from "./BetCard";

type BetSummaryProps = {
    bets: Bet[];
};

function BetSummary({ bets }: BetSummaryProps) {
    const pendingCount = bets.filter(function (bet) {
        return bet.status === "pending";
    }).length;

    const wonCount = bets.filter(function (bet) {
        return bet.status === "won";
    }).length;

    const lostCount = bets.filter(function (bet) {
        return bet.status === "lost";
    }).length;

    const voidCount = bets.filter(function (bet) {
        return bet.status === "void";
    }).length;

    const summaryCards = [
        {
            label: "Total Bets",
            value: bets.length,
            description: "All recorded bets",
            valueClass: "text-white",
        },
        {
            label: "Pending",
            value: pendingCount,
            description: "Awaiting result",
            valueClass: "text-[#b9d2ea]",
        },
        {
            label: "Won",
            value: wonCount,
            description: "Winning bets",
            valueClass: "text-[#18d89b]",
        },
        {
            label: "Lost",
            value: lostCount,
            description: "Losing bets",
            valueClass: "text-[#ff6570]",
        },
        {
            label: "Void",
            value: voidCount,
            description: "Cancelled bets",
            valueClass: "text-[#cbd5e1]",
        },
    ];

    return (
        <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-5">
            {summaryCards.map(function (card) {
                return (
                    <div
                        key={card.label}
                        className="rounded-xl border border-[#24384a] bg-[#091521] px-4 py-4"
                    >
                        <p className="text-sm text-[#9aaec2]">
                            {card.label}
                        </p>

                        <p
                            className={`mt-2 text-2xl font-bold tabular-nums ${card.valueClass}`}
                        >
                            {card.value}
                        </p>

                        <p className="mt-1 text-xs text-[#718096]">
                            {card.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default BetSummary;