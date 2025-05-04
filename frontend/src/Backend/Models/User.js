import mongoose from 'mongoose';const userSchema = new mongoose.Schema({
 nom: {
  type: String,
  required: [true, "Le nom est requis"]
},
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
    trim: true,
   match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Veuillez entrer un email valide"]
, // Vérification du format email
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est requis"],
    minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"], // Sécurité minimale
  },
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Créer et exporter le modèle
const User = mongoose.model('User', userSchema);
export default User;
