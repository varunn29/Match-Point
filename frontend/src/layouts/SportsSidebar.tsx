import { Search } from "lucide-react";

function SportsSidebar() {
    return (
        <aside className="w-[296px] shrink-0 border-r border-[#1d2930] bg-[#070d13] px-6 py-6">

            {/* Search */}
            <div className="relative mb-6">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]"
                    size={17}
                    strokeWidth={2}
                />

                <input
                    type="text"
                    placeholder="Search sports, teams, leagues..."
                    className="h-10 w-full rounded-full border border-[#1d2930] bg-[#0b131c] pl-11 pr-4 text-white outline-none placeholder:text-[#718096] focus:border-[#18d89b]"
                />
            </div>

            {/* Sports */}
            <section>
                <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-[#8c9aaa]">
                    Sports
                </p>

                <div className="">

                    {/* All Sports */}
                    <button className="flex h-11 w-full items-center rounded-lg px-3 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#0d171f] hover:text-white">
                        <span className="ml-3 flex-1 text-left">
                            All Sports
                        </span>

                        <span className="text-xs text-[#718096]">
                            2
                        </span>
                    </button>

                    {/* Cricket */}
                    <button className="flex h-11 w-full items-center rounded-lg px-3 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#0d171f] hover:text-white">
                        <span className="ml-3 flex-1 text-left">
                            Cricket
                        </span>

                        <span className="text-xs text-[#718096]">
                            1
                        </span>
                    </button>

                    {/* Football */}
                    <button className="flex h-11 w-full items-center rounded-lg px-3 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#0d171f] hover:text-white">
                        <span className="ml-3 flex-1 text-left">
                            Football
                        </span>

                        <span className="text-xs text-[#718096]">
                            1
                        </span>
                    </button>

                </div>
            </section>

            {/* Live */}
            <section className="mt-4">
                <div className="mb-3 px-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#8c9aaa]">
                        Live Events
                    </p>
                </div>

                <button className="flex h-11 w-full items-center rounded-lg px-3 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#0d171f] hover:text-white">
                    <span className="ml-3 flex-1 text-left">
                        Live
                    </span>

                    <span className="text-xs text-[#718096]">
                        1
                    </span>
                </button>
            </section>

            {/* Upcoming */}
            <section className="mt-4">
                <div className="mb-3 px-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#8c9aaa]">
                        Upcoming Events
                    </p>
                </div>

                <button className="flex h-11 w-full items-center rounded-lg px-3 text-sm font-medium text-[#c1cad5] transition-colors hover:bg-[#0d171f] hover:text-white">
                    <span className="ml-3 flex-1 text-left">
                        Upcoming
                    </span>

                    <span className="text-xs text-[#718096]">
                        1
                    </span>
                </button>

                {/* Promotional Banner */}
                <div className="mt-5 overflow-hidden rounded-xl border border-[#1d2930]">
                    <img
                        src="/match-point-sidebar-icon.png"
                        alt="Bigger Matches. Bigger Thrills."
                        className="block h-[190px] w-full object-contain"
                    />
                </div>
            </section>

        </aside>
    );
}

export default SportsSidebar;