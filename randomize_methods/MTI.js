import { Random } from 'random';


function BiasedCoin({caseNumber, tolerance }) {

    console.log(caseNumber, tolerance)

    const negativeTolerance = tolerance - (2 * tolerance);
    
    // Initialisierung der Variablen
    let zeroVariable = 0;
    let oneVariable = 0;
    
    // Initialisierung des Arrays
    let resultArray = [];
    
    // Anzahl der Durchläufe
    for (let i = 0; i < caseNumber && resultArray.length < caseNumber; i++) {
        // Zufällige Auswahl von 0 oder 1
        let randomBit = Math.round(Math.random());
    
        // Speichern in Array
        resultArray.push(randomBit);
    
        // Update der entsprechenden Variable basierend auf randomBit
        if (randomBit === 0) {
            zeroVariable++;
        } else {
            oneVariable++;
        }
    
        // Überprüfen der Differenz nach jedem Durchlauf
        let diff = zeroVariable - oneVariable;
    
        // Wenn die Differenz größer als die Toleranz ist, die nächste Zahl anpassen
        if (diff >= tolerance) {
            resultArray.push(1);
            console.log('Liste mit 1 korregiert im Durchlauf '+ i)
            oneVariable++;
        } else if (diff <= negativeTolerance) {
            resultArray.push(0);
            console.log('Liste mit 0 korregiert im Durchlauf '+i)
            zeroVariable++;
        }
    }
    
    // Ausgabe der Ergebnisse
    console.log("Array:", resultArray);
    console.log("Null-Variable:", zeroVariable);
    console.log("Eins-Variable:", oneVariable);
    

    return resultArray

}
export default BiasedCoin;