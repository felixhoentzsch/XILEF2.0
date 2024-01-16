import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
    },
    passwort: {
        type: String, // Hier wurde "Number" zu "String" geändert
        required: true,
        maxlength: 100
    },
    role: {
        type: String,
        required: true,
        maxlength: 50
    },
    Zentrum_ID: {
        type: String,
        required: true,
    },
    Studien_ID: {        
        type: String,
        required: true,
    },
    mail:{
        type: String,
        default: "NULL",
        maxlength: 100
    }
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;


// 