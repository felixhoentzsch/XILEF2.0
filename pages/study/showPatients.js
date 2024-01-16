"use client"


import React from 'react'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"
import styles from '../../styles/Button.module.css'
import Spacer from '@/komponenten/Spacer';


export default function ShowPatients() {

  const router = useRouter();

  const [patients, setPatients] = useState([]); // Verwende den Plural, da es sich um eine Liste handelt

  const [error, setError] = useState('')
  const [sucsess, setSucsess] = useState('')

  const {data:session} = useSession();
  const Studie = session?.user?.Studie
  const Studien_ID = Studie

  const updateTable = async () =>{
    const key = {
      Studien_ID
    };  
    try {
      const response = await axios.post("http://localhost:3000/api/fetchPatientsData", key, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     if (response.status === 201) {
      const savedPatients = response.data;
      console.log(savedPatients)
      setPatients([...patients, ...savedPatients]);
      setSucsess('Patiententabelle erfolgreich aktualisiert')
      }else if(response.status === 422) {
        setError('Fehler 1')
      }else {
        // Fehler beim Speichern des Mitarbeiters
        setError('Fehler 2');
      }
    } catch (error) {
      //setError('Fehler beim Senden der Anfrage:', error.response);
      setError("Fehler 3!")
    }   
  }

  const back = ()=>  {
    router.push("/study/mainMenu")
  }    

  return (
    <div className='text-container'>
      {error && <div className="error-message">{error}</div>}
      {sucsess && <div className="sucsess-message">{sucsess}</div>}

      <table>
        <caption>Liste aller Patienten         
          <button type="button" className={styles.tip} onClick={updateTable}>
            <span>🔄</span> 
          </button>
        </caption>
        <thead>
          <tr>
            <th className="p2">Patienten ID</th>
            <th className="p2">Gruppe</th>
            <th className="p2">Strata</th>
            <th className="p2">Zentrum</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patients, index) => (
            <tr key={index}>
              <td>{patients.ID}</td>
              <td>{patients.group}</td>
              <td>{patients.Strata}</td>
              <td>{patients.Zentrum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Spacer/>

      <button type="submit" onClick={back} className="btn btn-primary">
        zurück
      </button>
    </div>
  )
}
