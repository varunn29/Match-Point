import express from "express";
import {getSelections, createSelection} from "../controllers/selectionsController.js";

const selectionsRouter = express.Router();

selectionsRouter.get("/", getSelections);
selectionsRouter.post("/", createSelection);

export default selectionsRouter;