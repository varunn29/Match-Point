function MarketTabs() {
    return (
        <div className="mt-3 flex h-12 items-end border-b border-[#1d2930]">

            <button className="relative h-full px-4 text-sm font-semibold text-white">

                Main Markets

                <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-primary" />

            </button>

            <button className="h-full px-4 text-sm font-medium text-[#8c9aaa] transition-colors hover:text-white">
                Goals
            </button>

            <button className="h-full px-4 text-sm font-medium text-[#8c9aaa] transition-colors hover:text-white">
                Halves
            </button>

            <button className="h-full px-4 text-sm font-medium text-[#8c9aaa] transition-colors hover:text-white">
                Corners
            </button>

            <button className="h-full px-4 text-sm font-medium text-[#8c9aaa] transition-colors hover:text-white">
                Cards
            </button>

            <button className="h-full px-4 text-sm font-medium text-[#8c9aaa] transition-colors hover:text-white">
                Specials
            </button>

        </div>
    );
}

export default MarketTabs;