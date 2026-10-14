import { Search } from "lucide-react";
import MatchCard from "./MatchCard";
import type { Match } from "../../types/match";

type MatchListProps = {
    liveMatches: Match[];
    upcomingMatches: Match[];
};

function MatchList({
    liveMatches,
    upcomingMatches
}: MatchListProps) {
    const hasMatches =
        liveMatches.length > 0 || upcomingMatches.length > 0;

    if (!hasMatches) {
        return (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#1d2930] bg-[#0b131c] px-6 py-12 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#1d2930] bg-[#101b25]">
                    <Search
                        size={25}
                        strokeWidth={1.7}
                        className="text-[#18d89b]"
                    />
                </div>

                <h2 className="text-lg font-semibold text-white">
                    No matches found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#8c9aaa]">
                    There are no matches available for your selected
                    filters right now. Try changing your sport or
                    event status to explore other matches.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Live Matches */}
            {liveMatches.length > 0 && (
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        Live Matches
                    </h2>

                    <div className="space-y-4">
                        {liveMatches.map(function (match) {
                            return (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                />
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Upcoming Matches */}
            {upcomingMatches.length > 0 && (
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-white">
                        Upcoming Matches
                    </h2>

                    <div className="space-y-4">
                        {upcomingMatches.map(function (match) {
                            return (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                />
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MatchList;