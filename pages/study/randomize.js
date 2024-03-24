"use client"

import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react'
import Spacer from "@/komponenten/Spacer";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { resolve } from 'path';

export default function Randomize() {

  const {data:session} = useSession();
  // const user = session.user.username
  // console.log(user)

  const [error, setError] = useState('');
  const [sucsess, setSucsess] = useState('')
  const [patientName, setPatientName] = useState('');

  const [patient, setPatient] = useState('') 
  const [treatment, setTreatment] = useState([])
  const [Zentrum, setZentrum] = useState('')
  const [group, setGroup] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [selectedTreatment, setSelectedTreatment] = useState('')

  const [study, setStudy] = useState([]);
  const [stratification, setStraticication] = useState([])
  const [merkmale, setMerkmale] = useState([])

  const [selectedOptions, setSelectedOptions] = useState(() => initializeSelectedOptions());

  const router = useRouter();

  const Benutzer = session?.user?.username

  function initializeSelectedOptions() {
    return stratification.map(() => null);
  }
  const handleOptionChange = (index, optionValue) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = optionValue;
    setSelectedOptions(updatedSelectedOptions);
    console.log(selectedOptions)
  };

  useEffect(() => {
    sendPostRequest();
}, []);

async function sendPostRequest() {
  const key = {
    Benutzer
  };
    try {
        const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchStudyData", key, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            console.log('POST-Anfrage erfolgreich:', response.data);
            setStudy(response.data);
            //setSuccess('Studie erfolgreich angelegt');
        } else {
            setError('Fehler beim aufrufen der Studiendaten');
        }
    } catch (error) {
        setError("Fehler beim Anlegen der Studie");
    }
}

useEffect(() => {
    if (study.length > 0) {
        const firstStudy = study[0];
        setStraticication(firstStudy.Stratifizierung)
        setMerkmale(firstStudy.Merkmale)
    }
}, [study]);

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
        selectedOptions
      };

      try {
        const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/patients", newPatient, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 201) {
          setPatient(response.data)   
          //console.log(response.data)     
          setSucsess('Patient erfolgreich randomisiert');
          // router.push({
          //   pathname: 'randomizePatient',
          //   query:{
          //     Name: patientName,
          //     Zentrum: Zentrum,
          //     Behandlung: selectedTreatment,
          //     createdAt: createdAt

          //   },
          // });
          setPatientName('') 
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

useEffect(() => {
  if (patient.length > 0) {
    const Behandlung = patient[1];
    setTreatment(Behandlung);
    //console.log('Behandlungen: '+treatment)
    const patientOne = patient[0];
    setPatientName(patientOne.ID)
    setZentrum(patientOne.Zentrum);
    setGroup(patientOne.group);
    setCreatedAt(patientOne.createdAt);
  }
}, [patient]); // Führen Sie diesen Effekt nur aus, wenn sich der Wert von patient ändert

useEffect(() => {
  if (treatment && group) {
    setSelectedTreatment(treatment[group]);
    //console.log('Test '+selectedTreatment)
  }
}, [treatment, group]); // Führen Sie diesen Effekt nur aus, wenn sich der Wert von treatment oder group ändert

useEffect(() => {
  if (selectedTreatment !== '') { // Überprüfen, ob selectedTreatment einen Wert hat
    router.push({
      pathname: 'randomizePatient',
      query:{
        Name: patientName,
        Zentrum: Zentrum,
        Behandlung: selectedTreatment,
        createdAt: createdAt,
        Strata: selectedOptions
      },
    });
  }
}, [selectedTreatment]);


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

      {stratification.map((stratification, index) => (
        <div key={index}>
          <label className='p2'>{stratification}:</label>
          <br/>
          {merkmale[index].map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={stratification}
                value={option}
                checked={selectedOptions[index] === option}
                onChange={() => handleOptionChange(index, option)}
                style={{marginRight: "3px"}}
              />
              {option}
            </label>
          ))}
          <Spacer/>
        </div>
      ))}

      <button type="submit" onClick={randomizePatient} className="btn btn-primary" style={{width: "150px"}}>
        randomisieren
      </button>

      {/* <div>
        <h2>Ausgewählte Optionen:</h2>
        {stratification.map((stratification, index) => (
          <p key={index}>{stratification}: {selectedOptions[index] !== null ? selectedOptions[index] : "Keine Auswahl"}</p>
        ))}
      </div> */}

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
