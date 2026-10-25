import { useState } from "react";
import { Info } from "lucide-react";
import FeatureNotice from "./FeatureNotice";

function WalletActions() {
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState("Quick Add");

    function handleQuickAdd(amount: number) {
        setSelectedFeature(`Quick Add ₹${amount.toLocaleString("en-IN")}`);
        setIsNoticeOpen(true);
    }

    return (
        <>
            <div className="flex min-w-0 items-center">
                {/* Divider */}

                <div className="mx-15 h-32 w-px shrink-0 bg-[#263340]" />

                {/* Quick Add */}

                <div className="w-[260px] shrink-0">
                    <p className="text-sm font-semibold text-white">
                        Quick Add
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {[500, 1000, 2000, 5000, 10000].map(function (amount) {
                            return (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={function () {
                                        handleQuickAdd(amount);
                                    }}
                                    className="h-10 rounded-lg border border-[#243342] bg-[#101a25] text-xs font-semibold text-[#c1cad5] transition-colors hover:border-primary hover:text-white"
                                >
                                    ₹{amount.toLocaleString("en-IN")}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 flex items-start gap-2">
                        <Info
                            size={15}
                            strokeWidth={1.8}
                            className="mt-0.5 shrink-0 text-[#718096]"
                        />

                        <p className="text-xs leading-5 text-[#718096]">
                            This is a simulated wallet. No real payments are
                            processed.
                        </p>
                    </div>
                </div>
            </div>

            <FeatureNotice
                isOpen={isNoticeOpen}
                onClose={function () {
                    setIsNoticeOpen(false);
                }}
                featureName={selectedFeature}
            />
        </>
    );
}

export default WalletActions;