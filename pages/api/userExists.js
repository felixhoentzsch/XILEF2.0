import UserModel from "@/models/user";
import mongodb from "@/utils/mongodb";

export default async function handler(req, res) {
  try {
    await mongodb.dbConnect();
    const { username } = await req.body; // Du kannst req.json() verwenden, wenn du die Daten als JSON erwartest

    const user = await UserModel.findOne({ username }).select("_id");
    console.log("user:", user);

    // JSON-Antwort senden
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
