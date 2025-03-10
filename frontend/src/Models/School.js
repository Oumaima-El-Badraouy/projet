import mongoose from 'mongoose';
const schoolshema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password: {
        type: String,
        required: true, // Le mot de passe est obligatoire
      },
});
const School=mongoose.model('School',schoolshema);
export default School;