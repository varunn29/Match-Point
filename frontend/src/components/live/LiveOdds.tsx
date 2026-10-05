import { Goal } from "lucide-react";

type LiveOdd = {
    label: string;
    value: string;
};

type LiveOddsProps = {
    market: string;
    odds: LiveOdd[];
};

function LiveOdds({
    market,
    odds
}: LiveOddsProps) {
    return (
        <div className="mt-6 border-t border-[#1d2d3c] pt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Goal
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#8c9aaa]"
                    />

                    <p className="text-xs font-semibold text-[#c1cad5]">
                        {market}
                    </p>
                </div>

                <span className="text-[11px] text-[#718096]">
                    Live Odds
                </span>
            </div>

            <div
                className={`mt-3 grid gap-2 ${
                    odds.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-2"
                }`}
            >
                {odds.map(function (odd) {
                    return (
                        <button
                            key={odd.label}
                            className="min-w-0 rounded-lg border border-[#24384a] bg-[#101d2b] px-3 py-3 text-center transition-colors hover:border-primary"
                        >
                            <span className="block truncate text-xs text-[#9aaec2]">
                                {odd.label}
                            </span>

                            <span className="mt-1 block text-sm font-bold text-primary">
                                {odd.value}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default LiveOdds;