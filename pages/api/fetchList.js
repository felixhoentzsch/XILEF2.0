"use client"

const express = require('express');
const app = express();


import StudyModel from "@/models/studie";
import mongodb from "@/utils/mongodb";

export default async function handler(req, res){

  if(req.method === "POST"){
    try {
      await mongodb.dbConnect();
      const { Studien_ID } = req.body; // Daten aus der Anfrage

      // Finde die Studie mit der angegebenen Studien_ID
      const studie = await StudyModel.findOne({ Studien_ID });
            
      // Überprüfe, ob die Studie gefunden wurde
      if (studie) {
        const randoListe = studie.Rando_Liste;

        // Setze breakingTheBlind auf 1
        studie.breakingTheBlind = 1;

        // Speichere die aktualisierte Studie in der Datenbank
        await studie.save();
            
        // Hier kannst du die Rando_List verwenden oder weiterverarbeiten
        console.log('Rando_List für Studien_ID', Studien_ID, ':', randoListe);
        res.status(201).json(randoListe);
      }else {
        console.log('Studie nicht gefunden für Studien_ID', Studien_ID);
      }
    }catch (error){
      console.log(error)
      res.status(500).json({message:'Fehler beim fetchen der Patiententabelle'});
    }
  };
}