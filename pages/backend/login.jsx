"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";
import Spacer from "@/komponenten/Spacer";


export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [mail, setmail] = useState("");
  const [passwort, setPasswort] = useState("");
  //const [Zentrum_ID, setZentrum] = useState("");
  //const [Studien_ID, setStudie] = useState("");

  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState('')
  const router = useRouter();

  const role = "MASTER"; // Master als Hardcode, da nur dies zulässig

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    if (!username || !mail || !passwort || !role) {
      setError("Es sind alle Felder auszufüllen.");
      return;
    }

    try {
      const resUserExists = await fetch("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Der angelegte Benutzer existiert bereits.");
        return;
      }

      const res = await fetch("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          passwort,
          role,
          mail
        }),
      });

      if (res.ok) {
        setUsername("")
        setPasswort("")
        setmail("")
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
      {error && <div className="error-message">{error}</div>}
      
      <h2 className="schrifth2">neuer Masteraccout</h2>

      <div class="hr-container">
        <p class="hr-vert"/>
      </div>
      <label className="p2">Nutzername</label>
      <span className="input-small-span">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          pattern="[a-zA-Z0-9_-]+"
          maxLength={30}
          placeholder="Benutzer01"
        />
      </span>
      <Spacer/>
      <label className="p2">Passwort</label>
      <span className="input-small-span">
        <input
          type="password"
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
          required
          maxLength={30}
          placeholder="......"
        />
      </span>
      <Spacer/>
      <label className="p2">e-mail Adresse</label>
      <span className="input-small-span">
        <input
          type="text"
          value={mail}
          onChange={(e) => setmail(e.target.value)}
          required
          maxLength={30}
          placeholder="beispiel@provider.com"
        />
      </span>
      <Spacer/>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        Erstellen
      </button>


 
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