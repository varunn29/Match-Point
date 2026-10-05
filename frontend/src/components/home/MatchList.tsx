import type { Match } from "../../types/match";
import MatchCard from "./MatchCard";

type MatchListProps = {
  liveMatches: Match[];
  upcomingMatches: Match[];
};

function MatchList({ liveMatches, upcomingMatches }: MatchListProps) {
  return (
    <div>
      {/* Live Matches */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            <span className="mr-2 text-[#ef233c]">●</span>
            Live Matches
          </h2>

          <button className="text-xs font-medium text-[#8c9aaa] transition-colors hover:text-white">
            View All →
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {liveMatches.map(function (match) {
            return <MatchCard key={match.id} match={match} />;
          })}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Upcoming Matches</h2>

          <button className="text-xs font-medium text-[#8c9aaa] transition-colors hover:text-white">
            View All →
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {upcomingMatches.map(function (match) {
            return <MatchCard key={match.id} match={match} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default MatchList;
