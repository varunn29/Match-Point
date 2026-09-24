import pool from "../db/db.js";

export async function getOdds(req, res) {
    try {
        const result = await pool.query(
            "SELECT * FROM odds"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch odds:", error);

        res.status(500).json({
            error: "Failed to fetch odds"
        });
    }
}

export async function createOdds(req, res) {
    try {
        const { selection_id, value } = req.body;

        if (!selection_id || value === undefined) {
            return res.status(400).json({
                error: "selection_id and value are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO odds (selection_id, value) VALUES ($1, $2) RETURNING *",
            [selection_id, value]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create odds:", error);

        res.status(500).json({
            error: "Failed to create odds"
        });
    }
}