import pool from "../db/db.js";

async function getWallet(req, res) {
    const userId = req.session?.userId;

    if (!userId) {
        return res.status(401).json({
            message: "You must be logged in to view your wallet."
        });
    }

    try {
        const result = await pool.query(
            `SELECT balance
             FROM wallets
             WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Wallet not found."
            });
        }

        return res.status(200).json({
            wallet: result.rows[0]
        });
    } catch (error) {
        console.error("Get wallet error:", error);

        return res.status(500).json({
            message: "Could not retrieve your wallet."
        });
    }
}

async function getWalletTransactions(req, res) {
    const userId = req.session?.userId;

    if (!userId) {
        return res.status(401).json({
            message: "You must be logged in to view your transactions."
        });
    }

    try {
        const result = await pool.query(
            `SELECT id, transaction_type, amount, balance_after, created_at
             FROM wallet_transactions
             WHERE user_id = $1
             ORDER BY created_at DESC
             LIMIT 20`,
            [userId]
        );

        return res.status(200).json({
            transactions: result.rows
        });
    } catch (error) {
        console.error("Get wallet transactions error:", error);

        return res.status(500).json({
            message: "Could not retrieve your transactions."
        });
    }
}

export { getWallet, getWalletTransactions };