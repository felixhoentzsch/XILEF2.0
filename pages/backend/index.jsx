"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";


export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [mail, setmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [role, setRole] = useState("");
  const [Zentrum_ID, setZentrum] = useState("");
  const [Studien_ID, setStudie] = useState("");

  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState('')
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !mail || !passwort || !role || !Zentrum_ID || ! Studien_ID) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          passwort,
          role,
          Zentrum_ID,
          Studien_ID,
          mail
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setSucsess("Ein neuer Maseraccount wurde erfolgreich angelegt.")
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };




  return (
    

    <div className="text-container">
      {sucsess && <div className="sucsess-message">{sucsess}</div>}
      
        <h2 className="schrifth2">neuer Masteraccout</h2>

        <div class="hr-container">
            <p class="hr-vert"/>
        </div>




            <form onSubmit={handleSubmit} className="">
            <div className="card">

                <div className="column">
                    <div className="row">
                <label className="p2">Nutzername</label>
                <input className="p2"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Benutzer01"
                />
                </div>
                <div className="row">
                <label className="p2">Passwort</label>     
                <input className="p2"
                    onChange={(e) => setPasswort(e.target.value)}
                    type="password"
                    placeholder="......."
                />
                </div>
                <div className="row">
                <label className="p2">Rolle</label>
                <input className="p2"
                    onChange={(e) => setRole(e.target.value)}
                    type="text"
                    placeholder="hier nur MASTER eintragen!"
                    pattern="MASTER"
                />
                <p>Könnte man auch Hardcoden da Masteraccount erstellt werden soll</p>
                </div>
                <div className="row">
                {error && (
            <div className="error-message">
              {error}
            </div>
          )}
                </div>

                
                </div>
                <div className="column">
                    <div className="row">
                    <label className="p2">Zentrum ID</label>
                <input className="p2"
                    onChange={(e) => setZentrum(e.target.value)}
                    type="number"
                    placeholder="1"
                />
                    </div>
                <div className="row">
                <label className="p2">Studien ID</label>
                <input className="p2"
                    onChange={(e) => setStudie(e.target.value)}
                    type="number"
                    placeholder="1"
                />
                    </div> 
                    <div className="row">
                    <label className="p2">email Adresse</label>
                <input className="p2"
                    onChange={(e) => setmail(e.target.value)}
                    type="text"
                    placeholder="Beispiel@provider.com"
                />
                </div>   
                </div>



        </div>
        <div class="hr-container">
            <p class="hr-vert-small"/>
        </div>
          <button>
            Register
          </button> 
        </form>

</div>
  );
}

export async function getServerSideProps(ctx) {
    const meinCookie = ctx.req?.cookies || "";
    if (meinCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/backend/login",
                permant: false
            }
        }
    }
    return {
        props:{

    }}
}    