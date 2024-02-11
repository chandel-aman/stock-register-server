import mongoose, { Schema, Document, Types } from "mongoose";

export interface InterfaceTransaction extends Document {
  _id: Types.ObjectId;
  orderId: string;
  orderDate: Date;
  orderAmount: number;
  transactionFees: number;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true },
    orderDate: { type: Date, required: true },
    orderAmount: { type: Number, required: true },
    transactionFees: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<InterfaceTransaction>(
  "Transaction",
  TransactionSchema
);
