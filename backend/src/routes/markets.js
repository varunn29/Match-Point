import express from "express";
import {getMarkets, createMarket} from "../controllers/marketsController.js";

const marketsRouter = express.Router();

marketsRouter.get("/", getMarkets);
marketsRouter.post("/", createMarket);

export default marketsRouter;