"use client"

import { useSession } from "next-auth/react";
import styles from '../../styles/Button.module.css'
import { useState } from "react";
import React, { useEffect } from 'react';
import axios from "axios";
import Spacer from "@/komponenten/Spacer";
import Block from "../../randomize_methods/Block";
import varBlocks from "../../randomize_methods/var_blocks"
import BiasedCoin from "../../randomize_methods/BiasedCoin"
import MTI from "../../randomize_methods/MTI"

import { useRouter } from "next/navigation"
import Timer from "@/komponenten/Timer";


export default function Basics() {
  const {data:session} = useSession();
  const router = useRouter();


  const [studyName, setStudyname] = useState('');
  const [randomize, setRandomize] = useState('');
  const [group, setGroup] = useState('2'); // --> die 2 maybe rausnehmen und später einfügen --> 2 Gruppen standard für biasedCoin und MTI
  const [chooseBlock, setChooseBlock] = useState('');
  const [blockSize, setBlockSize] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [inputFields, setInputFields] = useState(['']);
  //const [groupFields, setGroupFlields] = useState(['']);
  const [biasedCoin, setBiasedCoin] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [RandomizationParameter, setRandomizationParameter] = useState('')




  const [nameFields, setNameFields] = useState([''])
  const [showRandomizationRatio, setShowRandomizationRatio] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [warning, setWarning] = useState('')

  //-------Stratifizierung-----------------------
  const[straticicationOption,setStraticicationOption]= useState(false)
  const [numberOfStraticication, setNumberOfStraticication] = useState('')
  const [straticicationFields, setStraticicationFields] = useState([''])

  const [rowCount, setRowCount] = useState(1); // Anfangszustand: eine Zeile
  const [textFields, setTextFields] = useState([]); // Für das Hinzufügen von Textfeldern in der Stratifizierungstabelle 


//   let list = [];

useEffect(() => {
  if (randomize === 'block' && blockSize !== '' && chooseBlock ==="fixed") {
    setRandomizationParameter('f'+ blockSize + 'bl');
    console.log(RandomizationParameter);
  } else if (randomize === 'block' && blockSize !== '' && chooseBlock ==="variable"){
    setRandomizationParameter('v'+ blockSize + 'bl');
    console.log(RandomizationParameter);
  } else if (biasedCoin !== '') {
    setRandomizationParameter(biasedCoin + 'bc');
    console.log(RandomizationParameter);
  } else if (tolerance !== '') {
    setRandomizationParameter(tolerance + 'tl');
    console.log(RandomizationParameter);
  }
}, [randomize, blockSize, biasedCoin, tolerance, RandomizationParameter, chooseBlock]); // Dependency array to control when the effect runs


  const handleRandomizeChange = (event) => {
    setRandomize(event.target.value);
    setBlockSize('');
  };

  const handleCaseNumberChange = (event) =>{
    const newCaseNumber =event.target.value;
    setCaseNumber(newCaseNumber)
  }

  const handleCoinChange = (event) =>{
    const newCoin =event.target.value;
    setBiasedCoin(newCoin)
  }
  const handleTolerance = (event) =>{
    const newTolerance =event.target.value;
    setTolerance(newTolerance)
    console.log(tolerance)
  }

  const handleBlockSize = (event) =>{
    const newChooseBlock =event.target.value;
    setChooseBlock(newChooseBlock)
  }

  const handleOptionChange = (event) => {
    setGroup(event.target.value);
    setShowRandomizationRatio(true);

    let numberOfFields = 0;

    if (event.target.value === 'Option1') {
      numberOfFields = 2;
    } else if (event.target.value === 'Option2') {
      numberOfFields = 3;
    } else if (event.target.value === 'Option3') {
      numberOfFields = 4;
    }

    const newInputFields = Array(numberOfFields).fill('');
    setInputFields(newInputFields);

    const newNameFields = Array(numberOfFields).fill('');
    setNameFields(newNameFields);
  };

  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
  };
  const handleInputNameChange = (index, event) => {
    if(randomize === "inbalance"){
      const newNameFields = Array(2).fill('');
      setNameFields(newNameFields);
      const newNameFields2 = [...nameFields];
    newNameFields2[index] = event.target.value;
    setNameFields(newNameFields2);
    //console.log(nameFields)
    }else {
      const newNameFields = [...nameFields];
      newNameFields[index] = event.target.value;
      setNameFields(newNameFields);
    }

  };

  // const handleGroupName = (index, event) => {
  //   const newGroupFields = [...groupFields];
  //   newGroupFields[index] = event.target.value;
  //   setGroupFlields(newGroupFields);
  //   console.log(groupFields)
  // };

