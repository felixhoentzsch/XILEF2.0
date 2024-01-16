"use client"

const express = require('express');
const app = express();

import PatientModel from "@/models/patient";
import mongodb from "@/utils/mongodb";

export default async function handler(req, res){

    if(req.method === "POST"){
        try {
            await mongodb.dbConnect();
            const { Studien_ID } = req.body; // Daten aus der Anfrage 
            
            const gefundenePatienten = await PatientModel.find({Studie: Studien_ID})

            if (gefundenePatienten.length > 0) {
                console.log('Gefundene Benutzer:', gefundenePatienten);
              } else {
                console.log('Keine Benutzer mit der gesuchten Studien_ID gefunden.');
              }

            res.status(201).json(gefundenePatienten);  

        }catch (error){
            console.log(error)
            res.status(500).json({message:'Fehler beim fetchen der Patiententabelle'});
        }
    };
}