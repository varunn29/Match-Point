import express from "express";
import {getOdds, createOdds} from "../controllers/oddsController.js";

const oddsRouter = express.Router();

oddsRouter.get("/", getOdds);
oddsRouter.post("/", createOdds);

export default oddsRouter;