import { useState } from "react"


export default function basics() {

const [studyName, setStudyname] = useState('');
const [randomize, setRandomize] = useState('option0');
const [group, setGroup] = useState('Option1');
const [inputFields, setInputFields] = useState(['']);

const [error, setError] = useState('')
const [sucsess, setSucsess] = useState('')

const handleRandomizeChange = (event) => {
setRandomize(event.target.value);
};

  const handleOptionChange = (event) => {
    setGroup(event.target.value);

    // Je nach ausgewählter Option, füge die entsprechende Anzahl von Eingabefeldern hinzu
    if (event.target.value === 'Option1') {
      setInputFields([':']);
    } else if (event.target.value === 'Option2') {
      setInputFields(['_:_:_']);
    } else if (event.target.value === 'Option3') {
      setInputFields(['_:_:_:_']);
    }
  };

  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
  };


  const createStudy = async ()=>{
    setError('')
    setSucsess('')

    if(studyName && randomize && group && inputFields){
        const newStudy={
            studyName,
            randomize,
            group,
            inputFields
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
          setInputFields('');
          setSucsess('Nutzer erfolgreich angelegt')
        }else {
          // Fehler beim Speichern des Mitarbeiters
          setError('Fehler beim Speichern des Mitarbeiters');
        }

        } catch(error){
            setError("Fehler")
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
        <label>Option 1</label>
      </div>
      <div>
        <input
          type="radio"
          value="Option2"
          checked={group === 'Option2'}
          onChange={handleOptionChange}
        />
        <label>Option 2</label>
      </div>
      <div>
        <input
          type="radio"
          value="Option3"
          checked={group === 'Option3'}
          onChange={handleOptionChange}
        />
        <label>Option 3</label>
      </div>

      {inputFields.map((value, index) => (
        <div>
        <label>Randomiserungsverhältnis</label>    
        <input
          key={index}
          type="text"
          value={value}
          onChange={(event) => handleInputChange(index, event)}
          placeholder={`Randomiserungsverhältnis`}
          maxLength={7}
        />
        </div>
      ))}

        <div class="hr-container">
            <p class="hr-vert-small"/>
        </div>

       <button type="submit" onClick={createStudy} className="btn btn-primary">
            Erstellen
        </button>
    </div>
  );








}
