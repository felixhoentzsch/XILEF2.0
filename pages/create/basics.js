"use Client"

import { useState } from "react";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import Spacer from "@/komponenten/Spacer";

import Block from "../../randomize_methods/Block";

export default function Basics() {
   const [studyName, setStudyname] = useState('');
   const [randomize, setRandomize] = useState('option0');
   const [group, setGroup] = useState('');
  const [blockSize, setBlockSize] = useState('');
  const [caseNumber, setCaseNumber] = useState('')
  const [inputFields, setInputFields] = useState(['']);




  const [nameFields, setNameFields] = useState([''])
  const [showRandomizationRatio, setShowRandomizationRatio] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

//   let list = [];

  const handleRandomizeChange = (event) => {
    setRandomize(event.target.value);
    setBlockSize('');
  };

  const handleCaseNumberChange = (event) =>{
    const newCaseNumber =event.target.value;
    setCaseNumber(newCaseNumber)
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
    const newNameFields = [...nameFields];
    newNameFields[index] = event.target.value;
    setNameFields(newNameFields);
  };

const handleBlockSizeChange = (event) => {
    const newBlockSize = event.target.value;
    setBlockSize(newBlockSize);
  
    if (newBlockSize !== '' && newBlockSize % sumOfInputFields !== 0) {
      setError('Die maximale Blocklänge ist kein Vielfaches von '+ sumOfInputFields);
    } else {
      setError(''); // Löschen Sie den Fehler, wenn die Bedingung wieder erfüllt ist
    }
  };

  const handleCreateList = () => {
    if (randomize === 'block') {
      const list = Block({
        caseNumber,
        blockSize,
        inputFields,
      });
      console.log('Erstellte Liste:', list);
      // Hier können Sie die Liste weiterverarbeiten oder anzeigen
    } else {
      console.log('Randomisierung nicht ausgewählt');
      // Hier können Sie eine Meldung anzeigen, wenn die Randomisierung nicht ausgewählt ist
    }
  };
  

  const createStudy = async () => {
    setError('');
    setSuccess('');

    if (studyName && randomize && group && inputFields && blockSize && caseNumber) {
        let list;
        if (randomize === 'block') {
            list = Block({
              caseNumber,
              blockSize,
              inputFields,
            });
        }else {
            list = [0,0]
        }

      const newStudy = {
        studyName,
        randomize,
        blockSize,
        group,
        inputFields,
        nameFields,
        caseNumber,
        list,
      };

      try {
        const response = await axios.post("http://localhost:3000/api/studies", newStudy, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          setStudyname('');
          setRandomize('option0');
          setGroup('');
          setInputFields(['']);
          setSuccess('Studie erfolgreich angelegt');
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


  return (
    <div className="text-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

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
          <option value="option0">Bitte wählen Sie eine Art aus</option>
          <option value="block">Blockrandomiserung</option>
        </select>
      </div>

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

      <Spacer/>

      <div>
        <label>Anzahl der Gruppen</label>
        <br />
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
                type="text"
                value={value}
                onChange={(event) => handleInputChange(index, event)}
                maxLength={100}
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
            />
            {index < nameFields.length - 1 && <div className="separator">:</div>}
          </div>
        ))}
      </div>
      </div>
      </div>
      )}

      {randomize === 'block' && (
        <div>

          <Spacer/>

          <label className="p2"> maximale Blocklänge:</label>
          <span className="input-small-span">
          <input
            id="blockSizeInput"
            type="number"
            value={blockSize}
            onChange={handleBlockSizeChange}
            required
            placeholder={"Die maximale Blocklänge ist ein vielfaches von: "+sumOfInputFields}
          />
          </span>
        </div>
      )}

    <Spacer/>

      <button type="submit" onClick={createStudy} className="btn btn-primary">
        Erstellen
      </button>
      <button type="button" onClick={handleCreateList} className="btn btn-secondary">
      Liste erstellen
    </button>
    </div>
  );
}





// import { useState } from "react"
// import axios from "axios";
// import { results } from '../../randomize_methods/two_blocks';
// import { list4 } from '../../randomize_methods//block/four_blocks';


// export default function basics() {

// const [studyName, setStudyname] = useState('');
// const [randomize, setRandomize] = useState('option0');
// const [group, setGroup] = useState('');
// const [blockSize, setBlockSize] = useState('');
// const [inputFields, setInputFields] = useState(['']);
// const [showRandomizationRatio, setShowRandomizationRatio] = useState(false);

// const [error, setError] = useState('')
// const [sucsess, setSucsess] = useState('')

// let list = [];

// const handleRandomizeChange = (event) => {
// setRandomize(event.target.value);
// setBlockSize('')
// };

// //   const handleOptionChange = (event) => {
// //     setGroup(event.target.value);
// //     setShowRandomizationRatio(true)

// //     // Je nach ausgewählter Option, füge die entsprechende Anzahl von Eingabefeldern hinzu
// //     let prefix = '';
// //     if (event.target.value === 'Option1') {
// //       prefix = '_:_';
// //     } else if (event.target.value === 'Option2') {
// //       prefix = '_:_:_';
// //     } else if (event.target.value === 'Option3') {
// //       prefix = '_:_:_:_';
// //     }

