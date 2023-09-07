import mongodb from "@/utils/mongodb";
import User from "../../models/user"

export default async function handler(req, res) {
    const {method} = req;
    await mongodb.dbConnect()
    if(method === "GET"){
        try{
            const user = await User.find()
            res.status(200).json(user) // 200 => alles ok
        }catch(error){
            res.status(500).json(error)
        }
    }
    if(method === "POST"){ //in DB anlegen
        try{
            const user = await User.create(req.body)
            res.status(201).json(user) // 201 => ressource erfolgreich erstellt
        }catch(error){
            res.status(500).json(error)
        }
    }
  }
  