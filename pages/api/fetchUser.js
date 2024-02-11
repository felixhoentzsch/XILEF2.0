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
            
            const gefundeneBenutzer = await UserModel.find({username:Benutzer})

            if (gefundeneBenutzer.length > 0) {
                console.log('Gefundene Benutzer:', gefundeneBenutzer);
              } else {
                console.log('Keine Benutzer mit der gesuchten Studien_ID gefunden.');
              }

            res.status(201).json(gefundeneBenutzer);  

        }catch (error){
            console.log(error)
            res.status(500).json({message:'Fehler beim fetchen der userTabelle'});
        }
    };
}