// //     // Aktualisiere die Input-Felder mit dem neuen vorangestellten Wert
// //     const updatedInputFields = inputFields.map((value) => prefix + value);
// //     setInputFields(updatedInputFields);
// //   };

// const handleOptionChange = (event) => {
//     setGroup(event.target.value);
//     setShowRandomizationRatio(true)

//     // Je nach ausgewählter Option, fügen Sie die entsprechende Anzahl von Textfeldern hinzu
//     let numberOfFields = 0;

//     if (event.target.value === 'Option1') {
//       numberOfFields = 1;
//     } else if (event.target.value === 'Option2') {
//       numberOfFields = 2;
//     } else if (event.target.value === 'Option3') {
//       numberOfFields = 3;
//     }

//     const newInputFields = Array(numberOfFields).fill('');
//     setInputFields(newInputFields);
//   };



//   const handleInputChange = (index, event) => {
//     const newInputFields = [...inputFields];
//     newInputFields[index] = event.target.value;
//     setInputFields(newInputFields);
//   };

//   if(randomize === 'block' && blockSize === '4'){
//     list = {list4}
//   } else {
//     list = [0,0,0,0,0,0]
//   }


//   const createStudy = async ()=>{
//     setError('')
//     setSucsess('')

//     if(studyName && randomize && group && inputFields){
//         const newStudy={
//             studyName,
//             randomize,
//             blockSize,
//             group,
//             inputFields,
//             list
//         };

//          try{

//             const response = await axios.post("http://localhost:3000/api/studies", newStudy, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
  
//         if (response.status === 201) {
//           setStudyname('');
//           setRandomize('option0');
//           setGroup('Option1');
//           setInputFields(['']);
//           setSucsess('Studie erfolgreich angelegt')
//         }else {
//           // Fehler beim Speichern des Mitarbeiters
//           setError('Fehler beim Speichern der Studie');
//         }

//         } catch(error){
//             setError("Fehler beim Anlegen der Studie")
//         }

//     } else {
//         setError("Alle Felder sind auszufüllen")
//     }
   
//   } 


 
//   return (
//     <div className="text-container">
//         {error && <div className="error-message">{error}</div>}
//         {sucsess && <div className="sucsess-message">{sucsess}</div>}

//          <h2>Festlegen von Studienparametern</h2>

//          <div className="hr-container">
//              <p className="hr-vert"/>
//          </div>

//          <label className="p2">Studienname</label>
//          <span className="input-small-span">
//              <input
//                 type="text"
//                 value={studyName}
//                 onChange={(e) => setStudyname(e.target.value)}
//                 required
//                 pattern="[a-zA-Z0-9_-]+"
//                 maxLength={30}
//             />
//         </span>

//         <div className="hr-container">  
//             <p className="hr-vert-small"/>
//         </div>

//         <div>
//             <label className="p2">Randomiserungsart</label>   
//             <br></br>                
//             <select className="select p2" value={randomize} onChange={handleRandomizeChange}>
//                 <option value="option0"> bitte wählen Sie eine Art aus</option>
//                 <option value="block">Blockrandomiserung</option>
//             </select>
//         </div>
//         {randomize === 'block' && ( // Zeigt das zweite Feld nur an, wenn "Blockrandomisierung" ausgewählt ist
//         <div>
//             <div className="hr-container">
//             <p className="hr-vert-small"/>
//              </div>

//           <label className="p2">Blocklänge:</label>
//           <select
//             className="select p2"
//             value={blockSize}
//             onChange={(event) => setBlockSize(event.target.value)}
//           >
//             <option value="4">4</option>
//             <option value="8">8</option>
//             <option value="12">12</option>
//           </select>
//         </div>
//       )}

//         <div className="hr-container">
//             <p className="hr-vert-small"/>
//         </div>

//       <div>
//       <label>Anzahl der Gruppen</label>
//       <br></br>
//         <input
//           type="radio"
//           value="Option1"
//           checked={group === 'Option1'}
//           onChange={handleOptionChange}
//         />
//         <label>2</label>
//       </div>
//       <div>
//         <input
//           type="radio"
//           value="Option2"
//           checked={group === 'Option2'}
//           onChange={handleOptionChange}
//         />
//         <label>3</label>
//       </div>
//       <div>
//         <input
//           type="radio"
//           value="Option3"
//           checked={group === 'Option3'}
//           onChange={handleOptionChange}
//         />
//         <label>4</label>
//       </div>

//       {showRandomizationRatio && (
//     <div>
//       {inputFields.map((value, index) => (
//         <div key={index} className="text-field-row">
//           <label>Textfeld {index + 1}</label>
//           <div className="text-field-wrapper">
//             <input
//               type="text"
//               value={value}
//               onChange={(event) => {
//                 const newInputFields = [...inputFields];
//                 newInputFields[index] = event.target.value;
//                 setInputFields(newInputFields);
//               }}
//               placeholder={`Textfeld ${index + 1}`}
//               maxLength={100}
//             />
//             {index < inputFields.length - 1 && <span className="separator">:</span>}
//           </div>
//         </div>
//       ))}
//     </div>
//   )}

//         <div class="hr-container">
//             <p class="hr-vert-small"/>
//         </div>

//        <button type="submit" onClick={createStudy} className="btn btn-primary">
//             Erstellen
//         </button>
//     </div>
//   );








// }