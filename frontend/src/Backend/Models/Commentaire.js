// models/Commentaire.js
import mongoose from 'mongoose';

const commentaireSchema = new mongoose.Schema({
  ecole: { type: mongoose.Schema.Types.ObjectId, ref: 'Ecole', required: true },
  texte: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Commentaire =mongoose.model('Commentaire',commentaireSchema);
export default Commentaire;