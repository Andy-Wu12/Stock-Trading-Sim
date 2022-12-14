import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, dropDups: true},
  email: { type: String, required: true, unique: true, dropDups: true },
  balance: { type: Number, default: 100000 }
});

userSchema.methods.details = function getDetails() {
  const details = {username: this.username, balance: this.balance, email: this.email};
  return details;
}

export const User = mongoose.model('User', userSchema);

export default User;
