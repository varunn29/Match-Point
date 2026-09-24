import express from "express";
import {getUsers, createUser, getUserBalance, getUserTransactions} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.post("/", createUser);
usersRouter.get("/:id/balance", getUserBalance);
usersRouter.get("/:id/transactions", getUserTransactions);

export default usersRouter;