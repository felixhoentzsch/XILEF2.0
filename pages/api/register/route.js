
import bcrypt from "bcryptjs";
import UserModel from "@/models/user";
import mongodb from "@/utils/mongodb";

export default async function handler(req, res) {
  try {
    const { username, passwort, role, Zentrum_ID, Studien_ID, mail } = await req.body;
    const hashedPassword = await bcrypt.hash(passwort, 10);
    await mongodb.dbConnect()
    await UserModel.create({ username, passwort: hashedPassword, role, Zentrum_ID, Studien_ID, mail });

    res.status(201).json({ message: "User registered." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred while registering the user." });
  }
}
