"use client"

import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";


import { useState } from "react";
import Spacer from '@/komponenten/Spacer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { type } from 'os';


export default function StudyOverview() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [study, setStudy] = useState([]);
  const [studyname, setStudyname] = useState('');
  const [randomize, setRandomize] = useState('');
  const [RandomizationParameter, setRandomizationParameter] = useState('');
  const [inputFields, setInputFields] = useState([]);
  const [nameFields, setNameFields] = useState([]);
  const [blocks, setBlocks] = useState('');

  var groupName
  var value
  var RandVerh
  var typOfBlocks
  var parts 
  var variableblockArray

  const router = useRouter();
  const {data:session} = useSession();
  //console.log({data:session}) //Session anscheinend leer, kann aber Daten aufrufen 
  //const Studie = session?.user?.Studie
  var Benutzer = session?.user?.username
  const { Studienname} = router.query;
    //   if(Studienname){
    //     setSuccess("Studie erfolgreich angelegt")
    //   }

  useEffect(() => {
      sendPostRequest();
  }, []);

  async function sendPostRequest() {
    const key = {
      Benutzer
    };
      try {
          const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchStudyData", key, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.status === 201) {
              console.log('POST-Anfrage erfolgreich:', response.data);
              setStudy(response.data);
              //setSuccess('Studie erfolgreich angelegt');
          } else {
              setError('Fehler beim aufrufen der Studiendaten');
          }
      } catch (error) {
          setError("Fehler beim Anlegen der Studie");
      }
  }

  useEffect(() => {
      if (study.length > 0) {
          const firstStudy = study[0];
          setStudyname(firstStudy.Studienname);
          setRandomize(firstStudy.Methode_Randomisierung);
          setRandomizationParameter(firstStudy.Randomization_Parameter);
          setInputFields(firstStudy.Verteilung);
          setNameFields(firstStudy.Name_Behandlung);
          setBlocks(firstStudy.blockSize);
      }
  }, [study]);

  // Nun können Sie studyname, randomize, RandomizationParameter usw. in Ihrem JSX verwenden.


        


    if(randomize === "coin"){
        // method = "Biased Coin"
        value = parseFloat(RandomizationParameter);
        const remainingString = RandomizationParameter.slice(String(value).length);

        //console.log("Float-Wert:", value);
        //console.log("Verbleibender String:", remainingString);

    }else if(randomize === "block"){
        // method = "Blockrandomisierung"
        // value = parseInt(RandomizationParameter, 10); // 10 ist die Basis (dezimal)
        // const remainingString = RandomizationParameter.slice(String(value).length);

        parts = RandomizationParameter.match(/[a-zA-Z]+|\d+|\D+/g);
        //console.log(parts); // Output: ["v", "12", "bl"]
        if(parts[0] === "v"){
            typOfBlocks = "variable"

            const numberField = inputFields.map(Number)
            //console.log(numberField)
          
            var sum = 0;
          
            for (var i = 0; i < inputFields.length; i++) {
              sum += numberField[i];
            }
            //console.log(sum)
              
            function findMultiplesOfFour(start, end) {
              const multiplesOfFour = [];
              
              for (let i = start; i <= end; i++) {
                if (i % 4 === 0) {
                  multiplesOfFour.push(i);
                }
              }
              return multiplesOfFour;
            }
              
            variableblockArray = findMultiplesOfFour(sum, blocks);
            variableblockArray = variableblockArray.join(',');
            //console.log("BlockArray"+ typeof variableblockArray)





        } else if(parts[0] === "f") {
            typOfBlocks === "fixed"
        }

        const originalString = inputFields.toString(); // In eine Zeichenkette umwandeln
        RandVerh = originalString.slice(0, inputFields.length - 1) + ':' + originalString.slice(-1);

        //console.log("Ganzzahl-Wert:", value);
        //console.log("Verbleibender String:", remainingString);
        //console.log(RandVerh);

    }else if(randomize === "inbalance"){
        // method = "Maximally-Tolerated-Imbalance"
        value = parseInt(RandomizationParameter, 10); // 10 ist die Basis (dezimal)
        const remainingString = RandomizationParameter.slice(String(value).length);

        //console.log("Ganzzahl-Wert:", value);
        //console.log("Verbleibender String:", remainingString);

    }

    if(nameFields !== undefined){
        // const originalObject = nameFields.toString(); // In eine Zeichenkette umwandeln
        // groupName = originalObject.slice(0, nameFields.length - 1) + ':' + originalObject.slice(-1);
        groupName = nameFields.join(" : ") 
    }

    const handleNavigation = () => {
        router.push('/create/mainMenu')
    }    

    function handlePrint() {
        if (typeof window !== 'undefined') {
          window.print();
        }
      }
    
  return (
    <div className='text-container'>
        {error && <div className="error-message"> {error}</div>}
        {success && <div className="sucsess-message">{success}</div>}

        <h2>Parameter der angelegten Studie</h2>
        
        <table>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Wert</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name der Studie</td>
                    <td>{studyname}</td>
                </tr>
                <tr>
                    <td>Randomisierungsmethode</td>
                    <td>{randomize}</td>
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
                            <td>{typOfBlocks}</td>
                        </tr>
                        {parts[0] === "f" &&
                        <tr>
                            <td>Blocklänge</td>
                            <td>{blocks}</td>
                        </tr>
                        }{ parts[0] === "v" &&
                        <tr>
                            <td>verwendete Blocklängen</td>
                            <td>{variableblockArray}</td>
                        </tr>
                        }
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
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={handleNavigation}>
            <p>Zurück</p>
        </button>
        <button onClick={handlePrint}>
           <p>Drucken</p>
        </button>
        </div>
    </div>    
  )
}




