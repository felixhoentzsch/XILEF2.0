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
    const { studyName, randomize, blockSize, group, inputFields, list, nameFields, caseNumber} = req.body; // Daten aus der Anfrage extrahieren

    const newStudy = new StudyModel({ Studienname: studyName, Methode_Randomisierung: randomize, Fallzahl: caseNumber, blocksize: blockSize, Anzahl_Gruppen: group, Verteilung: inputFields, Name_Behandlung: nameFields, Rando_Liste: list });
    await newStudy.save();

    res.status(201).json(newStudy); // Erfolgreiche Antwort mit den gespeicherten Daten zurückgeben
   // }

 


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Speichern der Studie' });
  }
};

}