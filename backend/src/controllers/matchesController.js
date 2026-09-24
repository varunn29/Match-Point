import pool from "../db/db.js";

export async function getMatches(req, res) {
    try {
        const result = await pool.query("SELECT * FROM matches");

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch matches:", error);

        res.status(500).json({
            error: "Failed to fetch matches"
        });
    }
}

export async function createMatch(req, res) {
    try {
        const { sport, team1, team2, status, start_time } = req.body;

        if (!sport || !team1 || !team2 || !status || !start_time) {
            return res.status(400).json({
                error: "sport, team1, team2, status and start_time are required"
            });
        }

        const validSports = ["cricket", "football"];

        if (!validSports.includes(sport)) {
            return res.status(400).json({
                error: "Invalid sport"
            });
        }

        const validStatuses = [
            "upcoming",
            "live",
            "completed",
            "cancelled"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: "Invalid status"
            });
        }

        const result = await pool.query(
            "INSERT INTO matches (sport, team1, team2, status, start_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [sport, team1, team2, status, start_time]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create match:", error);

        res.status(500).json({
            error: "Failed to create match"
        });
    }
}