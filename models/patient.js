import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        maxlength: 50,
    },
    Strata: {
        type: [String], // Hier wurde "Number" zu "String" geändert
        required: false,
        default: ['','']
    },
    group: {
        type: String,
        required: true,
        maxlength: 50
    },
    Studie: {        
        type: String,
        required: true,
    },
    Zentrum: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const PatientModel = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default PatientModel;


// 