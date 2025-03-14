import mongoose from 'mongoose';
const inscriptionshema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password: {
        type: String,
        required: true, 
    },
    schoolName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,
        trim:true,
    },
    resetToken: String, // Le token de réinitialisation
    resetTokenExpiry: Date,
});
const inscription = mongoose.model('Inscription',inscriptionshema);
export default inscription;