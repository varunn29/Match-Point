import express from "express";
import {
    getWallet,
    getWalletTransactions,
} from "../controllers/walletController.js";
import requireAuth from "../middleware/requireAuth.js";

const walletRouter = express.Router();

walletRouter.get("/", requireAuth, getWallet);
walletRouter.get("/transactions", requireAuth, getWalletTransactions);

export default walletRouter;