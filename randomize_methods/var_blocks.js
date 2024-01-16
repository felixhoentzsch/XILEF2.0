// //---------------
// // const newArray = Array.from({ length: parseInt(blockSize, 10) }, () => 0); 
// // es wird ein Array erstellt was die Länge der eingegebenen Blocklänge hat und mit 0 gefüllt wird

import { Random } from "random-js";

function varBlocks({ blockSize, caseNumber, inputFields }) {
 
  // const random = new Random();
  const numberField = inputFields.map(Number)
  console.log(numberField)

  var sum = 0;

  for (var i = 0; i < inputFields.length; i++) {
    sum += numberField[i];
  }
  console.log(sum)
    
  function findMultiplesOfFour(start, end) {
    const multiplesOfFour = [];
    
    for (let i = start; i <= end; i++) {
      if (i % 4 === 0) {
        multiplesOfFour.push(i);
      }
    }
    return multiplesOfFour;
  }
    
  const blockArray = findMultiplesOfFour(sum, blockSize);
  console.log("BlockArray"+blockArray)
    
  //Funktion zur Generierung von Arrays basierend auf inputFields und blockSize
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function generateArrays(inputFields, blockArray) {
    var sum = inputFields.reduce((acc, val) => acc + val, 0);
    console.log(sum);
    const newArray = [];
    
    for (let x = 0; x < blockArray.length; x++) {
      const innerArray = [];
      const tempInputFields = [...inputFields];
      for (let j = 0; j < tempInputFields.length; j++) {
        for (let i = 0; i < blockArray[x] && tempInputFields[j] > 0; i++) {
          innerArray.push(j === 0 ? 0 : j);
          tempInputFields[j]--;
        }
      }
      const repeatFactor = Math.ceil(blockArray[x] / sum);
      const repeatedArrays = Array.from({ length: repeatFactor }, () => [...innerArray]).flat();
      newArray.push(repeatedArrays.slice(0, blockArray[x]));
    }
    return newArray;
  }
    
  const result = generateArrays(numberField, blockArray);
  console.log(result);
    
  let currentCaseNumber = 0;
  const mixedArrays = []; // Hier wird das große Array für die gemischten Arrays erstellt
    
  while (currentCaseNumber < caseNumber - blockSize) {
    const randomIndex = Math.floor(Math.random() * result.length);
    const shuffledArray = shuffleArray(result[randomIndex]);
    mixedArrays.push(...shuffledArray); // Gemischte Arrays direkt mit concat hinzufügen
    console.log("Die vorläufige Länge ist: " + mixedArrays.length);
    currentCaseNumber = mixedArrays.length;
  }
    
  const lastBlock = caseNumber - currentCaseNumber;
  console.log("Der letzte Block ist:" + lastBlock);
    
  let lastArray = []; // Initialize list with mixedArrays
      
  for (let i = 0; i < result.length; i++) {
    const subArray = result[i];  
    
    // Überprüfe, ob die Länge des aktuellen Unterarrays gleich lastBlock ist
    if (Number(subArray.length) === Number(lastBlock)) {
      console.log(`Unterarray mit Länge ${lastBlock} gefunden:`, subArray);
      lastArray = shuffleArray(subArray); // Concatenate the found subArray to the list
      console.log("Der geshuffelte Endblock= "+lastArray)
      break; // Stoppt die Schleife, nachdem ein passendes Unterarray gefunden wurde
    }
  }
    
  const list = mixedArrays.concat(lastArray)
    
  console.log(list); // Das große Array mit den gemischten Arrays ausgeben
  console.log(list.length);

  return list;
}
export default varBlocks;
