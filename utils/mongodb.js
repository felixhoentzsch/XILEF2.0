import mongoose from 'mongoose'

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = { con: null, promise: null}
}

async function dbConnect () {
    if (cached.con){
        console.log('DB Verbindung aktiv')
        return cached.con
    }

    if (!cached.promise) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(process.env.MONGODB_URI, options).then(mongoose =>{
            console.log('DB Verbindung gestartet')
            return mongoose
        })
    }
    cached.con = await cached.promise
    return cached.con
}

// import mongoose from 'mongoose';

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { con: null, promise: null };
// }

// async function dbConnect() {
//   try {
//     if (cached.con) {
//       console.log('DB Verbindung aktiv');
//       return cached.con;
//     }

//     if (!cached.promise) {
//       const options = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // bufferCommands: false, // Optional, je nach Anforderungen
//       };

//       cached.promise = mongoose.connect(process.env.MONGODB_URI, options)
//         .then((db) => {
//           console.log('DB Verbindung gestartet');
//           return db;
//         })
//         .catch((error) => {
//             console.error('Fehler beim Verbinden mit der Datenbank1:', error);
//             console.error('Fehlerdetails1:', error.message);
//             throw error;
//           });
          
//     }

//     cached.con = await cached.promise;
//     return cached.con;
//   } catch (error) {
//     console.error('Fehler beim Verbinden mit der Datenbank2:', error);
//     throw error;
//   }
// }

async function dbDisconnect() {
  await mongoose.disconnect();
  console.log('DB Verbindung beendet');
}

const mongodb = { dbConnect, dbDisconnect };
export default mongodb;


