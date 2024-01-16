"use client"

import React from 'react'
import axios from "axios";
import { useState } from 'react'
import Spacer from "@/komponenten/Spacer";
import { useSession } from "next-auth/react";

export default function Randomize() {

  const {data:session} = useSession();
  // const user = session.user.username
  // console.log(user)

  const [error, setError] = useState('');
  const [sucsess, setSucsess] = useState('')
  const [patientName, setPatientName] = useState('');

  const randomizePatient = async () => {
    setError ('')
    setSucsess('')
    const Zentrum = session.user.Zentrum
    const Studie = session.user.Studie
    console.log(Studie)
    //const Eintrag = 1

    if(patientName){
      const newPatient = {
        patientName,
        Zentrum,
        Studie,
      };

      try {
        const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/patients", newPatient, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 201) {
          setPatientName('')         
          setSucsess('Patient erfolgreich randomisiert');
        } else {
          setError('Fehler beim Speichern des Patienten');
        }
      } catch (error) {
          setError("Fehler beim Anlegen des Patienten");
        }
    } else {
        setError("Alle Felder sind auszufüllen");
      }
  }

  return (
    <div className='text-container'>
      {error && <div className="error-message"> {error}</div>}
      {sucsess && <div className="sucsess-message">{sucsess}</div>}

      <h2>Randomiserung</h2>

      <div className="hr-container">
        <p className="hr-vert" />
      </div>

      <label className="p2">Patienten ID</label>
      <span className="input-small-span">
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          pattern="[a-zA-Z0-9_-]+"
          maxLength={30}
        />
      </span>

      <Spacer/>

      <button type="submit" onClick={randomizePatient} className="btn btn-primary">
        randomisieren
      </button>
    </div>
  )
}


// Idee für den code zum Mailversand: 

// //installieren von nodemailer
// npm install nodemailer

// const nodemailer = require('nodemailer');

// // Konfiguration für den E-Mail-Versand
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'deine@gmail.com',
//     pass: 'deinEmailPasswort',
//   },
// });

// // E-Mail-Optionen
// const mailOptions = {
//   from: 'deine@gmail.com',
//   to: 'empfaenger@example.com',
//   subject: 'Betreff der E-Mail',
//   text: 'Inhalt der E-Mail',
// };

// // Senden der E-Mail
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Fehler beim Senden der E-Mail:', error);
//   } else {
//     console.log('E-Mail gesendet: ' + info.response);
//   }
// });
