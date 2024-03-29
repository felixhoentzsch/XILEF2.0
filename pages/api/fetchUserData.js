"use client"

const express = require('express');
const app = express();

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
                console.log('Studien-ID des gefundenen Benutzers:', studienID);
            
                // Jetzt können Sie die Studie basierend auf der Studien-ID suchen
                const gefundeneBenutzer = await UserModel.find({ Studien_ID: studienID });
            
                if (gefundeneBenutzer.length > 0) {
                    console.log('Gefundene Studie:', gefundeneBenutzer);
                } else {
                    console.log('Keine Benutzer mit der gesuchten Studien-ID gefunden.');
                }
            
                res.status(201).json(gefundeneBenutzer);
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