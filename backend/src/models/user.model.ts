import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;