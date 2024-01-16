import { Random } from 'random';


function BiasedCoin({caseNumber, biasedCoin }) {

    console.log( biasedCoin)
    //console.log('x'+typeof biasedCoin)
    console.log( 'Die Fallzahl ist '+caseNumber)

    const random = new Random();

    // Array für die Ergebnisse
    const ergebnisse = [];

    // Die Funktion 100 Mal aufrufen und Ergebnisse speichern
    for (let i = 0; i < caseNumber; i++) {
        // Verwende den Zufallszahlengenerator der 'random' Bibliothek
        const ergebnis = Math.round(random.float() * 10) / 10; // Multipliziere mit 10 und runde auf 1 Dezimalstelle
        ergebnisse.push(ergebnis < biasedCoin ? 0 : 1);
    }

    // Zähler für Nullen und Einsen
    let nullen = 0;
    let einsen = 0;

    // Zählen, wie viele Nullen und Einsen im Array sind
    for (let j = 0; j < ergebnisse.length; j++) {
        if (ergebnisse[j] === 0) {
            nullen++;
        } else {
            einsen++;
        }
    }

    // Ergebnisse ausgeben
    console.log("Ergebnisse:", ergebnisse);
    console.log("Anzahl der Nullen:", nullen);
    console.log("Anzahl der Einsen:", einsen);

    return ergebnisse
}
export default BiasedCoin;