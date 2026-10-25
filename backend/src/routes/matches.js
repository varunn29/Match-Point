import express from "express";
import { getMatches } from "../controllers/matchesController.js";

const matchesRouter = express.Router();

matchesRouter.get("/", getMatches);

export default matchesRouter;
