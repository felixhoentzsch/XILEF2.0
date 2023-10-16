import { Random } from "random-js";

const random = new Random();

// Erstellen Sie eine Liste von Werten
const items = [1, 0, 1, 0]; // Hauptwerte

// Vollständige Liste
const list4 = [];

// Mischen Sie die Liste zufällig
for (let i = 0; i < 25; i++) {
    // Erstellen Sie eine Kopie von items und mischen Sie sie
    const shuffledItems = random.shuffle([...items]);
    list4.push(shuffledItems);
}

export { list4 };