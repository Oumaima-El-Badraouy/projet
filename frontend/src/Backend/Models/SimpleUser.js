import mongoose from 'mongoose';

const simpleUserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  role: { type: String, default: "simpleuser" },
}, { timestamps: true });

const SimpleUser = mongoose.model('SimpleUser', simpleUserSchema);
export default SimpleUser;