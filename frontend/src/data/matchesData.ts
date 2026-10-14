
import type { Match } from "../types/match";

export const liveMatches: Match[] = [
    {
        id: 1,
        sport: "Football",
        league: "Premier League",
        team1: "Manchester City",
        team2: "Liverpool",
        status: "Live",
        score1: 1,
        score2: 1,
        minute: "68'",
        odds: {
            team1: "1.85",
            draw: "3.60",
            team2: "4.20",
        },
    },
];

export const upcomingMatches: Match[] = [
    {
        id: 2,
        sport: "Cricket",
        league: "T20I",
        team1: "India",
        team2: "Australia",
        status: "Upcoming",
        date: "28 Sep",
        time: "7:30 PM",
        odds: {
            team1: "1.80",
            draw: "-",
            team2: "2.05",
        },
    },
    {
        id: 3,
        sport: "Football",
        league: "UEFA Champions League",
        team1: "Real Madrid",
        team2: "Barcelona",
        status: "Upcoming",
        date: "30 Sep",
        time: "10:00 PM",
        odds: {
            team1: "1.95",
            draw: "3.40",
            team2: "3.60",
        },
    },
    {
        id: 4,
        sport: "Cricket",
        league: "ODI",
        team1: "England",
        team2: "New Zealand",
        status: "Upcoming",
        date: "02 Oct",
        time: "2:30 PM",
        odds: {
            team1: "1.75",
            draw: "-",
            team2: "2.20",
        },
    },
];

export const allMatches: Match[] = [
    ...liveMatches,
    ...upcomingMatches,
];
