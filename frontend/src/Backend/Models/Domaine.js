// models/Domaine.js
import mongoose from 'mongoose';

const domaineSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  // Liste des écoles liées à ce domaine (facultatif si tu préfères utiliser ref inverse)
  ecoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole'
  }]
});

const Domaine = mongoose.model('Domaine', domaineSchema);
export default Domaine;
