
import matches from "../data/matchesData.js";

function getMatches(req, res) {
    const sport = req.query.sport;
    const status = req.query.status;

    const filteredMatches = matches.filter(function (match) {
        const matchesSport =
            !sport ||
            sport === "all" ||
            match.sport.toLowerCase() === sport.toLowerCase();

        const matchesStatus =
            !status ||
            status === "all" ||
            match.status.toLowerCase() === status.toLowerCase();

        return matchesSport && matchesStatus;
    });

    return res.status(200).json({
        matches: filteredMatches
    });
}

export { getMatches };
