import express from "express";
import cors from "cors";
import matchesRouter from "./routes/matches.js";
import marketsRouter from "./routes/markets.js";
import selectionsRouter from "./routes/selections.js";
import oddsRouter from "./routes/odds.js";
import usersRouter from "./routes/users.js";
import betsRouter from "./routes/bets.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", function (req, res) {
    res.json({
        status: "Ok"
    });
});

app.use("/api/matches", matchesRouter);
app.use("/api/markets", marketsRouter);
app.use("/api/selections", selectionsRouter);
app.use("/api/odds", oddsRouter);
app.use("/api/users", usersRouter);
app.use("/api/bets", betsRouter);

app.listen(PORT, function () {
    console.log(`MATCHPOINT server is listening on port ${PORT}`);
});