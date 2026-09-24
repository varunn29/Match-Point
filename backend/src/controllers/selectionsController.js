import pool from "../db/db.js";

export async function getSelections(req, res) {
    try {
        const result = await pool.query(
            "SELECT * FROM selections"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch selections:", error);

        res.status(500).json({
            error: "Failed to fetch selections"
        });
    }
}

export async function createSelection(req, res) {
    try {
        const { market_id, name } = req.body;

        if (!market_id || !name) {
            return res.status(400).json({
                error: "market_id and name are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO selections (market_id, name) VALUES ($1, $2) RETURNING *",
            [market_id, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create selection:", error);

        res.status(500).json({
            error: "Failed to create selection"
        });
    }
}