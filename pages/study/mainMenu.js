"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect } from 'react';


import Link from "next/link"
import styles from '../../styles/Button.module.css'
import { useState } from "react"
import React from "react";


import Popup from '../../komponenten/FirstLoginPopUp'
import { get } from "mongoose";
import Spacer from "@/komponenten/Spacer";


export default function MainMenu() {

  const router = useRouter();

  const {data:session} = useSession();
  // const {data:session} = getSession();
  console.log({data:session}) //Session anscheinend leer, kann aber Daten aufrufen 
  //const Studie = session?.user?.Studie

  useEffect(() => {
    if (!session?.user?.username) {
      router.push("/");
    }
  },);
 
  return (

    <div className='text-container'>
      <h2>Herzlich Willkommen <br/> zur Studie: {session?.user?.Studie}</h2>
      <p className="text">Sie sind eingeloggt mit dem Benutzer: {session?.user?.username} </p>

      <div className='hr-container'>
        <p className='hr-vert'></p>
      </div>
      <div className="menu-container">

        <Link href="/study/randomize">
          <button className={styles.wide}>
            <p>Randomisierung</p>
          </button>
        </Link> 
        {session?.user?.role === "MASTER" && (
          <div>
            <Spacer/>
            <Link href="/study/showPatients">
              <button className={styles.wide}>
                <p>Übersicht</p>
              </button>
            </Link>
          </div>
        )}
        <div className="hr-container">
          <p className="hr-vert-small"></p>
        </div>	
        <button onClick={() => signOut()}>Logout</button>  
        <div className="spacer"/>
      </div> 
    </div>
  )
}