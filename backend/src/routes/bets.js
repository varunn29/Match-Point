import express from "express";
import {
    placeBet,
    getMyBets
} from "../controllers/betsController.js";

const betsRouter = express.Router();

betsRouter.get("/my-bets", getMyBets);
betsRouter.post("/", placeBet);

export default betsRouter;