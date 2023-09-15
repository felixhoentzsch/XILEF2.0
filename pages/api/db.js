// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "@/utils/mongodb"
import jsondb from "@/jsondb/user";
import UserModel from "@/models/user";

export default async function handler(req, res) {
  await mongodb.dbConnect();
   await UserModel.deleteMany();
   await UserModel.insertMany(jsondb.user);
  const user = await UserModel.find({}); // hier müsste er alles von Benutzer lesen 
  await mongodb.dbDisconnect();
  //res.send({ text: 'Daten gespeichert' })
  res.send(user)
}
