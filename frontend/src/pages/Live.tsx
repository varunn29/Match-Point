import LiveFilters from "../components/live/LiveFilters";
import LiveHeader from "../components/live/LiveHeader";
import LiveMatchCard, {
    type LiveMatch
} from "../components/live/LiveMatchCard";

const liveMatches: LiveMatch[] = [
    {
        id: 1,
        sport: "football",
        league: "Premier League",
        team1: "Manchester City",
        team2: "Liverpool",
        team1Logo: "MC",
        team2Logo: "LIV",
        score1: "1",
        score2: "1",
        matchTime: "68'",
        market: "Match Winner",
        odds: [
            {
                label: "Manchester City",
                value: "1.85"
            },
            {
                label: "Draw",
                value: "3.60"
            },
            {
                label: "Liverpool",
                value: "4.20"
            }
        ]
    },
    {
        id: 2,
        sport: "cricket",
        league: "T20 International",
        team1: "India",
        team2: "Australia",
        team1Logo: "IND",
        team2Logo: "AUS",
        score1: "112/3",
        score2: "—",
        matchTime: "14.2 overs",
        market: "Match Winner",
        odds: [
            {
                label: "India",
                value: "1.65"
            },
            {
                label: "Australia",
                value: "2.20"
            }
        ]
    },
    {
        id: 3,
        sport: "football",
        league: "La Liga",
        team1: "Real Madrid",
        team2: "Barcelona",
        team1Logo: "RM",
        team2Logo: "BAR",
        score1: "2",
        score2: "1",
        matchTime: "72'",
        market: "Match Winner",
        odds: [
            {
                label: "Real Madrid",
                value: "1.55"
            },
            {
                label: "Draw",
                value: "4.10"
            },
            {
                label: "Barcelona",
                value: "4.80"
            }
        ]
    },
    {
        id: 4,
        sport: "cricket",
        league: "ODI",
        team1: "England",
        team2: "New Zealand",
        team1Logo: "ENG",
        team2Logo: "NZ",
        score1: "178/4",
        score2: "—",
        matchTime: "32.4 overs",
        market: "Match Winner",
        odds: [
            {
                label: "England",
                value: "1.72"
            },
            {
                label: "New Zealand",
                value: "2.10"
            }
        ]
    }
];

function Live() {
    return (
        <div className="px-6 py-6">
            <LiveHeader />

            <LiveFilters />

            <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ef233c]" />

                <p className="text-sm font-medium text-[#9aaec2]">
                    {liveMatches.length} matches live now
                </p>
            </div>

            <div className="mt-4 space-y-4">
                {liveMatches.map(function (match) {
                    return (
                        <LiveMatchCard
                            key={match.id}
                            match={match}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Live;