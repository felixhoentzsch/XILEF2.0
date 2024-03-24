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
    Fallzahl:{
        type:Number,
        default:0
    },
    Randomization_Parameter:{
        type: String,
        default: 0,
    },
    blockSize:{
        type: String,
        default:0
    },
    Anzahl_Gruppen: {
        type: String,
        default: 0 
    },
    Verteilung:{
        type: Array,
        default:0
    },
    Name_Behandlung:{
        type: Array,
        default:0
    },
    Stratifizierung: {
        type: Array,
        default: 0       
    },
    Merkmale:{
        type: Array,
        default:0
    },
    Rando_Liste:{
        type: Array,
        default: 0
    },
    Rando_Liste_use:{
        type: Array,
        default: 0
    },
    breakingTheBlind:{
        type: Number,
        default: 0
    },
},
{timestamps: true}
)

const StudyModel =  mongoose.models.studie || mongoose.model("studie", studieSchema)

export default StudyModel