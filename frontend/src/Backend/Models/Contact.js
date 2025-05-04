import mongoose from 'mongoose';
const Contact=new mongoose.Schema({
   nom: { type: String, required: true },
    email: { type: String, required: true },
    sujet: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Contacts=mongoose.model('Contact',Contact);
export default Contacts;