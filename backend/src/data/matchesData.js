function buildFootballMarkets(match) {
    const team1 = match.team1;
    const team2 = match.team2;

    return [
        {
            name: "Match Winner",
            outcomes: [
                { label: team1, odds: Number(match.odds.team1) },
                { label: "Draw", odds: Number(match.odds.draw) },
                { label: team2, odds: Number(match.odds.team2) }
            ]
        },
        {
            name: "Both Teams to Score",
            outcomes: [
                { label: "Yes", odds: 1.65 },
                { label: "No", odds: 2.10 }
            ]
        },
        {
            name: "Total Goals",
            outcomes: [
                { label: "Over 2.5", odds: 1.80 },
                { label: "Under 2.5", odds: 2.00 }
            ]
        },
        {
            name: "Asian Handicap",
            outcomes: [
                { label: `${team1} -0.5`, odds: 2.05 },
                { label: `${team2} +0.5`, odds: 1.75 }
            ]
        },
        {
            name: "Double Chance",
            outcomes: [
                { label: `${team1} or Draw`, odds: 1.25 },
                { label: `${team1} or ${team2}`, odds: 1.22 },
                { label: `Draw or ${team2}`, odds: 1.85 }
            ]
        },
        {
            name: "Correct Score",
            outcomes: [
                { label: "1–1", odds: 6.5 },
                { label: "2–1", odds: 8.0 },
                { label: "1–2", odds: 12.0 },
                { label: "2–2", odds: 11.0 },
                { label: "1–0", odds: 9.0 },
                { label: "Other score", odds: 15.0 }
            ]
        },
        {
            name: "Next Goal",
            outcomes: [
                { label: team1, odds: 1.9 },
                { label: "No more goals", odds: 3.2 },
                { label: team2, odds: 2.2 }
            ]
        },
        {
            name: "First-Half Result",
            outcomes: [
                { label: team1, odds: 2.4 },
                { label: "Draw", odds: 2.1 },
                { label: team2, odds: 3.8 }
            ]
        },
        {
            name: "Total Corners",
            outcomes: [
                { label: "Over 8.5", odds: 1.85 },
                { label: "Under 8.5", odds: 1.95 }
            ]
        },
        {
            name: "Total Cards",
            outcomes: [
                { label: "Over 3.5", odds: 1.8 },
                { label: "Under 3.5", odds: 2.0 }
            ]
        }
    ];
}

function buildCricketMarkets(match) {
    const team1 = match.team1;
    const team2 = match.team2;

    return [
        {
            name: "Match Winner",
            outcomes: [
                { label: team1, odds: Number(match.odds.team1) },
                { label: team2, odds: Number(match.odds.team2) }
            ]
        },
        {
            name: "Total Match Runs",
            outcomes: [
                { label: "Over 300.5", odds: 1.9 },
                { label: "Under 300.5", odds: 1.9 }
            ]
        },
        {
            name: `${team1} Team Runs`,
            outcomes: [
                { label: "Over 150.5", odds: 1.85 },
                { label: "Under 150.5", odds: 1.95 }
            ]
        },
        {
            name: `${team2} Team Runs`,
            outcomes: [
                { label: "Over 150.5", odds: 1.85 },
                { label: "Under 150.5", odds: 1.95 }
            ]
        },
        {
            name: "Total Wickets",
            outcomes: [
                { label: "Over 12.5", odds: 1.9 },
                { label: "Under 12.5", odds: 1.9 }
            ]
        },
        {
            name: "Highest Scoring Innings",
            outcomes: [
                { label: "1st Innings", odds: 1.9 },
                { label: "2nd Innings", odds: 1.9 }
            ]
        },
        {
            name: "Toss Winner",
            outcomes: [
                { label: team1, odds: 1.9 },
                { label: team2, odds: 1.9 }
            ]
        }
    ];
}

const matches = [
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
            team2: "4.20"
        }
    },
    {
        id: 2,
        sport: "Cricket",
        league: "T20 International",
        team1: "India",
        team2: "Australia",
        status: "Upcoming",
        date: "28 Oct",
        time: "7:30 PM",
        odds: {
            team1: "1.80",
            draw: "-",
            team2: "2.05"
        }
    },
    {
        id: 3,
        sport: "Football",
        league: "UEFA Champions League",
        team1: "Real Madrid",
        team2: "Barcelona",
        status: "Upcoming",
        date: "30 Oct",
        time: "10:00 PM",
        odds: {
            team1: "1.95",
            draw: "3.40",
            team2: "3.60"
        }
    },
    {
        id: 4,
        sport: "Cricket",
        league: "ODI International",
        team1: "England",
        team2: "New Zealand",
        status: "Live",
        score1: 142,
        score2: 3,
        minute: "28 overs",
        odds: {
            team1: "2.10",
            draw: "-",
            team2: "1.75"
        }
    },
    {
        id: 5,
        sport: "Football",
        league: "La Liga",
        team1: "Atletico Madrid",
        team2: "Sevilla",
        status: "Upcoming",
        date: "31 Oct",
        time: "8:30 PM",
        odds: {
            team1: "1.90",
            draw: "3.25",
            team2: "4.10"
        }
    },
    {
        id: 6,
        sport: "Cricket",
        league: "T20 International",
        team1: "Pakistan",
        team2: "South Africa",
        status: "Upcoming",
        date: "01 Nov",
        time: "7:00 PM",
        odds: {
            team1: "1.95",
            draw: "-",
            team2: "1.85"
        }
    },
    {
        id: 7,
        sport: "Football",
        league: "Serie A",
        team1: "Inter Milan",
        team2: "AC Milan",
        status: "Live",
        score1: 2,
        score2: 1,
        minute: "74'",
        odds: {
            team1: "1.65",
            draw: "3.80",
            team2: "4.50"
        }
    },
    {
        id: 8,
        sport: "Cricket",
        league: "ODI International",
        team1: "Sri Lanka",
        team2: "Bangladesh",
        status: "Upcoming",
        date: "02 Nov",
        time: "2:00 PM",
        odds: {
            team1: "1.85",
            draw: "-",
            team2: "2.00"
        }
    },
    {
        id: 9,
        sport: "Football",
        league: "Bundesliga",
        team1: "Bayern Munich",
        team2: "Borussia Dortmund",
        status: "Upcoming",
        date: "03 Nov",
        time: "9:00 PM",
        odds: {
            team1: "1.70",
            draw: "3.90",
            team2: "4.30"
        }
    },
    {
        id: 10,
        sport: "Cricket",
        league: "T20 International",
        team1: "West Indies",
        team2: "Afghanistan",
        status: "Live",
        score1: 96,
        score2: 2,
        minute: "12 overs",
        odds: {
            team1: "1.90",
            draw: "-",
            team2: "1.95"
        }
    }
];

const matchesWithMarkets = matches.map(function (match) {
    return {
        ...match,
        markets:
            match.sport === "Football"
                ? buildFootballMarkets(match)
                : buildCricketMarkets(match),
    };
});

export default matchesWithMarkets;