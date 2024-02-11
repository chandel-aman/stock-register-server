import { Request, Response } from "express";
import Transaction, {
  InterfaceTransaction as TransactionType,
} from "../models/transaction.model";

export const getTransactions = async (req: Request, res: Response) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = ((page as number) - 1) * (limit as number);

  Transaction.find()
    .skip(offset)
    .limit(parseInt(limit as string))
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const addTransaction = async (req: Request, res: Response) => {
  const { orderId, orderDate, orderAmount, transactionFees }: TransactionType =
    req.body;
  if (!orderId || !orderDate || !orderAmount || !transactionFees) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const transaction = new Transaction({
      orderId,
      orderDate,
      orderAmount,
      transactionFees,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addTransactions = async (req: Request, res: Response) => {
  const transactions: TransactionType[] = req.body;
  if (!Array.isArray(transactions)) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const insertedTransactions = await Transaction.insertMany(transactions);
    res.status(201).json({ message: "Successfully added transactions" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
