import pool from "../db/db.js";

export async function createBet(req, res) {
    const client = await pool.connect();

    try {
        const {
            user_id,
            selection_id,
            stake
        } = req.body;

        if (!user_id || !selection_id) {
            return res.status(400).json({
                error: "user_id and selection_id are required"
            });
        }

        if (stake === undefined) {
            return res.status(400).json({
                error: "stake is required"
            });
        }

        if (stake <= 0) {
            return res.status(400).json({
                error: "stake must be greater than 0"
            });
        }

        await client.query("BEGIN");

        const oddsResult = await client.query(
            `SELECT value
             FROM odds
             WHERE selection_id = $1`,
            [selection_id]
        );

        if (oddsResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Odds not found for this selection"
            });
        }

        const odds = oddsResult.rows[0].value;
        const potential_payout = stake * Number(odds);

        const balanceResult = await client.query(
            `UPDATE users
             SET balance = balance - $1
             WHERE id = $2
             AND balance >= $1
             RETURNING balance`,
            [stake, user_id]
        );

        if (balanceResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                error: "Insufficient balance"
            });
        }

        const result = await client.query(
            `INSERT INTO bets
            (user_id, selection_id, odds, stake, potential_payout, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                user_id,
                selection_id,
                odds,
                stake,
                potential_payout,
                "pending"
            ]
        );

        await client.query(
            `INSERT INTO wallet_transactions
            (user_id, bet_id, type, amount)
            VALUES ($1, $2, $3, $4)`,
            [
                user_id,
                result.rows[0].id,
                "bet",
                stake
            ]
        );

        await client.query("COMMIT");

        res.status(201).json(result.rows[0]);
    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Failed to create bet:", error);

        res.status(500).json({
            error: "Failed to create bet"
        });
    } finally {
        client.release();
    }
}

export async function getUserBets(req, res) {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({
                error: "user_id is required"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM bets
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [user_id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch user bets:", error);

        res.status(500).json({
            error: "Failed to fetch user bets"
        });
    }
}

export async function settleBet(req, res) {
    const client = await pool.connect();

    try {
        const { id } = req.params;
        const { result } = req.body;

        if (!result) {
            return res.status(400).json({
                error: "result is required"
            });
        }

        if (result !== "won" && result !== "lost") {
            return res.status(400).json({
                error: "result must be won or lost"
            });
        }

        await client.query("BEGIN");

        const betResult = await client.query(
            `SELECT *
             FROM bets
             WHERE id = $1
             AND status = 'pending'`,
            [id]
        );

        if (betResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Pending bet not found"
            });
        }

        const bet = betResult.rows[0];

        if (result === "won") {
            await client.query(
                `UPDATE users
                 SET balance = balance + $1
                 WHERE id = $2`,
                [bet.potential_payout, bet.user_id]
            );

            await client.query(
                `INSERT INTO wallet_transactions
                (user_id, bet_id, type, amount)
                VALUES ($1, $2, $3, $4)`,
                [
                    bet.user_id,
                    bet.id,
                    "payout",
                    bet.potential_payout
                ]
            );
        }

        await client.query(
            `UPDATE bets
             SET status = $1
             WHERE id = $2`,
            [result, id]
        );

        await client.query("COMMIT");

        res.json({
            message: "Bet settled successfully",
            bet_id: bet.id,
            status: result
        });
    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Failed to settle bet:", error);

        res.status(500).json({
            error: "Failed to settle bet"
        });
    } finally {
        client.release();
    }
}