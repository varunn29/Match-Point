import { useState } from "react";
import BetCard, { type Bet } from "../components/my-bets/BetCard";
import BetStatusTabs, {
    type BetFilter,
} from "../components/my-bets/BetStatusTabs";
import BetSummary from "../components/my-bets/BetSummary";

const bets: Bet[] = [
    {
        id: 1,
        matchId: 1,
        team1: "Manchester City",
        team2: "Liverpool",
        team1Logo: "MC",
        team2Logo: "LIV",
        sport: "football",
        league: "Premier League",
        date: "12 Oct 2025",
        time: "15:30",
        status: "pending",
        market: "Match Winner",
        selection: "Manchester City",
        odds: "1.85",
        stake: "₹100",
        payout: "₹185",
    },
    {
        id: 2,
        matchId: 2,
        team1: "India",
        team2: "Australia",
        team1Logo: "IND",
        team2Logo: "AUS",
        sport: "cricket",
        league: "T20I",
        date: "28 Sep 2025",
        time: "19:30",
        status: "won",
        market: "Match Winner",
        selection: "India",
        odds: "1.80",
        stake: "₹200",
        payout: "₹360",
    },
    {
        id: 3,
        matchId: 3,
        team1: "Real Madrid",
        team2: "Barcelona",
        team1Logo: "RM",
        team2Logo: "BAR",
        sport: "football",
        league: "La Liga",
        date: "20 Sep 2025",
        time: "21:00",
        status: "lost",
        market: "Match Winner",
        selection: "Barcelona",
        odds: "2.45",
        stake: "₹150",
        payout: "₹0",
    },
];

function MyBets() {
    const [activeTab, setActiveTab] = useState<BetFilter>("all");

    const filteredBets = bets.filter(function (bet) {
        return activeTab === "all" || bet.status === activeTab;
    });

    return (
        <div className="px-6 py-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    My Bets
                </h1>

                <p className="mt-1 text-base text-[#9aaec2]">
                    Track your bets and view their status.
                </p>
            </div>

            {/* Bet Summary */}
            <BetSummary bets={bets} />

            {/* Status Tabs */}
            <BetStatusTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Bet Cards */}
            <div className="mt-5 space-y-4">
                {filteredBets.length > 0 ? (
                    filteredBets.map(function (bet) {
                        return (
                            <BetCard
                                key={bet.id}
                                bet={bet}
                            />
                        );
                    })
                ) : (
                    <div className="rounded-xl border border-[#24384a] bg-[#091521] px-6 py-12 text-center">
                        <p className="font-semibold text-white">
                            No {activeTab} bets
                        </p>

                        <p className="mt-2 text-sm text-[#9aaec2]">
                            Bets with this status will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBets;