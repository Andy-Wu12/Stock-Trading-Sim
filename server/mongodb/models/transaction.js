import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now }

});

export const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;