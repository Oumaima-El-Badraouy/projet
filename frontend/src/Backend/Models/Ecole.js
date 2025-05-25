// models/Ecole.js
import mongoose from 'mongoose';

const ecoleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  niveauBac: { type: Number }, // seuil
  img: { type: String }, // URL image
  lieu: { type: String },
  type: { type: String, enum: ['public', 'privé'] }, // ajouté
  domaine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domaine'
  }
});

const Ecole = mongoose.model('Ecole', ecoleSchema);
export default Ecole;
