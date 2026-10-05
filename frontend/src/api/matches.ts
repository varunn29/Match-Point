import type { Match } from "../types/match";

export async function getMatches(): Promise<Match[]> {
    const response = await fetch("http://localhost:5000/api/matches");

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch matches");
    }

    return data;
}