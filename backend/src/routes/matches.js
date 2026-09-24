import express from "express";
import {getMatches, createMatch} from "../controllers/matchesController.js";

const matchesRouter = express.Router();

matchesRouter.get("/", getMatches);
matchesRouter.post("/", createMatch);

export default matchesRouter;