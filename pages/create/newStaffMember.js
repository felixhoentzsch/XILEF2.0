"use Client";

import { useEffect, useState } from "react";
import styles from '../../styles/Button.module.css'
import axios from "axios";

import { useSession } from "next-auth/react";
import {useRouter} from 'next/router'
import Spacer from "@/komponenten/Spacer";

export default function NewStaffMember() {
    const [username, setUsername] = useState('');
    const [passwort, setPasswort] = useState('');
    const [role, setRole] = useState('option0'); // Hier kannst du die Standardrolle festlegen
    const [ZentrumID, setZentrumID] = useState('')
    const [studyID, setStudyID] = useState("")
    const [user, setUser] = useState("")
    const [mail, setMail] = useState('')
    const [staffMembers, setStaffMembers] = useState([]); // Verwende den Plural, da es sich um eine Liste handelt

    const [error, setError] = useState('')
    const [sucsess, setSucsess] = useState('')

    //Platzhalter 
    //const Zentrum_ID = 999

    const Studien_ID = studyID 

    const router = useRouter();
    const {data:session} = useSession();
    const Benutzer = session?.user?.username
    //const Studien_ID = session?.user?.Studie
    //console.log(Studien_ID)

    // Passwort generieren für Rolle Info --> keiner muss das Passwort kennen, da sie nur über Mails benarichtigt werden
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

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
          setStudyID(firstUser.Studien_ID)
        }
    
      }, [user])
 
    useEffect(() => {
        updateTable();
    }, [])

    const updateTable = async () =>{
        const key = {
            Benutzer
        };

        try {
            const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchUserData", key, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                const savedStaffMember = response.data;
                console.log(response.data)
                setStaffMembers([...staffMembers, ...savedStaffMember]);
                //setSucsess('Nutzertabelle erfolgreich aktualisiert')
            } else if(response.status === 422) {
                setError('Fehler: keine Nutzer gefunden')
            }else {
            // Fehler beim Speichern des Mitarbeiters
                setError('Fehler 2');
            }
        } catch (error) {
          //setError('Fehler beim Senden der Anfrage:', error.response);
            setError("Fehler bei der Abfrage!")
        }   
    }


    const createStaffMember = async () => {

        setError('');
        setSucsess('') //error oder sucsess wieder leeren

        if(role === "Info"){
            setPasswort(generateRandomString(10))
        }

        if (username && passwort && role !== 'option0' && studyID && Studien_ID && mail) {
            const newStaffMember = {
                username,
                passwort,
                role,
                ZentrumID,
                Studien_ID,
                mail
            };
  
            try {
                const resUserExists = await fetch('/../api/userExists', {
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
                const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/users", newStaffMember, {
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

    const handleNavigation = () => {
        router.push('/create/mainMenu')
    } 

    return (
        <div className="text-container">
            {error && <div className="error-message">{error}</div>}
            {sucsess && <div className="sucsess-message">{sucsess}</div>}

            <h2>Mitarbeiter erstellen</h2>
	
            <Spacer/>
            
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

            <Spacer/>

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
                    <option value="Info">Info</option>
                    <option value="Randomisierer">Randomisierer</option>
                </select>
            </div>

            <Spacer/>

            {role !== "Info" &&
                <>
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

                    <Spacer/>
                </>
            }

            <label className="p2">Zentrum</label>
            <span className="input-small-span">    
                <input
                    type="text"
                    value={ZentrumID}
                    onChange={(e) => setZentrumID(e.target.value)}
                    required
                    maxLength={100}
                />
            </span>

            <Spacer/>

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

            <Spacer/>

            <button type="submit" onClick={createStaffMember} className="btn btn-primary">
                Erstellen
            </button>
            <br/>
            <br/>
            <br/>


            {/* Tabelle mit allen StaffMembers */}

            <table>
                <caption>Liste aller Studienmitarbeiter         
                    {/* <button type="button" className={styles.tip} onClick={updateTable}>
                        <span>🔄</span> 
                    </button> */}
                </caption>
                <thead>
                    <tr>
                        <th className="p2">Benutzername</th>
                        {/* <th className="p2">Passwort</th> */}
                        <th className="p2">Rolle</th>
                        <th className="p2">e-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {staffMembers.map((staffMember, index) => (
                        <tr key={index}>
                            <td>{staffMember.username}</td>
                            {/* <td>{staffMember.passwort}</td> */}
                            <td>{staffMember.role}</td>
                            <td>{staffMember.mail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Spacer/>

            <button onClick={handleNavigation}>
                <p>Zurück</p>
            </button>
            <div className="spacer"/>
        </div>
    );
}
