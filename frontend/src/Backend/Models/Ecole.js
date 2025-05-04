// models/Ecole.js
import mongoose from 'mongoose';

const ecoleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  niveauBac: { type: String }, // ou Number si tu veux la moyenne
  img: { type: String }, // URL de l’image
  lieu: { type: String },
  domaine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domaine'
  }
});

const Ecole = mongoose.model('Ecole', ecoleSchema);
export default Ecole;
