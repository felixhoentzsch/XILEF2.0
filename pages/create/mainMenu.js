"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


import Link from "next/link"
import styles from '../../styles/Button.module.css'
import React from "react";
import Spacer from "@/komponenten/Spacer";


export default function MainMenu() {

  const {data:session} = useSession();
  console.log({data:session}) //Session anscheinend leer, kann aber Daten aufrufen 
  const Studie = session?.user?.Studie

  return (

    <div className='text-container'>
      <h2>Willkommen zum Erstellen <br/> einer neuen Studie</h2>
      <p className="text">Sie sind eingeloggt mit dem Benutzer: {session?.user?.username} </p>

      <div className='hr-container'>
        <p className='hr-vert'></p>
      </div>
      <div className="menu-container">
        <Link href="/create/basics">
          <button className={styles.wide}>
            <p>Basics</p>
          </button>
        </Link> 
        <div className="hr-container">
          <p className="hr-vert-small"></p>
        </div>
        <Link href="/create/newStaffMember">
          <button className ={styles.wide}>
            <p>neue Studienaccounts anlegen</p>
          </button>
        </Link>
        <Spacer/>
        <Link href="/create/breakingTheBlind">
          <button className={styles.wide}>
            <p>Randomiserungsliste</p>
          </button>
        </Link>
        <div className="hr-container">
          <p className="hr-vert-small"></p>
        </div>     	
        <button onClick={() => signOut()}>Logout</button>  
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




