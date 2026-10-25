import bcrypt from "bcrypt";
import pool from "../db/db.js";

async function registerUser(req, res) {
    const { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const cleanFullName = full_name.trim();
    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanFullName.length > 100) {
        return res.status(400).json({
            message: "Full name must be 100 characters or fewer."
        });
    }

    if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
        return res.status(400).json({
            message: "Username must be 3–20 characters and use lowercase letters, numbers, or underscores."
        });
    }

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
        cleanEmail.length > 255
    ) {
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long."
        });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
        return res.status(400).json({
            message: "Password must not exceed 72 bytes."
        });
    }

    let client;

    try {
        client = await pool.connect();

        await client.query("BEGIN");

        const existingUser = await client.query(
            `SELECT id
             FROM users
             WHERE username = $1 OR email = $2`,
            [cleanUsername, cleanEmail]
        );

        if (existingUser.rows.length > 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                message: "Username or email is already in use."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const userResult = await client.query(
            `INSERT INTO users (full_name, username, email, password_hash)
             VALUES ($1, $2, $3, $4)
             RETURNING id, full_name, username, email, created_at`,
            [cleanFullName, cleanUsername, cleanEmail, passwordHash]
        );

        const user = userResult.rows[0];
        const welcomeBonus = 10000.00;

        await client.query(
            `INSERT INTO wallets (user_id, balance)
             VALUES ($1, $2)`,
            [user.id, welcomeBonus]
        );

        await client.query(
            `INSERT INTO credit_claims (user_id, claim_type, amount)
             VALUES ($1, 'welcome_bonus', $2)`,
            [user.id, welcomeBonus]
        );

        await client.query(
            `INSERT INTO wallet_transactions
                (user_id, transaction_type, amount, balance_after)
             VALUES ($1, 'welcome_bonus', $2, $2)`,
            [user.id, welcomeBonus]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            message: "Account created successfully.",
            user: user,
            wallet: {
                balance: welcomeBonus
            }
        });
    } catch (error) {
        if (client) {
            await client.query("ROLLBACK");
        }

        console.error("Registration error:", error.message);

        return res.status(500).json({
            message: "Could not create your account. Please try again."
        });
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
        const result = await pool.query(
            `SELECT id, full_name, username, email, password_hash, account_status
             FROM users
             WHERE email = $1`,
            [cleanEmail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = result.rows[0];

        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches || user.account_status !== "active") {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        req.session.userId = user.id;

        req.session.save(function (error) {
            if (error) {
                console.error("Session save error:", error);

                return res.status(500).json({
                    message: "Could not complete login. Please try again."
                });
            }

            return res.status(200).json({
                message: "Login successful.",
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    username: user.username,
                    email: user.email
                }
            });
        });
    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            message: "Could not log in. Please try again."
        });
    }
}

async function getCurrentUser(req, res) {
    if (!req.session?.userId) {
        return res.status(401).json({
            message: "You must be logged in."
        });
    }

    try {
        const result = await pool.query(
            `SELECT id, full_name, username, email
             FROM users
             WHERE id = $1 AND account_status = 'active'`,
            [req.session.userId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "User account not found or inactive."
            });
        }

        return res.status(200).json({
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Get current user error:", error.message);

        return res.status(500).json({
            message: "Could not retrieve your account."
        });
    }
}

function logoutUser(req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.error("Logout error:", error);

            return res.status(500).json({
                message: "Could not log out. Please try again."
            });
        }

        res.clearCookie("matchpoint.sid");

        return res.status(200).json({
            message: "Logout successful."
        });
    });
}

export { registerUser, loginUser, getCurrentUser, logoutUser };