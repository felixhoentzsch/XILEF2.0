// In deinem Node.js-Server-Code (z.B., server.js oder app.js)
const express = require('express');
const app = express();
import UserModel from "@/models/user";
import mongodb from "@/utils/mongodb";
import bcrypt from 'bcrypt'


export default async function handler(req, res) {
// API-Route zum Speichern eines neuen Mitarbeiters

if (req.method === 'POST') {
  try {

    await mongodb.dbConnect();
    const { username, passwort, role, Zentrum_ID, Studien_ID, mail } = req.body; // Daten aus der Anfrage extrahieren
    const hashedPassword = await bcrypt.hash(passwort,10)

    const newStaffMember = new UserModel({ username, passwort: hashedPassword, role, Zentrum_ID, Studien_ID, mail });
    await newStaffMember.save();

    res.status(201).json(newStaffMember); // Erfolgreiche Antwort mit den gespeicherten Daten zurückgeben
   // }

 


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Speichern des Mitarbeiters' });
  }
};

}

// export async function POST(req){
//     try{
//         const { username, passwort, role, Zentrum_ID, Studien_ID, mail } = await req.json
//     }
// }