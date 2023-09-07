import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50
    },
    passwort: {
        type: Number,
        required: true,
        maxlength: 20
    },
    role: {
        type: String,
        required: true,
        maxlength: 15
    },
    Zentrum_ID: {
        type: Number,
        required: true,
    },
    StudienID: {
        type: Number,
        required: true,
    },
    mail:{
        type: String,
        default: "NULL",
        maxlength:100
        
    }
    
},
{timestamps: true}
)

export default mongoose.models.user || mongoose.model("user", userSchema)