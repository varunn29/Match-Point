import pool from "../db/db.js";

export async function getUsers(req, res) {
    try {
        const result = await pool.query(
            "SELECT id, username, email, created_at FROM users"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch users:", error);

        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
}

export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: "username, email and password are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
            [username, email, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create user:", error);

        res.status(500).json({
            error: "Failed to create user"
        });
    }
}

export async function getUserBalance(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT balance FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Failed to fetch user balance:", error);

        res.status(500).json({
            error: "Failed to fetch user balance"
        });
    }
}

export async function getUserTransactions(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT id, bet_id, type, amount, created_at
             FROM wallet_transactions
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch user transactions:", error);

        res.status(500).json({
            error: "Failed to fetch user transactions"
        });
    }
}