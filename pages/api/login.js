import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import { sendSlackNotification } from "../../utils/slack";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordDigest);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const { passwordDigest, ...userData } = user.toObject();

    await sendSlackNotification(`User logged in: ${user.name} (${user.email})`);

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
}
