"use client"

import React from 'react'
import { useRouter } from 'next/router';


import { useState } from "react";
import Spacer from '@/komponenten/Spacer';
import MainMenu from './mainMenu';


export default function StudyOverview() {

    const [success, setSuccess] = useState('Studie erfolgreich angelegt');

    const router = useRouter();
    const { studyName, randomize, RandomizationParameter, inputFields, nameFields, blocks } = router.query;

    var method 
    var value
    var RandVerh
    var groupName


    if(randomize === "coin"){
        method = "Biased Coin"
        value = parseFloat(RandomizationParameter);
        const remainingString = RandomizationParameter.slice(String(value).length);

        //console.log("Float-Wert:", value);
        //console.log("Verbleibender String:", remainingString);

    }else if(randomize === "block"){
        method = "Blockrandomisierung"
        value = parseInt(RandomizationParameter, 10); // 10 ist die Basis (dezimal)
        const remainingString = RandomizationParameter.slice(String(value).length);

        const originalString = inputFields.toString(); // In eine Zeichenkette umwandeln
        RandVerh = originalString.slice(0, inputFields.length - 1) + ':' + originalString.slice(-1);

        //console.log("Ganzzahl-Wert:", value);
        //console.log("Verbleibender String:", remainingString);
        //console.log(RandVerh);

    }else if(randomize === "inbalance"){
        method = "Maximally-Tolerated-Imbalance"
        value = parseInt(RandomizationParameter, 10); // 10 ist die Basis (dezimal)
        const remainingString = RandomizationParameter.slice(String(value).length);

        //console.log("Ganzzahl-Wert:", value);
        //console.log("Verbleibender String:", remainingString);

    }

    if(nameFields !== ""){
        const originalObject = nameFields.toString(); // In eine Zeichenkette umwandeln
        groupName = originalObject.slice(0, nameFields.length - 1) + ':' + originalObject.slice(-1);
    }

    const handleNavigation = () => {
        router.push('/')
    }    
    
  return (
    <div className='text-container'>
    {success && <div className="sucsess-message">{success}</div>}
    <h2>Parameter der angelegten Studie</h2>
    {/* Hier kannst du die extrahierten Variablen verwenden */}
    <table>
    <thead>
    <tr>
    <th>Parameter</th>
    <th>Werte</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Name der Studie</td>
    <td>{studyName}</td>
    </tr>
    <tr>
    <td>Randomisierungsmethode</td>
    <td>{method}</td>
    </tr>
    {randomize === "coin" && 
    <tr>
    <td>Gewichtung der Münze</td>
    <td>{value}</td>
    </tr> 
    }
    {randomize === "block" && blocks !== "" && 
    <>
    <tr>
    <td>Art der Blocklänge</td>
    <td>{blocks}</td>
    </tr>
    <tr>
    <td>Blocklänge</td>
    <td>{value}</td>
    </tr>
    <tr>
    <td>Randomiserungsverhältnis</td>
    <td>{RandVerh}</td>
    </tr>  
    </>
    }
    {randomize === "inbalance" &&
    <tr>
    <td>maximal tollerierte Inbalance</td>
    <td>{value}</td>
    </tr>
    }
    <tr>
    <td>Name der Gruppen</td>
    <td>{groupName}</td>
    </tr>
    </tbody>
    </table>
    <Spacer/>
    <p>
    <u>
    Hinweis:
    </u>
    <br/> 
    Über den Button werden Sie abgmelet, dies ist notwendig um Ihren Account eindeutig mit der angelegten Studie zu verknüpfen
    </p>
    <button onClick={handleNavigation}>
    <p>Zurück</p>
    </button>
    </div>    
  )
}
