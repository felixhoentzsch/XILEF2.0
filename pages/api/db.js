// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "@/utils/mongodb"
import jsondb from "@/jsondb/user";
import User from "@/models/user";

export default async function handler(req, res) {
  await mongodb.dbConnect();
   await User.deleteMany();
   await User.insertMany(jsondb.user);
  const user = await User.find({});
  await mongodb.dbDisconnect();
  //res.send({ text: 'Daten gespeichert' })
  res.send(user)
}
