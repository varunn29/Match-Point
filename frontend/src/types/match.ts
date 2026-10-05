export type Match = {
    id: number;
    sport: string;
    league: string;
    team1: string;
    team2: string;
    status: string;
    score1?: number;
    score2?: number;
    minute?: string;
    date?: string;
    time?: string;
    odds: {
        team1: string;
        draw: string;
        team2: string;
    };
};