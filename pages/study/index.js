"use client"
import React from 'react';

// import { useRouter } from "next/router"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import styles from '../../styles/Button.module.css'
import {signIn} from "next-auth/react"


export default function index() {

    const [username, setBenutzer] = useState(null);
    const [passwort, setPasswort] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();

    // const login = async () =>{
    //     //  alert(benutzer + " " + passwort+ "und" + setBenutzer + " "+ setPasswort)
    //     try{    
    //         await axios.post("http://localhost:3000/api/login",{
    //             benutzer,
    //             passwort
    //         })
    //         //console.log("geht")
    //         router.push("/create/mainMenu")
    //     }catch(error){
    //         setError(true)
    //     }
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await signIn("credentials", {
            username,
            passwort,
            redirect: false,
          });
    
          if (res.error) {
            setError("ungültige Benutzerdaten");
            return;
          }
    
          router.replace("study/mainMenu");
        } catch (error) {
          console.log(error);
        }
      };
      
      
        

  return (

    <div className="form-container">
        <div className="headline">
            <div className="brand">xilef
            </div>	
            <div>
                <p>XILEF</p>
            </div>
            {/* style="	font-size: 18px; font-weight: bold;" */}
            <div className="hr-container">
                <p className="hr-vert-small"></p>
            </div>	
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                {error && <p className="error-message">{error}</p>}
                    <label for="name">Benutzername: </label> 
                    <div className="tooltip"><button className={styles.tip} >?</button>
                        <span className="tooltiptext">Benutzen Sie bitte die Ihnen mitgeteilten <br/> Anmeldedaten!</span>
                     </div>
                    <span className="input-span"><input type="text" name="login-name" onChange={(e) => setBenutzer(e.target.value)}></input></span>
                </div>
                <div className="form-group">
                    <label for = "password">Passwort: </label> 
                    <span className="input-span"><input type="password" name="login-password" onChange={(e) => setPasswort(e.target.value)}></input></span>
                </div>
                <div className="form-group">
                    <button name="login">LOGIN</button>
                </div>
            </form>
        </div>
	</div>
  )
}
