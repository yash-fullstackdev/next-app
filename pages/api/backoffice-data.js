import dbConnect from "../../utils/dbConnect";
import BackOfficeReportingView from "../../models/backoffice";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { authorization } = req.headers;
  const { userUid } = req.query;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);

    const backOfficeData = await BackOfficeReportingView.find({
      UserUID: userUid,
    });

    res.status(200).json(backOfficeData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
