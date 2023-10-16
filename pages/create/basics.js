import { useState } from "react"
import axios from "axios";
import { results } from '../../randomize_methods/two_blocks';
import { list4 } from '../../randomize_methods//block/four_blocks';


export default function basics() {

const [studyName, setStudyname] = useState('');
const [randomize, setRandomize] = useState('option0');
const [group, setGroup] = useState('');
const [blockSize, setBlockSize] = useState('');
const [inputFields, setInputFields] = useState(['']);
const [showRandomizationRatio, setShowRandomizationRatio] = useState(false);

const [error, setError] = useState('')
const [sucsess, setSucsess] = useState('')

let list = [];

const handleRandomizeChange = (event) => {
setRandomize(event.target.value);
setBlockSize('')
};

  const handleOptionChange = (event) => {
    setGroup(event.target.value);
    setShowRandomizationRatio(true)

    // Je nach ausgewählter Option, füge die entsprechende Anzahl von Eingabefeldern hinzu
    let prefix = '';
    if (event.target.value === 'Option1') {
      prefix = '_:_';
    } else if (event.target.value === 'Option2') {
      prefix = '_:_:_';
    } else if (event.target.value === 'Option3') {
      prefix = '_:_:_:_';
    }

    // Aktualisiere die Input-Felder mit dem neuen vorangestellten Wert
    const updatedInputFields = inputFields.map((value) => prefix + value);
    setInputFields(updatedInputFields);
  };

  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
  };

  if(randomize === 'block' && blockSize === '4'){
    list = {list4}
  } else {
    list = [0,0,0,0,0,0,0]
  }


  const createStudy = async ()=>{
    setError('')
    setSucsess('')

    if(studyName && randomize && group && inputFields){
        const newStudy={
            studyName,
            randomize,
            group,
            inputFields,
            list
        };

         try{

            const response = await axios.post("http://localhost:3000/api/studies", newStudy, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 201) {
          setStudyname('');
          setRandomize('option0');
          setGroup('Option1');
          setInputFields(['']);
          setSucsess('Studie erfolgreich angelegt')
        }else {
          // Fehler beim Speichern des Mitarbeiters
          setError('Fehler beim Speichern der Studie');
        }

        } catch(error){
            setError("Fehler beim Anlegen der Studie")
        }

    } else {
        setError("Alle Felder sind auszufüllen")
    }
   
  } 


 
  return (
    <div className="text-container">
        {error && <div className="error-message">{error}</div>}
        {sucsess && <div className="sucsess-message">{sucsess}</div>}

         <h2>Festlegen von Studienparametern</h2>

         <div className="hr-container">
             <p className="hr-vert"/>
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

        <div className="hr-container">  
            <p className="hr-vert-small"/>
        </div>

        <div>
            <label className="p2">Randomiserungsart</label>   
            <br></br>                
            <select className="select p2" value={randomize} onChange={handleRandomizeChange}>
                <option value="option0"> bitte wählen Sie eine Art aus</option>
                <option value="block">Blockrandomiserung</option>
            </select>
        </div>
        {randomize === 'block' && ( // Zeigt das zweite Feld nur an, wenn "Blockrandomisierung" ausgewählt ist
        <div>
            <div className="hr-container">
            <p className="hr-vert-small"/>
             </div>

          <label className="p2">Blocklänge:</label>
          <select
            className="select p2"
            value={blockSize}
            onChange={(event) => setBlockSize(event.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      )}

        <div className="hr-container">
            <p className="hr-vert-small"/>
        </div>

      <div>
      <label>Anzahl der Gruppen</label>
      <br></br>
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

      {showRandomizationRatio && ( // Zeige das Randomisierungsverhältnis-Feld nur an, wenn showRandomizationRatio true ist
        <div>
          {inputFields.map((value, index) => (
            <div key={index}>
              <label>Randomiserungsverhältnis</label>
              <input
                type="text"
                value={value}
                onChange={(event) => handleInputChange(index, event)}
                placeholder={`Randomiserungsverhältnis`}
                maxLength={7}
              />
            </div>
          ))}
        </div>
      )}

        <div class="hr-container">
            <p class="hr-vert-small"/>
        </div>

       <button type="submit" onClick={createStudy} className="btn btn-primary">
            Erstellen
        </button>
    </div>
  );








}
