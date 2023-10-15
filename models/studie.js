import mongoose from "mongoose";

const studieSchema = new mongoose.Schema({
    Studienname: {
        type: String,
        required: true,
        maxlength: 50
    },
    Methode_Randomisierung: {
        type: String,
        default:0
    },
    Anzahl_Gruppen: {
        type: String,
        default: 0 
    },
    Anzahl_Stratifizierung: {
        type: Number,
        default: 0       
    },
},
{timestamps: true}
)

const StudyModel =  mongoose.models.studie || mongoose.model("studie", studieSchema)

export default StudyModel