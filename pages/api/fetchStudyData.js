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
                const gefundeneStudie = await StudyModel.find({ Studienname: studienID });
            
                if (gefundeneStudie.length > 0) {
                    //console.log('Gefundene Studie:', gefundeneStudie);
                } else {
                    //console.log('Keine Studie mit der gesuchten Studien-ID gefunden.');
                }
            
                res.status(201).json(gefundeneStudie);
            } else {
                console.log('Kein Benutzer mit dem gesuchten Benutzernamen gefunden.');
                res.status(404).json({ message: 'Benutzer nicht gefunden.' });
            }
            

        }catch (error){
            console.log(error)
            res.status(500).json({message:'Fehler beim fetchen der StudienTabelle'});
        }
    };
}