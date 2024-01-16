
import express from 'express';
import StudyModel from "@/models/studie";
import UserModel from "@/models/user";
import mongodb from "@/utils/mongodb";

const app = express();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongodb.dbConnect();

      const { studyName, randomize, RandomizationParameter, group, inputFields, list, nameFields, caseNumber, user, mail } = req.body;

      const newStudy = new StudyModel({ Studienname: studyName, Methode_Randomisierung: randomize, Fallzahl: caseNumber,  Randomization_Parameter: RandomizationParameter, Anzahl_Gruppen: group, Verteilung: inputFields, Name_Behandlung: nameFields, Rando_Liste: list, Rando_Liste_use: list });

      await newStudy.save();

      console.log('user:', user);
      console.log('mail:', mail);

      const conditions = { username: user, mail: mail };
      const update = { $set: { Studien_ID: studyName } };

      const updatedUser = await UserModel.findOneAndUpdate(conditions, update, { new: true });
      console.log('updatedUser:', updatedUser);

      if (updatedUser) {
        console.log('Benutzer wurde erfolgreich aktualisiert:', updatedUser);
      } else {
        console.log('Benutzer nicht gefunden.');
      }
      res.status(201).json(newStudy);
    } catch (error) {
      console.error('Fehler:', error);
      res.status(500).json({ message: 'Interner Serverfehler' });
    }
  }
}
