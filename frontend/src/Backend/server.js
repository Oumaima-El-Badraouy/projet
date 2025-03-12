import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import User from '../Models/User.js';
import Contacts from '../Models/Contact.js';
import Inscription from '../Models/inscription.js';
const app = express();
app.use(express.json());
app.use(cors());

// Connecter MongoDB
mongoose.connect("mongodb+srv://omaimaelbdraouy:r9oc2gzlMHYB0ZEH@cluster0.uapyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route pour enregistrer un message de contact
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

// Route de connexion
app.post('/api/check-login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
        }

        // Vérifier dans les collections User et School
        let user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return res.json({ message: 'Connexion réussie en tant qu\'utilisateur!', redirect: '/user' });
        }

        let school = await Inscription.findOne({ email });
        if (school && await bcrypt.compare(password, school.password)) {
            return res.json({ message: 'Connexion réussie en tant qu\'école!', redirect: '/school' });
        }

        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

// Route d'inscription
app.post('/api/register', async (req, res) => {
    try {
        const { schoolName, email, password, phoneNumber } = req.body;

        const existSchool = await Inscription.findOne({ email });
        if (existSchool) {
            return res.status(400).json({ error: "L'utilisateur existe déjà." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newSchool = new Inscription({ email, password: hashedPassword, schoolName, phoneNumber });
        await newSchool.save();

        console.log('École enregistrée avec succès');
        res.status(201).json({ message: "École enregistrée avec succès" });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Démarrer le serveur
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
