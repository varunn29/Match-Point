import pool from "../db/db.js";
import matches from "../data/matchesData.js";

function isValidUserId(userId) {
    return (
        (typeof userId === "string" ||
            typeof userId === "number" ||
            typeof userId === "bigint") &&
        /^[1-9]\d*$/.test(String(userId)) &&
        BigInt(userId) <= 9223372036854775807n
    );
}

export async function placeBet(req, res) {
    const userId = req.session?.userId;
    const rawStake = req.body?.stake;
    const stake = Number(rawStake);
    const selections = req.body?.selections;

    if (!isValidUserId(userId)) {
        return res.status(401).json({
            message: "You must be logged in to place a bet."
        });
    }

    if (
        rawStake === "" ||
        rawStake === null ||
        rawStake === undefined ||
        (typeof rawStake !== "number" && typeof rawStake !== "string") ||
        !Number.isFinite(stake) ||
        stake <= 0 ||
        stake > 999999999999.99 ||
        !/^\d+(\.\d{1,2})?$/.test(String(rawStake).trim())
    ) {
        return res.status(400).json({
            message: "Stake must be a valid amount greater than zero with at most two decimal places."
        });
    }

    if (!Array.isArray(selections) || selections.length === 0) {
        return res.status(400).json({
            message: "Your bet must contain at least one selection."
        });
    }

    const validatedSelections = [];
    const selectedMatches = new Set();

    for (const item of selections) {
        if (!item || item.matchId === undefined || item.matchId === null) {
            return res.status(400).json({
                message: "Every selection must have a valid match ID."
            });
        }

        const matchId = Number(item.matchId);

        if (!Number.isSafeInteger(matchId) || matchId <= 0) {
            return res.status(400).json({
                message: "Invalid match ID."
            });
        }

        const match = matches.find(function (match) {
            return match.id === matchId;
        });

        if (!match) {
            return res.status(400).json({
                message: `Match ${matchId} does not exist.`
            });
        }

        const marketName =
            typeof item.market === "string"
                ? item.market.trim()
                : "";

        if (!marketName) {
            return res.status(400).json({
                message: "Every selection must have a market."
            });
        }

        const market = match.markets.find(function (market) {
            return market.name.toLowerCase() === marketName.toLowerCase();
        });

        if (!market) {
            return res.status(400).json({
                message: `Unsupported market for ${match.team1} vs ${match.team2}.`
            });
        }

        const selectionName =
            typeof item.selection === "string"
                ? item.selection.trim()
                : "";

        if (!selectionName) {
            return res.status(400).json({
                message: "Every selection must have an outcome."
            });
        }

        const outcome = market.outcomes.find(function (outcome) {
            return outcome.label.toLowerCase() === selectionName.toLowerCase();
        });

        if (!outcome) {
            return res.status(400).json({
                message: `Invalid outcome for the ${market.name} market.`
            });
        }

        const odds = Number(outcome.odds);

        if (!Number.isFinite(odds) || odds <= 0) {
            return res.status(400).json({
                message: "Those odds are unavailable."
            });
        }

        if (selectedMatches.has(matchId)) {
            return res.status(400).json({
                message: "You cannot select multiple outcomes from the same match."
            });
        }

        selectedMatches.add(matchId);

        validatedSelections.push({
            matchId: match.id,
            matchName: `${match.team1} vs ${match.team2}`,
            market: market.name,
            selection: outcome.label,
            odds
        });
    }

    const rawTotalOdds = validatedSelections.reduce(
        function (total, item) {
            return total * item.odds;
        },
        1
    );

    const totalOdds = Number(rawTotalOdds.toFixed(2));
    const potentialReturn = Number((stake * totalOdds).toFixed(2));

    const betType =
        validatedSelections.length === 1 ? "single" : "multiple";

    if (
        !Number.isFinite(totalOdds) ||
        totalOdds <= 0 ||
        totalOdds > 9999999999.99 ||
        !Number.isFinite(potentialReturn) ||
        potentialReturn > 999999999999.99
    ) {
        return res.status(400).json({
            message: "The bet amount or potential return is too large."
        });
    }

    let client;
    let transactionStarted = false;

    try {
        client = await pool.connect();

        await client.query("BEGIN");
        transactionStarted = true;

        const walletResult = await client.query(
            `SELECT balance
             FROM public.wallets
             WHERE user_id = $1
             FOR UPDATE`,
            [userId]
        );

        if (walletResult.rowCount === 0) {
            await client.query("ROLLBACK");
            transactionStarted = false;

            return res.status(404).json({
                message: "Wallet not found."
            });
        }

        const balance = Number(walletResult.rows[0].balance);

        if (!Number.isFinite(balance) || balance < stake) {
            await client.query("ROLLBACK");
            transactionStarted = false;

            return res.status(400).json({
                message: "Insufficient wallet balance."
            });
        }

        const newBalance = Number((balance - stake).toFixed(2));

        const betResult = await client.query(
            `INSERT INTO public.bets (
                user_id,
                stake,
                total_odds,
                potential_return,
                status,
                bet_type
            )
            VALUES ($1, $2, $3, $4, 'pending', $5)
            RETURNING id, user_id, stake, total_odds,
                      potential_return, status, bet_type, placed_at`,
            [userId, stake, totalOdds, potentialReturn, betType]
        );

        const bet = betResult.rows[0];

        for (const item of validatedSelections) {
            await client.query(
                `INSERT INTO public.bet_items (
                    bet_id,
                    match_id,
                    match_name,
                    market,
                    selection,
                    odds
                )
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    bet.id,
                    item.matchId,
                    item.matchName,
                    item.market,
                    item.selection,
                    item.odds
                ]
            );
        }

        await client.query(
            `UPDATE public.wallets
             SET balance = $1,
                 updated_at = NOW()
             WHERE user_id = $2`,
            [newBalance, userId]
        );

        await client.query(
            `INSERT INTO public.wallet_transactions (
                user_id,
                transaction_type,
                amount,
                balance_after,
                related_bet_id
            )
            VALUES ($1, 'bet_stake', $2, $3, $4)`,
            [userId, stake, newBalance, bet.id]
        );

        await client.query("COMMIT");
        transactionStarted = false;

        return res.status(201).json({
            message: "Bet placed successfully.",
            bet: {
                ...bet,
                selections: validatedSelections
            },
            walletBalance: newBalance
        });
    } catch (error) {
        if (client && transactionStarted) {
            try {
                await client.query("ROLLBACK");
            } catch (rollbackError) {
                console.error(
                    "Bet transaction rollback failed:",
                    rollbackError
                );
            }
        }

        console.error("Place bet error:", error);

        return res.status(500).json({
            message: "Unable to place your bet. Your transaction was rolled back if it had started."
        });
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function getMyBets(req, res) {
    const userId = req.session?.userId;

    if (!isValidUserId(userId)) {
        return res.status(401).json({
            message: "You must be logged in to view your bets."
        });
    }

    try {
        const result = await pool.query(
            `SELECT
                b.id,
                b.stake,
                b.total_odds,
                b.potential_return,
                b.actual_return,
                b.status,
                b.bet_type,
                b.placed_at,
                b.settled_at,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'matchId', bi.match_id,
                            'matchName', bi.match_name,
                            'market', bi.market,
                            'selection', bi.selection,
                            'odds', bi.odds
                        )
                    ) FILTER (WHERE bi.id IS NOT NULL),
                    '[]'::json
                ) AS selections
            FROM public.bets b
            LEFT JOIN public.bet_items bi
                ON bi.bet_id = b.id
            WHERE b.user_id = $1
            GROUP BY b.id
            ORDER BY b.placed_at DESC`,
            [userId]
        );

        return res.status(200).json({
            bets: result.rows
        });
    } catch (error) {
        console.error("Get my bets error:", error);

        return res.status(500).json({
            message: "Unable to retrieve your bets."
        });
    }
}