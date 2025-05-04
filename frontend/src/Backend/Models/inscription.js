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
    resetToken: String,
    resetTokenExpiry: Date,
}, {
    timestamps: true
});

inscriptionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Inscription = mongoose.model('Inscription', inscriptionSchema);
export default Inscription;
