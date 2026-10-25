import { useEffect, useState } from "react";
import BetCard, { type Bet } from "../components/my-bets/BetCard";
import BetStatusTabs, {
    type BetFilter,
} from "../components/my-bets/BetStatusTabs";
import BetSummary from "../components/my-bets/BetSummary";
import API_BASE_URL from "../api/config";

function MyBets() {
    const [activeTab, setActiveTab] = useState<BetFilter>("all");
    const [bets, setBets] = useState<Bet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(function () {
        async function fetchMyBets() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/bets/my-bets`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setErrorMessage(
                        data.message || "Unable to load your bets."
                    );
                    return;
                }

                setBets(data.bets);
            } catch {
                setErrorMessage("Could not connect to the server.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchMyBets();
    }, []);

    const filteredBets = bets.filter(function (bet) {
        return activeTab === "all" || bet.status === activeTab;
    });

    return (
        <div className="px-6 py-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    My Bets
                </h1>

                <p className="mt-1 text-base text-[#9aaec2]">
                    Track your bets and view their status.
                </p>
            </div>

            {!isLoading && !errorMessage && (
                <>
                    <BetSummary bets={bets} />

                    <BetStatusTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </>
            )}

            <div className="mt-5 space-y-4">
                {isLoading ? (
                    <p className="py-10 text-center text-[#9aaec2]">
                        Loading your bets...
                    </p>
                ) : errorMessage ? (
                    <div className="rounded-xl border border-red-500/30 bg-[#091521] px-6 py-8 text-center">
                        <p className="font-semibold text-white">
                            Unable to load bets
                        </p>

                        <p className="mt-2 text-sm text-[#9aaec2]">
                            {errorMessage}
                        </p>
                    </div>
                ) : filteredBets.length > 0 ? (
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
                            {bets.length === 0
                                ? "You haven't placed any bets yet."
                                : `No ${activeTab} bets`}
                        </p>

                        <p className="mt-2 text-sm text-[#9aaec2]">
                            Your bets will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBets;