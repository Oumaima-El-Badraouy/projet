import express  from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
import User from '../Models/User.js';
import School from '../Models/School.js';
import Contacts from '../Models/Contact.js';
// Connecter MongoDB
mongoose.connect(process.env.Mongodb)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
app.post("/api/contact", async (req, res) => {
    try {
        const { nom, email, sujet, message } = req.body;

        if (!nom || !email || !sujet || !message) {
            return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
        }

        
        const newContact = new Contacts({ nom, email, sujet, message });
        await newContact.save();

        res.json({ success: true, message: "Votre message a été enregistré avec succès !" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur serveur, veuillez réessayer." });
    }
});

app.post('/api/check-login', async (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password ) {
    return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
}

  const user = await User.findOne({ email });
  if (user) {
    if (user.password === password) {
      return res.json({ message: 'Connexion réussie en tant qu\'utilisateur!', redirect: '/user' });
    } else {
      return res.status(400).json({ message: 'Mot de passe incorrect pour l\'utilisateur' });
    }
  }
  const school = await School.findOne({ email });
  if (school) {
    if (school.password === password) {
      return res.json({ message: 'Connexion réussie en tant qu\'école!', redirect: '/school' });
    } else {
      return res.status(400).json({ message: 'Mot de passe incorrect pour l\'école' });
    }
  }
  return res.status(400).json({ message: 'Email non trouvé'});
});

const Port=process.env.Port || 5001;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
