import express from "express";
import {
  getTransactions,
  addTransaction,
  addTransactions,
} from "../controllers/transaction.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, addTransaction);
router.post("/bulk", authMiddleware, addTransactions);

export default router;
