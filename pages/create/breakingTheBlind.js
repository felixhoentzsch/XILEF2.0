"use client"

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Spacer from "@/komponenten/Spacer";
import { useSession } from "next-auth/react";

export default function BreakingTheBlind() {

  const {data:session} = useSession();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [list, setList] = useState([]);
  const [segments, setSegments] = useState([]);

  const showSegments = (listData, segmentSize) => {
    const updatedSegments = [];
    for (let i = 0; i < listData.length; i += segmentSize) {
      const segment = listData.slice(i, i + segmentSize);
      updatedSegments.push(segment);
    }
    setSegments(updatedSegments);
  };

  const showList = async () => {

    setError ('')
    setSuccess('')

    const Studie = session.user.Studie
    console.log(Studie)

    if(Studie){
      const key = {
        Studie
      };
      try {
        const response = await axios.post("http://localhost:3000/api/fetchList", key, {
          headers: {
            'Content-Type': 'application/json',
          },
        });        
        if (response.status === 201) {
          const listData = response.data;
          setList(listData);
          console.log(listData);
          setSuccess('Liste erfolgreich angezeigt');
          // Einbetten der showSegments-Logik
          showSegments(listData, 10);
        } else {
          setError('Fehler beim fetchen der Liste');
        }
      } catch (error) {
          setError("Fehler beim übermittlen des Schlüssels");
        }
    }else{
      setError("Der User konnte keiner Studie zugeordnet werden");
    }
  }

  return (
    <div className="text-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="sucsess-message">{success}</div>}
      <h3>
        Mit dem Drücken des Buttons wird Ihnen die Randomiserungsliste der Studie angezeigt. <br />
        Es wird ein Vermerk angefertigt, welcher bestätigt, dass dies geschehen ist.
      </h3>
      <button type="submit" onClick={showList} className="btn btn-primary">
        Liste anzeigen
      </button>
      <Spacer/>
      {segments.map((segment, index) => (
        <div key={index}>
          <h4>Segment {index + 1}</h4>
          <ul>
            {segment.map((element, innerIndex) => (
              <li key={innerIndex}>{element}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className='spacer'/>
    </div>
  ); 
}
