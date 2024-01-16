// //---------------
// // const newArray = Array.from({ length: parseInt(blockSize, 10) }, () => 0); 
// // es wird ein Array erstellt was die Länge der eingegebenen Blocklänge hat und mit 0 gefüllt wird

import { Random } from "random-js";

function Block({ blockSize, caseNumber, inputFields }) {

  //   const blockSize = 10
  //  const caseNumber = 100
  //  const inputFields = [1,1]

  const numberField = inputFields.map(Number) // InputFields ist ein Array mit Strings. WIrd hier in Zahlen umgewandelt 
 
  var sum = 0;

  for (var i = 0; i < numberField.length; i++) {
    sum += numberField[i];
  }

  var newArray = []; //enthält "Prototypliste"

  for (var i = 0; i < numberField.length; i++) {
    for (var j = 0; j < numberField[i]; j++) {
      if (newArray.length < numberField.reduce((a, b) => a + b, 0)) { //mehr Elemente hat als die Summe der Werte im inputFields-Array. 
        newArray.push(i);
      }
    }
  }
  console.log('neues Array'+newArray)

  // function duplicateArray(arr, anzahl) {
  //   return Array(anzahl).fill(arr).flat();
  // }--> modernere Ansatz

  function vervielfacheArray(arr, anzahl) {
    var vervielfachtesArray = [];
    for (var i = 0; i < anzahl; i++) {
      vervielfachtesArray = vervielfachtesArray.concat(arr);
    }
    return vervielfachtesArray;
  }

  let completeArray; // Deklaration außerhalb des Blocks

  const rest = blockSize / sum;

  if (rest !== 1) {
    completeArray = [...newArray, ...vervielfacheArray(newArray, rest-1)];
    console.log("neues Array:", completeArray);
  } else {
    completeArray = newArray;
    console.log("altes Array:", newArray);
  }

  const result = Math.ceil(caseNumber / blockSize);

  const list = [];

  for (let i = 0; i < result; i++) {
    const randomArray = shuffleArray(completeArray);
    list.push(randomArray);
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const finishedList = [].concat(...list)

  console.log("list:", finishedList);
  console.log(finishedList.length)

  return finishedList;
}

export default Block;
