import { useContext, useEffect, useState } from "react";
import HeroCarousel from "../components/home/HeroCarousel";
import MatchList from "../components/home/MatchList";
import FilterContext from "../context/FilterContext";
import type { Match } from "../types/match";
import API_BASE_URL from "../api/config";

function Home() {
    const context = useContext(FilterContext);

    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sport = context?.sport;
    const status = context?.status;

    useEffect(function () {
        async function fetchMatches() {
            try {
                setIsLoading(true);
                setError(null);

                const queryParams = new URLSearchParams();

                if (sport && sport !== "all") {
                    queryParams.set("sport", sport);
                }

                if (status && status !== "all") {
                    queryParams.set("status", status);
                }

                const queryString = queryParams.toString();

                const url = queryString
                    ? `${API_BASE_URL}/api/matches?${queryString}`
                    : `${API_BASE_URL}/api/matches`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Could not fetch matches.");
                }

                const data = await response.json();

                setMatches(data.matches);
            } catch (error) {
                console.error("Fetch matches error:", error);

                setError("Could not load matches. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        if (context !== null) {
            fetchMatches();
        }
    }, [sport, status, context]);

    if (context === null) {
        return null;
    }

    const liveMatches = matches.filter(function (match) {
        return match.status === "Live";
    });

    const upcomingMatches = matches.filter(function (match) {
        return match.status === "Upcoming";
    });

    return (
        <div className="px-6 py-6">
            <HeroCarousel />

            <div className="mt-6">
                {isLoading ? (
                    <p className="py-12 text-center text-[#8c9aaa]">
                        Loading matches...
                    </p>
                ) : error ? (
                    <p className="py-12 text-center text-red-400">
                        {error}
                    </p>
                ) : (
                    <MatchList
                        liveMatches={liveMatches}
                        upcomingMatches={upcomingMatches}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;