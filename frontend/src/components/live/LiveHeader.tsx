import { Flame } from "lucide-react";

function LiveHeader() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#30191e]">
                <Flame
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#ef233c]"
                />
            </div>

            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    Live Matches
                </h1>

                <p className="mt-1 text-sm text-[#718096]">
                    Matches happening right now.
                </p>
            </div>
        </div>
    );
}

export default LiveHeader;