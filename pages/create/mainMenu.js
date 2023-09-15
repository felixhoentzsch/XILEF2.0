"use client";

import { signOut } from "next-auth/react";


import Link from "next/link"
import styles from '../../styles/Button.module.css'
import { useState } from "react"
import cookie from 'cookie'
import mongodb from "@/utils/mongodb"
import studie from "@/models/studie"

import Popup from '../../komponenten/FirstLoginPopUp'


export default function mainMenu() {



    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState(null);
  
    const handleSave = (data) => {
      // Hier können Sie die Daten verarbeiten, z.B. an die API senden
      setFormData(data);
    }
    
    
  return (

     <div className='text-container'>
        <h2>Willkommen zum Erstellen <br/> einer neuen Studie</h2>
        
        <div className='hr-container'>
            <p className='hr-vert'></p>
        </div>
        <div className="menu-container">
            <span className="welcome">
                <p> Willkommen</p>
            </span>
            <Link href="">
            <button className ={styles.wide}>
                 <p>Stratifizierungskriterien festlegen</p>
            </button>
            </Link>
            <div className="hr-container">
                <p className="hr-vert-small"></p>
              </div>	
            <Link href="">
            <button className ={styles.wide}>
                    <p>Randomisierungsmethoden festlegen</p>
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
            <div className="hr-container">
                <p className="hr-vert-small"></p>
              </div>	
            <button onClick={() => signOut()}>Logout</button>  
            {/* <Link href ="/create">
                <span className="menu-item">Logout</span>
            </Link> */}



            <div>
      <button onClick={() => setIsPopupOpen(true)}>Popup öffnen</button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
      />
      {formData && (
        <div>
          <p>Studiennamen: {formData.studienName}</p>
          <p>Zentrum-ID: {formData.zentrumID}</p>
        </div>
      )}
    </div>



        </div>
    </div>

   
  )
}
