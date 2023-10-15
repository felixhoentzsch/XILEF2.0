// In deinem Node.js-Server-Code (z.B., server.js oder app.js)
const express = require('express');
const app = express();
import StudyModel from "@/models/studie";
import mongodb from "@/utils/mongodb";


export default async function handler(req, res) {
// API-Route zum Speichern eines neuen Mitarbeiters

if (req.method === 'POST') {
  try {

    await mongodb.dbConnect();
    const { studyName, randomize, group, inputFields} = req.body; // Daten aus der Anfrage extrahieren

    const newStudy = new StudyModel({ studyName, randomize, group, inputFields });
    await newStudy.save();

    res.status(201).json(newStudy); // Erfolgreiche Antwort mit den gespeicherten Daten zurückgeben
   // }

 


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Speichern der Studie' });
  }
};

}