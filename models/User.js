import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  userUid: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordDigest: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  assetsWatched: { type: Array, default: [] },
  screens: { type: Array, default: [] },
  nameAddressMappings: { type: Array, default: [] },
  dfnsId: { type: String },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
