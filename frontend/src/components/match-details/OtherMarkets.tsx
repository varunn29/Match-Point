import { ChevronDown, SlidersHorizontal } from "lucide-react";

function OtherMarkets() {
    return (
        <section className="mt-4">

            <div className="flex items-center gap-3 px-1">

                <SlidersHorizontal
                    size={19}
                    strokeWidth={1.8}
                    className="text-[#c1cad5]"
                />

                <h2 className="text-sm font-semibold text-white">
                    Other Markets
                </h2>

            </div>

            <div className="mt-2 overflow-hidden rounded-xl border border-[#1d2930] bg-[#0b131c]">

                <button className="flex h-10 w-full items-center justify-between border-b border-[#1d2930] px-4 text-left text-xs text-[#c1cad5] transition-colors hover:bg-[#101a25]">
                    <span>Next Goal</span>
                    <ChevronDown size={16} />
                </button>

                <button className="flex h-10 w-full items-center justify-between border-b border-[#1d2930] px-4 text-left text-xs text-[#c1cad5] transition-colors hover:bg-[#101a25]">
                    <span>Correct Score</span>
                    <ChevronDown size={16} />
                </button>

                <button className="flex h-10 w-full items-center justify-between border-b border-[#1d2930] px-4 text-left text-xs text-[#c1cad5] transition-colors hover:bg-[#101a25]">
                    <span>Double Chance</span>
                    <ChevronDown size={16} />
                </button>

                <button className="flex h-10 w-full items-center justify-between px-4 text-left text-xs text-[#c1cad5] transition-colors hover:bg-[#101a25]">
                    <span>Total Corners</span>
                    <ChevronDown size={16} />
                </button>

            </div>

        </section>
    );
}

export default OtherMarkets;