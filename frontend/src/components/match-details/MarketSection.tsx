import type { ReactNode } from "react";

type MarketSectionProps = {
    matchId: number;
    matchName: string;
    title: string;
    icon: ReactNode;
    children: ReactNode;
};

function MarketSection({
    matchId,
    matchName,
    title,
    icon,
    children
}: MarketSectionProps) {
    return (
        <section className="mt-2 rounded-xl border border-[#1d2930] bg-[#0b131c] p-3">

            <div className="flex items-center gap-3 px-1">

                <span className="text-[#c1cad5]">
                    {icon}
                </span>

                <h2 className="text-sm font-semibold text-white">
                    {title}
                </h2>

            </div>

            {title === "Match Winner" 
            ? <div className="mt-3 grid grid-cols-3 gap-2">
                {children}
            </div>
            : <div className="mt-3 grid grid-cols-2 gap-2">
                {children}
            </div>
            }

        </section>
    );
}

export default MarketSection;