import express  from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt'
const app = express();
app.use(express.json());
app.use(cors());
import User from '../Models/User.js';
import School from '../Models/School.js';
// import Contacts from '../Models/Contact.js';
import Inscription from '../Models/inscription.js'
// Connecter MongoDB
mongoose.connect("mongodb+srv://omaimaelbdraouy:r9oc2gzlMHYB0ZEH@cluster0.uapyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
app.post("/api/contact", async (req, res) => {
    try {
        const { nom, email, sujet, message } = req.body;

        if (!nom || !email || !sujet || !message) {
            return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
        }

        // Sauvegarde dans MongoDB
        const newContact = new Contacts({ nom, email, sujet, message });
        await newContact.save();

        res.json({ success: true, message: "Votre message a été enregistré avec succès !" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur serveur, veuillez réessayer." });
    }
});

app.post('/api/check-login', async (req, res) => {
  const { email, password } = req.body;
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
      return res.json({ message: 'Connexion réus  sie en tant qu\'école!', redirect: '/school' });
    } else {
      return res.status(400).json({ message: 'Mot de passe incorrect pour l\'école' });
    }
  }
  return res.status(400).json({ message: 'Email non trouvé'});
});

// Sign up
app.post('/api/register', async (req, res) => {
  try {
      const { schoolName, email, password, phoneNumber } = req.body;
      const existEmail = await Inscription.findOne({ email });
      const existPhoneNumber = await Inscription.findOne({phoneNumber})
      const existSchoolName = await Inscription.findOne({schoolName})

      if (existEmail || existPhoneNumber || existSchoolName) {
          if(existEmail){
            return res.status(400).json({ error: "Email existe déjà." });
          }

          if(existSchoolName){
            return res.status(400).json({ error: "Le nom d'école existe déjà." });
          }

          if(existPhoneNumber){
            return res.status(400).json({ error: "Numéro de téléphone existe déjà." });
          }
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newSchool = new Inscription({ email, password: hashedPassword, schoolName, phoneNumber });
      await newSchool.save();

      // console.log('ECOLE enregistré avec succès');
      res.status(201).json({ message: "Ecole enregistré avec succès" });

  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});



app.listen(5001, () => {
  console.log('Server is running on port 5000');
});
