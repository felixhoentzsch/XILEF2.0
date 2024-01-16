
import express from 'express';
import StudyModel from "@/models/studie";
import PatientModel from '@/models/patient';
import mongodb from "@/utils/mongodb";

const app = express();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongodb.dbConnect();
      const { patientName, Zentrum, Studie } = req.body;

      // Finde die Studie
      const foundStudy = await StudyModel.findOne({ Studienname: Studie });

      if (foundStudy) {
        // Finde den Index des ersten Eintrags, der nicht 999 ist
        const indexFirstNot999 = foundStudy.Rando_Liste_use.findIndex(value => value !== 999);

        if (indexFirstNot999 !== -1) {
          // Extrahiere den Wert des ersten Eintrags, der nicht 999 ist
          const firstValueInList = foundStudy.Rando_Liste_use[indexFirstNot999];

          if (!patientName || !Zentrum || !Studie) {
            return res.status(400).json({ message: 'Fehlende Parameter in der Anfrage.' });
          }
          const newPatient = new PatientModel({ ID: patientName, group: firstValueInList, Studie: Studie, Zentrum: Zentrum  });      
          await newPatient.save();      
        
          res.status(201).json(newPatient);

          // Hier kannst du firstValueInList verwenden oder weiterverarbeiten
          console.log('Wert des ersten Eintrags in Rando_Liste_use:', firstValueInList);

          // Setze den gefundenen Eintrag auf 999
          foundStudy.Rando_Liste_use[indexFirstNot999] = 999;

          // Speichere das aktualisierte Dokument in der Datenbank
          const updatedStudy = await foundStudy.save();

          console.log('Studie erfolgreich aktualisiert:', updatedStudy);
        } else {
          console.log('Es wurde kein Wert gefunden, der nicht 999 ist.');
        }
      } else {
        console.log('Studie nicht gefunden.');
      }  
      //--------------------------------------------------------------------------------------------------------  
    } catch (error) {
      console.error('Fehler:', error);
      res.status(500).json({ message: 'Interner Serverfehler' });
    }
  }
}