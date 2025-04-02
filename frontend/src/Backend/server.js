import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../Models/User.js';
import Contacts from '../Models/Contact.js';
import Inscription from '../Models/inscription.js';
import UserConnecté from '../Models/UsersConnecté.js';
import UserNONConnecté from '../Models/UserNONConnecté.js';
import nodemailer from "nodemailer";
import jwt  from "jsonwebtoken";
const app = express();
app.use(express.json());
app.use(cors());

// Connecter MongoDB
mongoose.connect("mongodb+srv://oumaima:ZrpOtXRKpZAkjcEF@cluster0.uapyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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


app.post('/forgot-password', async (req, res) => {
    try {
        console.log("Requête reçue avec :", req.body);

        const { email } = req.body;
        if (!email) {
            return res.status(400).send('Email requis');
        }

        const user = await Inscription.findOne({ email });
        if (!user) {
          return res.status(404).send('Utilisateur non trouvé');
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // Expiration du token après 1 heure
        await user.save();
    
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'omaimaelbdraouy@gmail.com',
              pass: 'rhem drbk tcmn aoup',  // Utilise ton mot de passe d'application
            },
          });
          
          transporter.verify((error, success) => {
            if (error) {
              console.log('Erreur de connexion :', error);
            } else {
              console.log('Connexion réussie:', success);
            }
          });
          
    
        // Options de l'email
        const mailOptions = {
          to: user.email,
          from: 'omaimaelbdraouy@gmail.com',
          subject: 'Réinitialisation du mot de passe',
          text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe :\n\nhttp://localhost:5173/reset-password/${token}\n\nCe lien est valable pendant 1 heure.`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Erreur lors de l\'envoi de l\'email:', error);
              return res.status(500).send("Erreur lors de l'envoi de l'email");
            }
            console.log('Email envoyé:', info.response);
            res.status(200).send('Email envoyé avec succès !');
          });
          
       
    
      } catch (error) {
        console.error('Erreur :', error);
        res.status(500).send("Erreur lors de l'envoi de l'email");
      }
    });

  

    app.post('/reset-password/:token', async (req, res) => {
        const { token } = req.params;
        const { newPassword } = req.body;
    
        try {
            const user = await Inscription.findOne({
                resetToken: token,
                resetTokenExpiry: { $gt: Date.now() },
            });
    
            if (!user) {
                return res.status(400).send('Token invalide ou expiré');
            }
    
            // Hacher le mot de passe avant de le sauvegarder
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Hachage avec un salt de 10 tours
            user.password = hashedPassword;
    
            // Supprimer les informations de token de réinitialisation
            user.resetToken = undefined;
            user.resetTokenExpiry = undefined;
    
            await user.save(); // Sauvegarder l'utilisateur avec le mot de passe mis à jour
    
            res.status(200).send('Mot de passe réinitialisé avec succès!');
        } catch (error) {
            console.error('Erreur :', error);
            res.status(500).send("Erreur lors de la réinitialisation du mot de passe");
        }
    });
    
    
app.post("/api/users/import", async (req, res) => {
    const users = req.body;
  
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Données invalides" });
    }
  
    try {
      const hashedUsers = await Promise.all(
        users.map(async (user) => ({
          nom: user.nom,
          email: user.email,
          password: await bcrypt.hash(user.password, 10), // Hachage du mot de passe
        }))
      );
  
      await User.insertMany(hashedUsers);
      res.json({ message: "Utilisateurs enregistrés avec succès !" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'enregistrement." });
    }
  });
  
// Route de connexion
app.post('/api/check-login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
        }

        let user = await User.findOne({ email });
        if (user) {
            // Comparer le mot de passe haché avec le mot de passe saisi
            if (await bcrypt.compare(password, user.password)) {
           
                return res.json({ message: 'Connexion réussie en tant que utilisateur!', redirect: `/user/${user._id}` });
            }
        }

        let school = await Inscription.findOne({ email });
        if (school) {
            // Comparer le mot de passe haché avec le mot de passe saisi
            if (await bcrypt.compare(password, school.password)) {
            

            // Sauvegarder l'utilisateur non connecté dans la base de données
            await UserNONConnecté.save();
                return res.json({ message: 'Connexion réussie en tant que école!', redirect: `/school/${school._id}` });
        }
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

        const existEmail = await Inscription.findOne({ email });
        const existPhoneNumber = await Inscription.findOne({ phoneNumber });
        const existSchoolName = await Inscription.findOne({ schoolName });

        if (existEmail || existPhoneNumber || existSchoolName) {
            if (existEmail) {
                return res.status(400).json({ error: "Email existe déjà." });
            }
            if (existSchoolName) {
                return res.status(400).json({ error: "Le nom d'école existe déjà." });
            }
            if (existPhoneNumber) {
                return res.status(400).json({ error: "Numéro de téléphone existe déjà." });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newSchool = new Inscription({ email, password: hashedPassword, schoolName, phoneNumber });
        await newSchool.save();
console.log(newSchool._id);
        res.status(201).json({ message: "École enregistrée avec succès" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
app.post('/api/connected-users', async (req, res) => {
  try {
      const { email, password, name } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await UserConnecté.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'L\'utilisateur est déjà connecté.' });
      }

      const newUser = new UserConnecté({
          email,
          password,  // Assure-toi de hasher le mot de passe avant de le stocker
          name,
          connectedAt: new Date(),
          lastActivityAt: new Date(),
      });

      await newUser.save();
      res.status(201).json({ message: 'Utilisateur connecté avec succès.', user: newUser });
  } catch (error) {
      res.status(500).json({ message: 'Erreur interne du serveur.', error });
  }
});
app.get('/api/connected-users', async (req, res) => {
  try {
      const users = await UserNONConnecté.find();
      res.json({ users });
  } catch (error) {
      res.status(500).json({ message: 'Erreur interne du serveur.', error });
  }
});
app.put('/api/connected-users/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const user = await UserConnecté.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      user.lastActivityAt = new Date();  // Mettre à jour la dernière activité
      await user.save();

      res.json({ message: 'Activité mise à jour.', user });
  } catch (error) {
      res.status(500).json({ message: 'Erreur interne du serveur.', error });
  }
});

// Démarrer le serveur
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
