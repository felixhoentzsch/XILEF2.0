"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


import Link from "next/link"
import axios from 'axios';
import styles from '../../styles/Button.module.css'
import React, { useEffect, useState } from "react";
import Spacer from "@/komponenten/Spacer";
import {Tooltip} from 'react-tooltip';


export default function MainMenu() {

  const [error, setError] = useState('')
  const [success, setSuccess]= useState('')
  const [user, setUser] = useState([])
  const [username, setUsername] = useState("")
  const [studyID, setStudyID] = useState("")
  const [role, setRole] = useState("")

  const {data:session} = useSession();
  console.log({data:session}) //Session anscheinend leer, kann aber Daten aufrufen 
  //const Studie = session?.user?.Studie
  const Benutzer = session?.user?.username

  useEffect(() => {
    sendPostRequest();
  }, []);

  async function sendPostRequest() {
    const key = {
      Benutzer
    };
      try {
          const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchUser", key, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.status === 201) {
              console.log('POST-Anfrage erfolgreich:', response.data);
              setUser(response.data);
          } else {
              setError('Fehler beim aufrufen des Nutzers');
          }
      } catch (error) {
          setError("Fehler im tryBlock");
      }
  }

  useEffect(() => {
    if(user.length>0){
      const firstUser = user[0];
      setUsername(firstUser.username)
      setStudyID(firstUser.Studien_ID)
      setRole(firstUser.role)
    }

  })

  function handleSignOut() {
    signOut({ callbackUrl: '/home' }); // Hier kannst du die gewünschte Seite angeben
  }


  return (

    <div className='text-container'>
      {error && <div className="error-message">{error}</div>} 
      {success && <div className="sucsess-message">{success}</div>}
      <h2>Willkommen zum Erstellen und Bearbeiten <br /> Ihrer Studie</h2>
      <p className="text">Sie sind eingeloggt mit dem Benutzer: {username} </p>

      <Spacer/>

      <div className="menu-container">
        {studyID === "" &&
          <Link href="/create/basics">
            <button className={styles.wide}>
              <p>Studienparameter</p>
            </button>
          </Link>
        }

        {studyID !== "" &&
          <Link href="/create/studyOverview">
            <button className={styles.wide}>
              <p>Studienangaben ansehen</p>
            </button>
          </Link>
        }

        <Spacer/>

        {studyID === "" &&
          <Link href="/create/newStaffMember">
            <div className="tooltip">
              <button disabled={!studyID} className={styles.disabled}>
                <p>neue Studienaccounts anlegen</p>
              </button>
                <span className="tooltiptext">
                  Wenn ich groß bin, werde ich ein informativer Text
                </span>
            </div>  
          </Link>   
        }
        {studyID !== "" &&
          <Link href="/create/newStaffMember">
            <button className={styles.wide}>
              <p>neue Studienaccounts anlegen</p>
            </button>      
          </Link>
        }

        <Spacer />

        {role === "MASTER" && studyID !== "" ?
          <>
            <Link href="/create/breakingTheBlind">
              <button className={styles.wide}>
                <p>Randomiserungsliste</p>
              </button>
            </Link>

            <Spacer/> 

          </>
          :
          <>
            <Link href="/create/breakingTheBlind">
              <button className={styles.disabled} disabled>
                <p>Randomiserungsliste</p>
              </button>
            </Link>

            <Spacer/>
          </>
        }
        <button onClick={handleSignOut}>Logout</button>
        <div className="spacer"/>
      </div>
    </div>
  )
}


//  <div className="hr-container">
// <p className="hr-vert-small"></p>
// </div> 
// <Link href=''>
// <button className={styles.wide}>
// <p>Stratifizierungskriterien festlegen</p>
// </button>
// </Link>
// <div className="hr-container">
// <p className="hr-vert-small"></p>
// </div>	
// <Link href="">
// <button className ={styles.wide}>
//     <p>Randomisierungsmethoden festlegen</p>
// </button>
// </Link>
// <div className="hr-container">
// <p className="hr-vert-small"></p>
// </div>	




