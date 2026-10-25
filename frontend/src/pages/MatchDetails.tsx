import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    CircleDot,
    Goal,
    Shield,
    Trophy,
    Target,
    Flag,
    Layers,
} from "lucide-react";

import MatchHeader from "../components/match-details/MatchHeader";
import MarketSection from "../components/match-details/MarketSection";
import MarketSelection from "../components/match-details/MarketSelection";
import OtherMarkets from "../components/match-details/OtherMarkets";
import type { Match } from "../types/match";
import API_BASE_URL from "../api/config";

function MatchDetails() {
    const { matchId: matchIdParam } = useParams();
    const matchId = Number(matchIdParam);

    const [match, setMatch] = useState<Match | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(function () {
        let isActive = true;

        async function fetchMatch() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `${API_BASE_URL}/api/matches`
                );

                if (!response.ok) {
                    throw new Error("Could not fetch matches.");
                }

                const data: { matches: Match[] } = await response.json();

                const selectedMatch = data.matches.find(function (item) {
                    return item.id === matchId;
                });

                if (!selectedMatch) {
                    throw new Error("Match not found.");
                }

                if (isActive) {
                    setMatch(selectedMatch);
                }
            } catch (error) {
                console.error("Fetch match details error:", error);

                if (isActive) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Could not load match details."
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }

        if (Number.isInteger(matchId) && matchId > 0) {
            fetchMatch();
        } else {
            setError("Invalid match ID.");
            setIsLoading(false);
        }

        return function () {
            isActive = false;
        };
    }, [matchId]);

    if (isLoading) {
        return (
            <div className="px-6 py-12 text-center text-[#8c9aaa]">
                Loading match details...
            </div>
        );
    }

    if (error || !match) {
        return (
            <div className="px-6 py-12 text-center">
                <p className="text-red-400">
                    {error || "Could not find this match."}
                </p>
                <button
                    type="button"
                    onClick={function () {
                        window.location.href = "/home";
                    }}
                    className="mt-4 rounded-md border border-[#263340] px-4 py-2 text-sm text-white hover:bg-[#101a25]"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const matchName = `${match.team1} vs ${match.team2}`;
    const isFootball = match.sport === "Football";

    return (
        <div className="px-6 py-6">
            <MatchHeader match={match} />

            <div className="mt-4 space-y-3">
                <MarketSection
                    matchId={match.id}
                    matchName={matchName}
                    title="Match Winner"
                    icon={<Trophy size={17} strokeWidth={1.8} />}
                >
                    <MarketSelection
                        selectionId={match.id * 100 + 1}
                        matchId={match.id}
                        matchName={matchName}
                        market="Match Winner"
                        label={match.team1}
                        odds={Number(match.odds.team1) || 1.85}
                    />

                    {isFootball && (
                        <MarketSelection
                            selectionId={match.id * 100 + 2}
                            matchId={match.id}
                            matchName={matchName}
                            market="Match Winner"
                            label="Draw"
                            odds={Number(match.odds.draw) || 3.6}
                        />
                    )}

                    <MarketSelection
                        selectionId={match.id * 100 + 3}
                        matchId={match.id}
                        matchName={matchName}
                        market="Match Winner"
                        label={match.team2}
                        odds={Number(match.odds.team2) || 2.05}
                    />
                </MarketSection>

                {isFootball && (
                    <>
                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Both Teams to Score"
                            icon={<Goal size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 21}
                                matchId={match.id}
                                matchName={matchName}
                                market="Both Teams to Score"
                                label="Yes"
                                odds={1.65}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 22}
                                matchId={match.id}
                                matchName={matchName}
                                market="Both Teams to Score"
                                label="No"
                                odds={2.1}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Total Goals"
                            icon={<CircleDot size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 31}
                                matchId={match.id}
                                matchName={matchName}
                                market="Total Goals"
                                label="Over 2.5"
                                odds={1.8}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 32}
                                matchId={match.id}
                                matchName={matchName}
                                market="Total Goals"
                                label="Under 2.5"
                                odds={2.0}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Asian Handicap"
                            icon={<Shield size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 41}
                                matchId={match.id}
                                matchName={matchName}
                                market="Asian Handicap"
                                label={`${match.team1} -0.5`}
                                odds={2.05}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 42}
                                matchId={match.id}
                                matchName={matchName}
                                market="Asian Handicap"
                                label={`${match.team2} +0.5`}
                                odds={1.75}
                            />
                        </MarketSection>

                        <OtherMarkets
                            matchId={match.id}
                            matchName={matchName}
                            team1={match.team1}
                            team2={match.team2}
                        />
                    </>
                )}

                {!isFootball && (
                    <>
                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Total Match Runs"
                            icon={<Target size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 11}
                                matchId={match.id}
                                matchName={matchName}
                                market="Total Match Runs"
                                label="Over 300.5"
                                odds={1.9}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 12}
                                matchId={match.id}
                                matchName={matchName}
                                market="Total Match Runs"
                                label="Under 300.5"
                                odds={1.9}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title={`${match.team1} - Team Runs`}
                            icon={<Goal size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 21}
                                matchId={match.id}
                                matchName={matchName}
                                market={`${match.team1} Team Runs`}
                                label="Over 150.5"
                                odds={1.85}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 22}
                                matchId={match.id}
                                matchName={matchName}
                                market={`${match.team1} Team Runs`}
                                label="Under 150.5"
                                odds={1.95}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title={`${match.team2} - Team Runs`}
                            icon={<Goal size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 31}
                                matchId={match.id}
                                matchName={matchName}
                                market={`${match.team2} Team Runs`}
                                label="Over 150.5"
                                odds={1.85}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 32}
                                matchId={match.id}
                                matchName={matchName}
                                market={`${match.team2} Team Runs`}
                                label="Under 150.5"
                                odds={1.95}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Total Wickets"
                            icon={<Shield size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 41}
                                matchId={match.id}
                                matchName={matchName}
                                market="Total Wickets"
                                label="Over 12.5"
                                odds={1.9}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 42}
                                matchId={match.id}
                                matchName={matchName}
                                market="Total Wickets"
                                label="Under 12.5"
                                odds={1.9}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Highest Scoring Innings"
                            icon={<Layers size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 51}
                                matchId={match.id}
                                matchName={matchName}
                                market="Highest Scoring Innings"
                                label="1st Innings"
                                odds={1.9}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 52}
                                matchId={match.id}
                                matchName={matchName}
                                market="Highest Scoring Innings"
                                label="2nd Innings"
                                odds={1.9}
                            />
                        </MarketSection>

                        <MarketSection
                            matchId={match.id}
                            matchName={matchName}
                            title="Toss Winner"
                            icon={<Flag size={17} strokeWidth={1.8} />}
                        >
                            <MarketSelection
                                selectionId={match.id * 100 + 61}
                                matchId={match.id}
                                matchName={matchName}
                                market="Toss Winner"
                                label={match.team1}
                                odds={1.9}
                            />
                            <MarketSelection
                                selectionId={match.id * 100 + 62}
                                matchId={match.id}
                                matchName={matchName}
                                market="Toss Winner"
                                label={match.team2}
                                odds={1.9}
                            />
                        </MarketSection>
                    </>
                )}
            </div>
        </div>
    );
}

export default MatchDetails;