"use client"


import React, { useEffect } from 'react'
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

  const [study, setStudy] = useState([])
  const [Behandlung, setBehandlung] = useState('')

  const {data:session} = useSession();
  const Studien_ID = session?.user?.Studie
  const Benutzer = session?.user?.username

  useEffect(() => {
    updateTable();
    getStudy();
  }, []);
  
  useEffect(() => {
    if (study.length > 0) {
      const study1 = study[0];
      const Behandlung = study1.Name_Behandlung;
  
      const updatedPatients = patients.map((patient, index) => {
        return {
          ...patient,
          //group: index < Behandlung.length ? index.toString() : '',
          group: Behandlung[1]
          //treatment: Behandlung[index] || ''
        };
      });
  
      setPatients(updatedPatients);
      console.log(updatedPatients)
    }
  }, [study, patients]);
  
  

  const updateTable = async () =>{
    const key = {
      Studien_ID
    };  
    try {
      const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchPatientsData", key, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     if (response.status === 201) {
      const savedPatients = response.data;
      console.log(savedPatients)
      setPatients([...savedPatients]);
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

  const getStudy = async () =>{
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
      const study = response.data;
      setStudy(study)
      console.log('Test'+study)
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


  const handleNavigation = ()=>  {
    router.push("/study/mainMenu")
  }    

  return (
    <div className='text-container'>
      {error && <div className="error-message">{error}</div>}
      {sucsess && <div className="sucsess-message">{sucsess}</div>}

      <table>
        <caption>Liste aller Patienten         
          {/* <button type="button" className={styles.tip} onClick={updateTable}>
            <span>🔄</span> 
          </button> */}
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

      <button type="submit" onClick={handleNavigation} className="btn btn-primary">
        zurück
      </button>
    </div>
  )
}




