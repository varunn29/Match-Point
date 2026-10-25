import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/db.js";

import matchesRouter from "./routes/matches.js";
import usersRouter from "./routes/users.js";
import betsRouter from "./routes/bets.js";
import walletRouter from "./routes/wallet.js";

const app = express();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const sessionSecret = process.env.SESSION_SECRET;

if (isProduction && !sessionSecret) {
    throw new Error("SESSION_SECRET must be configured in production");
}

const PgSession = connectPgSimple(session);

if (isProduction) {
    app.set("trust proxy", 1);
}

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: "user_sessions",
        createTableIfMissing: true
    }),
    name: "matchpoint.sid",
    secret: sessionSecret || "development-only-change-this-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get("/api/health", async function (req, res) {
    try {
        await pool.query("SELECT 1");

        res.status(200).json({
            status: "Ok",
            database: "Connected"
        });
    } catch (error) {
        console.error("Health check failed:", error.message);

        res.status(503).json({
            status: "Error",
            database: "Disconnected"
        });
    }
});

app.use("/api/matches", matchesRouter);
app.use("/api/users", usersRouter);
app.use("/api/bets", betsRouter);
app.use("/api/wallet", walletRouter);

app.listen(PORT, function () {
    console.log(`MATCHPOINT server is listening on port ${PORT}`);
});