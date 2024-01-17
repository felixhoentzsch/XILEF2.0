"use Client";

import { useState } from "react";
import styles from '../../styles/Button.module.css'
import axios from "axios";
import Image from "next/image";

import { useSession } from "next-auth/react";

export default function NewStaffMember() {
    const [username, setUsername] = useState('');
    const [passwort, setPasswort] = useState('');
    const [role, setRole] = useState('option0'); // Hier kannst du die Standardrolle festlegen
    const [mail, setMail] = useState('')
    const [staffMembers, setStaffMembers] = useState([]); // Verwende den Plural, da es sich um eine Liste handelt

    const [error, setError] = useState('')
    const [sucsess, setSucsess] = useState('')

    //Platzhalter 
    const Zentrum_ID = 999
    //const Studien_ID = 999

    const {data:session} = useSession();
    const Studie = session?.user?.Studie
    const Studien_ID = Studie
    console.log(Studie)

    const updateTable = async () =>{
        const key = {
            Studien_ID
        };

        try {
            const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchUserData", key, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                const savedStaffMember = response.data;
                console.log(savedStaffMember)
                setStaffMembers([...staffMembers, ...savedStaffMember]);
                setSucsess('Nutzertabelle erfolgreich aktualisiert')
            } else if(response.status === 422) {
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


    const createStaffMember = async () => {

        setError('');
        setSucsess('') //error oder sucsess wieder leeren

        if (username && passwort && role !== 'option0' && Zentrum_ID && Studien_ID && mail) {
            const newStaffMember = {
                username,
                passwort,
                role,
                Zentrum_ID,
                Studien_ID,
                mail
            };
  
            try {
                const resUserExists = await fetch('https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/userExists', {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username})
                })
                const {user} = await resUserExists.json()
                if(user){
                    setError("Ein User mit dem eingegebenen Namen existiert schon!")
                    return;
                }
                const response = await axios.post("http://localhost:3000/api/users", newStaffMember, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
  
                if (response.status === 201) {
                    const savedStaffMember = response.data;
                    setStaffMembers([...staffMembers, savedStaffMember]);
                    setUsername('');
                    setPasswort('');
                    setRole('option0');
                    setMail('');
                    setSucsess('Nutzer erfolgreich angelegt')
                } else if(response.status === 422) {
                    setError('Der Nutzer exisitiert bereits')
                }else {
                    // Fehler beim Speichern des Mitarbeiters
                    setError('Fehler beim Speichern des Mitarbeiters');
                }
            }catch (error) {
                //setError('Fehler beim Senden der Anfrage:', error.response);
                setError("Fehler!")
            }
        }else {
            setError("Alle Felder sind auzufüllen!")
        }
    };

    // Handler-Funktion, um den ausgewählten Radio-Button zu aktualisieren
    const handleOptionChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div className="text-container">
            {error && <div className="error-message">{error}</div>}
            {sucsess && <div className="sucsess-message">{sucsess}</div>}

            <h2>Mitarbeiter erstellen</h2>

            <div class="hr-container">
                <p class="hr-vert"/>
            </div>	


            <label className="p2">Benutzername</label>
            <span className="input-small-span">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    pattern="[a-zA-Z0-9_-]+"
                    maxLength={30}
                />
            </span>

            <div class="hr-container">
                <p class="hr-vert-small"/>
            </div>

            <label className="p2">Passwort</label>
            <span className="input-small-span">    
                <input
                    type="text"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    required
                    pattern="[a-zA-Z0-9_-]+"
                    maxLength={30}
                />
            </span>

            <div class="hr-container">
                <p class="hr-vert-small"/>
            </div>

            <div>
                <label className="p2">Rolle</label>                   
                <div className="tooltip">
                    <button className={styles.tip} >?</button>
                    <span className="tooltiptext"> Hier kommt die Erklärung der Rollen hin!</span>
                </div>
                <br/>
                <select className="select p2" value={role} onChange={handleOptionChange}>
                    <option value="option0"> bitte wählen Sie eine Rolle aus</option>
                    <option value="Koordinator(Einrichtung)">Koordinator(Einrichtung)</option>
                    <option value="Head">Head</option>
                    <option value="Randomisierer">Randomisierer</option>
                </select>
            </div>

            <div class="hr-container">
                <p class="hr-vert-small"/>
            </div>

            <label className="p2">e-mail</label>
            <span className="input-small-span">    
                <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    maxLength={100}
                />
            </span>

            <div class="hr-container">
                <p class="hr-vert-small"/>
            </div>

            <button type="submit" onClick={createStaffMember} className="btn btn-primary">
                Erstellen
            </button>
            <button type="submit" onClick={updateTable} className="btn btn-primary">
                aktualisieren
            </button>
            <br/>
            <br/>
            <br/>


            {/* Tabelle mit allen StaffMembers */}

            <table>
                <caption>Liste aller Studienmitarbeiter         
                    <button type="button" className={styles.tip} onClick={updateTable}>
                        <span>🔄</span> 
                    </button>
                </caption>
                <thead>
                    <tr>
                        <th className="p2">Benutzername</th>
                        <th className="p2">Passwort</th>
                        <th className="p2">Rolle</th>
                        <th className="p2">e-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {staffMembers.map((staffMember, index) => (
                        <tr key={index}>
                            <td>{staffMember.username}</td>
                            <td>{staffMember.passwort}</td>
                            <td>{staffMember.role}</td>
                            <td>{staffMember.mail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
