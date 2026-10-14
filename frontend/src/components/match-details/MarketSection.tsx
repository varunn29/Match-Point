import type { ReactNode } from "react";

type MarketSectionProps = {
    matchId: number;
    matchName: string;
    title: string;
    icon: ReactNode;
    children: ReactNode;
};

function MarketSection({
    title,
    icon,
    children,
}: MarketSectionProps) {
    const sectionId = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return (
        <section
            id={`market-${sectionId}`}
            data-market-section={sectionId}
            className="mt-2 scroll-mt-4 rounded-xl border border-[#1d2930] bg-[#0b131c] p-3"
        >
            <div className="flex items-center gap-3 px-1">
                <span className="text-[#c1cad5]">
                    {icon}
                </span>

                <h2 className="text-sm font-semibold text-white">
                    {title}
                </h2>
            </div>

            <div className="mt-3 grid gap-2 grid-cols-2">
                {children}
            </div>
        </section>
    );
}

export default MarketSection;