type BetDetailsProps = {
    market: string;
    selection: string;
    odds: string;
    stake: string;
    payout: string;
    status: "pending" | "won" | "lost";
};

function BetDetails({
    market,
    selection,
    odds,
    stake,
    payout,
    status
}: BetDetailsProps) {
    return (
        <>
            {/* Market */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-[#8c9aaa]">
                        {market}
                    </p>

                    <p className="mt-1 text-base font-semibold text-white">
                        {selection}
                    </p>
                </div>

                <p className="text-base font-semibold text-[#35bfff]">
                    @ {odds}
                </p>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-[#1d2d3c]" />

            {/* Stake and Payout */}
            <div className="grid grid-cols-2">
                <div>
                    <p className="text-sm text-[#8c9aaa]">
                        Stake
                    </p>

                    <p className="mt-1 text-base font-semibold text-white">
                        {stake}
                    </p>
                </div>

                <div className="border-l border-[#293b4b] pl-6">
                    <p className="text-sm text-[#8c9aaa]">
                        {status === "pending"
                            ? "Potential Payout"
                            : "Payout"}
                    </p>

                    <p className="mt-1 text-base font-semibold text-white">
                        {payout}
                    </p>
                </div>
            </div>
        </>
    );
}

export default BetDetails;