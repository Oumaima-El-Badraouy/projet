import mongoose from 'mongoose';

const inscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
        unique: true,
        trim: true,
    },
    resetToken: String,  // Token de réinitialisation
    resetTokenExpiry: Date, // Date d'expiration du token
}, {
    timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

// Transformer l'output JSON pour afficher "id" au lieu de "_id"
inscriptionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false, // Supprime "__v"
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

// Créer et exporter le modèle
const Inscription = mongoose.model('Inscription', inscriptionSchema);
export default Inscription;
