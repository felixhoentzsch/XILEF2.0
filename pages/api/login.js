import cookie from "cookie";
import mongodb from "@/utils/mongodb";
import UserModel from "@/models/user";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongodb.dbConnect();
      const users = await UserModel.find({ role: 'MASTER' });
      const { benutzer, passwort } = req.body;
      console.log({ benutzer, passwort });

      let isAuthenticated = false;

      for (const user of users) {
        if (benutzer === user.username && passwort === user.passwort) {
          isAuthenticated = true;
          break; // Wenn eine Übereinstimmung gefunden wurde, die Schleife beenden
        }
      }

      if (isAuthenticated) {
        // Erfolgreicher Login für mindestens einen Benutzer

        // Setze ein Sitzungscookie, um den Benutzer über die Sitzung hinweg zu speichern
        const serializedUser = JSON.stringify({ username: benutzer });
        const sessionCookie = cookie.serialize('sessionUser', serializedUser, {
          httpOnly: true,
          maxAge: 60 * 60 * 24, // Gültigkeit des Cookies in Sekunden (hier 24 Stunden)
          path: '/', // Pfad, auf dem das Cookie verfügbar ist
        });
        res.setHeader('Set-Cookie', sessionCookie);
        console.log({sessionCookie})

        res.status(200).json('Erfolgreich');
      } else {
        // Login fehlgeschlagen
        res.status(400).json('Login fehlgeschlagen');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Interner Serverfehler');
    }
  }
}
















































//  export default async function handler(req, res) {

//     if (req.method === "POST") {
//       try {
//         await mongodb.dbConnect();
//         const users = await User.find({ role: "MASTER" });
//         const { benutzer, passwort } = req.body;
//         console.log({ benutzer, passwort });
  
//         let isAuthenticated = false;
  
//         for (const user of users) {
//           if (benutzer === user.username && passwort === user.passwort) {
//             isAuthenticated = true;
//             break; // Wenn eine Übereinstimmung gefunden wurde, die Schleife beenden
//           }
//         }
  
//         if (isAuthenticated) {
//           // Erfolgreicher Login für mindestens einen Benutzer
//           res.status(200).json("Erfolgreich");
//         } else {
//           // Login fehlgeschlagen
//           res.status(400).json("Login fehlgeschlagen");
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(500).json("Interner Serverfehler");
//       }
//     }
//   }
  