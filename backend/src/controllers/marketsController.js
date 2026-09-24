import pool from "../db/db.js";

export async function getMarkets(req, res) {
    try {
        const result = await pool.query(
            "SELECT * FROM markets"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch markets:", error);

        res.status(500).json({
            error: "Failed to fetch markets"
        });
    }
}

export async function createMarket(req, res) {
    try {
        const { match_id, name } = req.body;

        if (!match_id || !name) {
            return res.status(400).json({
                error: "match_id and name are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO markets (match_id, name) VALUES ($1, $2) RETURNING *",
            [match_id, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create market:", error);

        res.status(500).json({
            error: "Failed to create market"
        });
    }
}