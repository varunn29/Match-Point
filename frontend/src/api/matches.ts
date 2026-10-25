import API_BASE_URL from "./config";

export async function getMatches() {
    const response = await fetch(`${API_BASE_URL}/api/matches`);

    if (!response.ok) {
        throw new Error("Failed to fetch matches");
    }

    return response.json();
}