// backend/models/User.js
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // L'email doit être unique
    trim: true,    // Supprime les espaces avant et après l'email
  },
  password: {
    type: String,
    required: true, // Le mot de passe est obligatoire
  },
});

// Créer le modèle de l'utilisateur
const User = mongoose.model('User', userSchema);

export default User;
