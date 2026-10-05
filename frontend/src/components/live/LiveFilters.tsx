import { CircleDot, Trophy } from "lucide-react";

function LiveFilters() {
    return (
        <div className="mt-7 flex items-center gap-3">
            <button className="h-10 rounded-full bg-primary px-6 text-sm font-semibold text-[#07100b]">
                All
            </button>

            <button className="flex h-10 items-center gap-2 rounded-full bg-[#142438] px-5 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#1a2d43] hover:text-white">
                <CircleDot
                    size={15}
                    strokeWidth={1.8}
                />
                Cricket
            </button>

            <button className="flex h-10 items-center gap-2 rounded-full bg-[#142438] px-5 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#1a2d43] hover:text-white">
                <Trophy
                    size={15}
                    strokeWidth={1.8}
                />
                Football
            </button>
        </div>
    );
}

export default LiveFilters;