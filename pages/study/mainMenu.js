"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";


import Link from "next/link"
import styles from '../../styles/Button.module.css'
import { useState } from "react"
import React from "react";


import Popup from '../../komponenten/FirstLoginPopUp'
import { get } from "mongoose";


export default function mainMenu() {

       const {data:session} = useSession();
    // const {data:session} = getSession();
    console.log({data:session}) //Session anscheinend leer, kann aber Daten aufrufen 
    const Studie = session?.user?.Studie



  
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    

    // if (session) {
    //     // Session is still loading or user is not logged in
    //     return <div>Session ist da</div>;
    //   }
    
    //   // Check if user data exists in the session
    //   if (!session.user) {
    //     return <div>User ist auch nicht da</div>;
    //   }
    
    //   // Now you can safely access session.user
    //   const { username, email } = session.user;
    
    //   return (
    //     <div>
    //       <h1>User Profile</h1>
    //       <p>Username: {username}</p>
    //       <p>Email: {email}</p>
    //     </div>
    //   );


    
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
                <p>"Basics"</p>
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