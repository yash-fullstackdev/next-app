import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { sendSlackNotification } from "../../utils/slack";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, password, role } = req.body;

  try {
    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      passwordDigest: hashedPassword,
    });

    await newUser.save();

    await sendSlackNotification(`New user signed up: ${name} (${email})`);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
}
