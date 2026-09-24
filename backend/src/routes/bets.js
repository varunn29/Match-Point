import express from "express";
import {createBet, getUserBets, settleBet} from "../controllers/betsController.js";

const betsRouter = express.Router();

betsRouter.post("/", createBet);
betsRouter.get("/", getUserBets);
betsRouter.post("/:id/settle", settleBet);

export default betsRouter;