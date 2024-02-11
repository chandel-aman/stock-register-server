import express, { Response, Request } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import transactionRoutes from "./routes/transaction.route";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
const PORT = 3000;

app.use(bodyParser.json());

if (!process.env.MONGO_DB_URL) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Server is live!");
});

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
