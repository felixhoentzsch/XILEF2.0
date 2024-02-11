"use client"

const express = require('express');
const app = express();


import StudyModel from "@/models/studie";
import UserModel from "@/models/user";
import mongodb from "@/utils/mongodb";

export default async function handler(req, res){

  if(req.method === "POST"){
    try {
      await mongodb.dbConnect();
      const { Benutzer } = req.body; // Daten aus der Anfrage 
      //console.log("übergebener Wert als Schlüssel"+Benutzer)

      const gefundenerNutzer = await UserModel.find({username: Benutzer})
      //console.log("Benutzer:"+gefundenerNutzer)
                 
      if (gefundenerNutzer.length > 0) {
        const studienID = gefundenerNutzer[0].Studien_ID;
        //console.log('Studien-ID des gefundenen Benutzers:', studienID);
            
        // Jetzt können Sie die Studie basierend auf der Studien-ID suchen
        const gefundeneStudie = await StudyModel.findOne({ Studienname: studienID });
            
        // Überprüfe, ob die Studie gefunden wurde
        if (gefundeneStudie) {
          const randoListe = gefundeneStudie.Rando_Liste;
          const names = gefundeneStudie.Name_Behandlung;
          const newList = []

          // Setze breakingTheBlind auf 1
          gefundeneStudie.breakingTheBlind = 1;

          // Speichere die aktualisierte Studie in der Datenbank
          await gefundeneStudie.save();
            
          // Hier kannst du die Rando_List verwenden oder weiterverarbeiten
          console.log('Rando_List für Studien_ID', gefundeneStudie.Studien_ID, ':', randoListe);

          //newList wird gefüllt mit Symbiose ais randoListe und names
          // Durchlaufe das zweite Array
          for (var i = 0; i < randoListe.length; i++) {
            // Wenn das Element des zweiten Arrays eine Null ist, füge das Element an der 0-ten Stelle des ersten Arrays hinzu
            if (randoListe[i] === 0) {
              newList.push(names[0]);
            }
            // Wenn das Element des zweiten Arrays eine Eins ist, füge das Element an der 1-ten Stelle des ersten Arrays hinzu
            else if (randoListe[i] === 1) {
              newList.push(names[1]);
            }
            else if(randoListe[i] === 2) {
              newList.push(names[2]);
            }
            else if(randoListe[i] === 3) {
              newList.push(names[3]);
            }
          }
          
          res.status(201).json(newList);
        }else {
          console.log('Studie nicht gefunden für Studien_ID', gefundeneStudie.Studien_ID);
        }
      }
    }catch (error){
      console.log(error)
      res.status(500).json({message:'Fehler beim fetchen der Patiententabelle'});
    }
  };
}