const handleBlockSizeChange = (event) => {
    const newBlockSize = event.target.value;
    setBlockSize(newBlockSize);
  
    if (newBlockSize !== '' && chooseBlock === 'fixed' && newBlockSize % sumOfInputFields !== 0) {
      setError('Die maximale Blocklänge ist kein Vielfaches von '+ sumOfInputFields);
    } else {
      setError(''); // Löschen Sie den Fehler, wenn die Bedingung wieder erfüllt ist
    }

    if(newBlockSize !== '' && chooseBlock === 'fixed' && caseNumber % newBlockSize !==0){
      setWarning('Die von Ihnen gewählte Kombination aus Fallzahl und Blocklänge verursacht Overrunning! Die Fallzahl wurde auf die nächst höhere aufgerundet')
        if (caseNumber % blockSize !==0){
          const nextMultiple = Math.ceil(caseNumber/newBlockSize)*newBlockSize
          setCaseNumber(nextMultiple)
          console.log(caseNumber)
        }

    }else {
       setWarning(''); // Löschen der Warnung, wenn alles wieder innerhalb der Paramter 
    }

    if(newBlockSize !=='' && chooseBlock === 'variable'){
      function extractNumbers(inputString){
        return inputString.split(',').map(Number)
      }
      function multipleFrom(zahlenArray){
        return zahlenArray.every((zahl) => zahl % sumOfInputFields === 0)// prüfen ob Zahl vielfaches von sumOfInputFields
      }
      const blockArray = extractNumbers(newBlockSize)
      const boolean = multipleFrom(blockArray)

      if(boolean === false ){
        setError('Eine der eingegebenen Blocklängen ist kein vielfaches von ' + sumOfInputFields)
      }
      else {
        console.log(newBlockSize)
        setError('')
      }


    }
  };


  // const handleCreateList = () => {
  //   if (randomize === 'block' && chooseBlock === 'fixed') {
  //     const list = Block({
  //       caseNumber,
  //       blockSize,
  //       inputFields,
  //     });
  //     console.log('Erstellte Liste:', list);
  //     // Hier können Sie die Liste weiterverarbeiten oder anzeigen
  //   }else if(randomize === 'block' && chooseBlock === 'variable'){
  //     const list = varBlocks({
  //       caseNumber, 
  //       blockSize,
  //       inputFields
  //     });
  //     console.log('Erstellte Liste:', list) 
  //   }
  //   else if(randomize === 'coin'){
  //     const list = BiasedCoin({
  //       caseNumber, 
  //       biasedCoin
  //     });
  //     console.log('Erstellte Liste:', list)
  //   }
  //   else if(randomize === 'inbalance'){
  //     const list = MTI({
  //       caseNumber, 
  //       tolerance
  //     });
  //     console.log('Erstellte Liste:', list)
  //   }
  //    else {
  //     console.log('Randomisierung nicht ausgewählt');
  //     // Hier können Sie eine Meldung anzeigen, wenn die Randomisierung nicht ausgewählt ist
  //   }
  // };


  

  const createStudy = async () => {
    setError('');
    setSuccess('');
    console.log({data:session})
    const user = session.user.username 
    const mail = session.user.mail
    // console.log(user)
    // console.log(mail)
    // console.log(study)

    if (studyName && randomize && (group || nameFields) && RandomizationParameter && caseNumber) {
        let list;
        if (randomize === 'block' && chooseBlock === 'fixed') {
            list = Block({
              caseNumber,
              blockSize,
              inputFields,
            });
        }else if(randomize === 'block' && chooseBlock === 'variable') {
           list = varBlocks({
            caseNumber, 
            blockSize,
            inputFields
          });
        }
        else if(randomize === 'coin') {
          list = BiasedCoin({  //--> import muss gleich heißen 
            caseNumber,
            biasedCoin
          })
        }   
        else if(randomize === 'inbalance'){
          list = MTI({
            caseNumber, 
            tolerance
          })
        }  
        else {
            setError("Erzeugen der Liste nicht möglich!")
            //list = [0,0]
        }

      const newStudy = {
        studyName,
        randomize,
        RandomizationParameter,
        blockSize,
        group,
        inputFields,
        nameFields,
        caseNumber,
        list,
        user,
        mail,
      };
      try {
        const response = await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/studies", newStudy, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          // setStudyname('');
          // setRandomize('');
          // setGroup('');
          // setInputFields(['']);
          // setCaseNumber('')
          // setSuccess('Studie erfolgreich angelegt');
          router.push({
            pathname: 'studyOverview',
            query:{
              Studienname: studyName,
            },
          });
        } else {
          setError('Fehler beim Speichern der Studie');
        }
      } catch (error) {
        setError("Fehler beim Anlegen der Studie");
      }
    } else {
      setError("Alle Felder sind auszufüllen");
    }
  };

  // das Array aus InputFields wird zusammen gerechnet --> in Placeholder verwendet 
  const sumOfInputFields = inputFields.reduce((total, value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      return total + numericValue;
    }
    return total;
  }, 0); 


  // ab hier Stratifizierung 

  const handleStratificationOptions =(event) => {

    if (event.target.value === "yes"){
      setStraticicationOption(true)
    }
    else {
      setStraticicationOption(false)
    }
  }

  const addRow = () => {
    setRowCount(rowCount + 1); // Erhöhe die Anzahl der Zeilen um 1
  };
  const dismissRow = () =>{
    setRowCount(rowCount - 1);
  }

  const addTextField = () => {
    setTextFields([...textFields, ""]); // Füge ein leeres Textfeld zum Array hinzu
  };

  const removeTextField = (index) => {
    const newTextFieldArray = [...textFields];
    newTextFieldArray.splice(index, 1); // Entferne das Textfeld an der gegebenen Indexposition
    setTextFields(newTextFieldArray);
  };

  const handleTextFieldChange = (value, index) => {
    const newTextFieldArray = [...textFields];
    newTextFieldArray[index] = value; // Aktualisiere den Wert des Textfeldes an der gegebenen Indexposition
    setTextFields(newTextFieldArray);
  };


  return (
    <div className="text-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="sucsess-message">{success}</div>}
      {warning && <div className="warning-message">{warning}</div>}

      <Timer/>

      <h2>Festlegen von Studienparametern</h2>

      <div className="hr-container">
        <p className="hr-vert" />
      </div>

      <label className="p2">Studienname</label>
      <span className="input-small-span">
        <input
          type="text"
          value={studyName}
          onChange={(e) => setStudyname(e.target.value)}
          required
          pattern="[a-zA-Z0-9_-]+"
          maxLength={30}
        />
      </span>

      <Spacer/>

      <div>
        <label className="p2">Randomiserungsart</label>
        <br />
        <select className="select p2" value={randomize} onChange={handleRandomizeChange}>
          <option value="" selected >Bitte auswählen</option>
          <option value="block">Blockrandomiserung</option>
          <option value="coin">Biased Coin(2 Gruppen)</option>
          <option value="inbalance"> Maximally-Tolerated-Imbalance(2 Gruppen)</option>
        </select>
      </div>

      

      {randomize !== ""  && 
      <div>

        <Spacer/>

        <label className="p2">Fallzahl</label>
        <span className="input-small-span">
          <input
            style={{width: '30%'}}
            type="number"
            value={caseNumber}
            onChange= {handleCaseNumberChange} //{(e) => setCaseNumber(e.target.value)}
            required
            maxLength={5}
          />
        </span>
      </div>

      } 

      {randomize === "inbalance" &&
      
      <div>

       <Spacer/>
      
        <label>Name der Gruppen</label>
        <div>        
          <div className="text-field-row">
            <div className="text-field-wrapper">
              <input
                className="input"
                type="text"
                value={nameFields[0]}
                onChange={(event) => handleInputNameChange(0, event)}
                maxLength={100}
                style={{ width: '100%' }}
              />
            </div>
            :
            <div className="text-field-wrapper">
              <input
                className="input"
                type="text"
                value = {nameFields[1]}
                onChange={(event) => handleInputNameChange(1, event)}
                maxLength={100}
                style={{width: '100%'}}
              />
            </div>
          </div>  
        </div>
        <Spacer/>
        <label>maximal tolerierte Inbalance</label>
        <span className="input-small-span">
          <input
            style={{width: '30%'}}
            type="number"
            step="1"
            min="1"
            max="20"
            value={tolerance}
            onChange= {handleTolerance} 
            required
          />
        </span>
      </div> 
      }

      {randomize === 'coin' &&
        <div>
          <Spacer/>
          <label>Name der Gruppen</label>
          <div>        
            <div className="text-field-row">
              <div className="text-field-wrapper">
                <input
                  className="input"
                  type="text"
                  value={nameFields[0]}
                  onChange={(event) => handleInputNameChange(0, event)}
                  maxLength={100}
                  style={{ width: '100%' }}
                />
              </div>
              :
              <div className="text-field-wrapper">
                <input
                  className="input"
                  type="text"
                  value = {nameFields[1]}
                  onChange={(event) => handleInputNameChange(1, event)}
                  maxLength={100}
                  style={{width: '100%'}}
               />
              </div>
            </div>
          </div> 
          <div>
            <label>Gewichtung der Münze</label>
            <div className="tooltip"><button className={styles.tip} >?</button>
              <span className="tooltiptext"> Refernzwert = {nameFields[0]} <br/> 0.6 = 60% Chance auf {nameFields[0]}</span>
            </div>
            <br/>
            <span className="input-small-span">
              <input
                style={{width: '30%'}}
                type="number"
                step="0.1"
                min="0.1"
                max="1"
                value={biasedCoin}
                onChange= {handleCoinChange} 
                required
              />
            </span>
          </div> 

        </div>
      }

      {randomize === 'block' &&
        <div>
          <div>
            <label>Anzahl der Gruppen</label>
            <br/>
            <input
              type="radio"
              value="Option1"
              checked={group === 'Option1'}
              onChange={handleOptionChange}
            />
            <label>2</label>
          </div>
          <div>
            <input
              type="radio"
              value="Option2"
              checked={group === 'Option2'}
              onChange={handleOptionChange}
            />
            <label>3</label>
          </div>
          <div>
            <input
              type="radio"
              value="Option3"
              checked={group === 'Option3'}
              onChange={handleOptionChange}
            />
            <label>4</label>
          </div>

          {showRandomizationRatio && (
            <div>
              <div>
                <label>Randomiserungsverhältnis:</label>
                <br/>
                  <div className="text-field-row">
                    {inputFields.map((value, index) => (
                      <div key={index} className="text-field-wrapper">  
                        <input
                          className="input"
                          type="number"
                          value={value}
                          onChange={(event) => handleInputChange(index, event)}
                          maxLength={100}
                          style={{width: '100%'}}
                        />
                        {index < inputFields.length - 1 && <div className="separator">:</div>}
                      </div>
                    ))}
                  </div>
              </div>
              {/* //------------------------------------------------------------------------------ */}
              <div>
                <label>Name der Gruppe:</label>
                <br/>
                <div className="text-field-row">
                  {nameFields.map((value, index) => (
                    <div key={index} className="text-field-wrapper">  
                      <input
                        className="input"
                        type="text"
                        value={value}
                        onChange={(event) => handleInputNameChange(index, event)}
                        maxLength={100}
                        style={{width: '100%'}}
                      />
                      {index < nameFields.length - 1 && <div className="separator">:</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Spacer/>

          <div>
            <label>Auswählen der Blocklänge</label>
            <br/>
            <input
              type="radio"
              value="fixed"
              checked={chooseBlock === 'fixed'}
              onChange={handleBlockSize}
            />
            <label>fixe Blocklänge</label>
          </div>
          <div>
            <input
              type="radio"
              value="variable"
              checked={chooseBlock === 'variable'}
              onChange={handleBlockSize}
            />
            <label>variable Blocklänge</label>
          </div>
        </div>
      }

      {randomize === 'block' && chooseBlock === 'fixed' && (
        <div>

          <Spacer/>

          <label className="p2">Blocklänge:</label>
          <span className="input-small-span">
          <input
            style={{width: "380px"}}
            id="blockSizeInput"
            type="number"
            value={blockSize}
            onChange={handleBlockSizeChange}
            required
            placeholder={"Die Blocklänge ist ein vielfaches von: "+sumOfInputFields}
            
          />
          </span>
        </div>
      )}

      {randomize === 'block' && chooseBlock === 'variable' && (
        <div>

          <Spacer/>

          <label> maximale Blocklänge:</label>
          <span className="input-small-span" style={{width: "480px"}}>
          <input
            style={{width: "480px"}}
            id="blockSizeInput"
            type="number"
            value={blockSize}
            onChange={handleBlockSizeChange}
            required
            placeholder={"Die maximale Blocklänge sind ein vielfaches von: "+sumOfInputFields}
            //pattern="\d+(,\d+)*"
          />
          </span>
        </div>
      )}  

      {randomize !== "" &&
        <>
          <Spacer/>

          <div>
            <label>Stratifizierung einbinden?</label>
            <br/>
            <input
              type="radio"
              value="yes"
              checked={straticicationOption === true}
              onChange={handleStratificationOptions}
            />
            <label>ja</label>
          {/* </div>
          <div> */}
            <input
              type="radio"
              value= "no"
              checked={straticicationOption === false}
              onChange={handleStratificationOptions}
            />
            <label>nein</label>
          </div>

          {straticicationOption &&
             <div>
             <br /><br />
             <table>
               <thead>
                 <tr>
                   <th>Name der Stratifizierung</th>
                   <th>values??</th>
                 </tr>
               </thead>
               <tbody>
                 {[...Array(rowCount)].map((_, index) => (
                   <tr key={index}>
                     <td>
                       <input
                         className="input"
                         type="text"
                         // value={value}
                         // onChange={(event) => handleInputNameChange(index, event)}
                         maxLength={100}
                         style={{width: '50%'}}
                       />
                     </td>
                     <td>
                       {textFields.map((value, index) => (
                         <div key={index}>
                           <input
                             type="text"
                             value={value}
                             onChange={(e) => handleTextFieldChange(e.target.value, index)}
                           />
                         </div>
                       ))}
                       <button onClick={addTextField} className={styles.square}>+</button>
                       <button onClick={() => removeTextField(textFields.length - 1)} className={textFields.length <= 2 ? styles.disabledSquare : styles.square }
                       disabled={textFields.length <= 2}>-</button>
                     </td>
                   </tr>
                 ))}
                      <tr>
                     <td>
                     <button onClick={addRow} className={styles.square}>+</button>
                     <button onClick={dismissRow} disabled={rowCount === 1} className={rowCount === 1 ? styles.disabledSquare : styles.square}>-</button>
                     </td>
                   </tr>
               </tbody>
             </table>
           </div>
          }
        </>
     } 

      <Spacer/>

      <button type="submit" onClick={createStudy} className="btn btn-primary">
        Erstellen
      </button>
      {/* <button type="button" onClick={handleCreateList} className="btn btn-secondary">
      Liste erstellen
      </button> */}
      <div className="spacer"/>
    </div>
  );
}