import  express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from './Models/User.js';
import Contacts from './Models/Contact.js';
import Inscription from './Models/inscription.js';
import UserConnecté from './Models/UsersConnecté.js';
import UserNONConnecté from './Models/UserNONConnecté.js';
import Ecole from './Models/Ecole.js';
import Domaine from './Models/Domaine.js';
import Event from './Models/Events.js';
import nodemailer from "nodemailer";
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import  sendEmailToUsers  from './Models/mailer.js';
import bodyParser from 'body-parser';
dotenv.config()
// Démarrer le serveur
const PORT = 5001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// Connecter MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected ✅');

    // Start server only after DB is connected
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
  .catch((err) => console.error('MongoDB connection error:', err));

// Route pour enregistrer un message de contact
app.post("/api/contact", async (req, res) => {
    try {
        const { nom, email, sujet, message } = req.body;
        console.log(req.body)
        if (!nom || !email || !sujet || !message) {

            return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
        }
        console.error('ER')


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
  app.post('/api/check-login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier que les champs sont présents
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
        }

        // Vérifier l'utilisateur non connecté
        let user = await UserNONConnecté.findOne({ email });
        if (user) {
            // Vérifier si l'utilisateur existe déjà dans UserConnecté
            const existingUser = await UserConnecté.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet utilisateur est déjà connecté!' });
            }

            // Créer une instance de UserConnecté
            const { name, prenom, password: userPassword } = user;
            const hashedPassword = await bcrypt.hash(userPassword, 10); // Hachage du mot de passe si nécessaire

            // Créer l'utilisateur connecté
            const userConnected = new UserConnecté({ name, prenom, email, password: hashedPassword });

            // Sauvegarder l'utilisateur connecté
            await userConnected.save();

            // Supprimer l'utilisateur de UserNONConnecté
            await user.deleteOne({ email });

            // Répondre avec un message et rediriger
            return res.json({ message: 'Connexion réussie en tant que utilisateur!', redirect: `/user/${userConnected._id}` });
        }

        // Vérifier l'école dans le modèle Inscription
        let school = await Inscription.findOne({ email });
        if (school) {
            // Comparer le mot de passe haché avec le mot de passe saisi
            if (await bcrypt.compare(password, school.password)) {
                // Répondre avec un message et rediriger
                return res.json({ message: 'Connexion réussie en tant que école!',id: school._id , redirect: `/school/${school._id}` });
            }
        }

        // Si aucun utilisateur ou école n'a été trouvé
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error); // Log pour déboguer
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
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
app.get('/api/shools',async(req,res)=>{
  try{
    const users =await Inscription.find();
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});
app.get('/api/users',async(req,res)=>{
  try{
    const users =await UserNONConnecté.find();
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});






app.post('/users_non_connected', async (req, res) => {
  const { name, prenom, email, password } = req.body;
  const user = new UserNONConnecté({ name, prenom, email, password });
  try {
      await user.save();
      res.status(201).send(user);
  } catch (err) {
      res.status(500).send(err);
  }
});


app.get('/users_non_connected',async(req,res)=>{
  try{
    const users =await UserNONConnecté.find();
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});

app.put('/users_non_connected/:id',async(req,res)=>{
  const {name,prenom,email,password}=req.body;
  try{
  const users= await UserNONConnecté.findByIdAndUpdate(req.params.id,{name,prenom,email,password},{new:true});
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});

app.delete('/users_non_connected/:id',async(req,res)=>{
 try{
    await UserNONConnecté.findByIdAndDelete(req.params.id);
    res.status(200).send('user connecté deleted');
  }
  catch(err){
    res.status(500).send(err);
  }
});






app.post('/api/ecoles', async (req, res) => {
  const { nom, description, niveauBac, img,lieu } = req.body;
  const ecole = new Ecole({ nom, description, niveauBac, img,lieu });
  try {
      await ecole.save();
      res.status(201).send(ecole);
  } catch (err) {
      res.status(500).send(err);
  }
});
app.get('/api/ecoles',async(req,res)=>{
  try{
    const ecole =await Ecole.find();
    res.status(200).json(ecole);
  }
  catch(err){
    res.status(500).send(err);
  }
});
app.get('/api/domaines',async(req,res)=>{
  try{
    const domaine =await Domaine.find().populate("ecoles");
    res.status(200).json(domaine);
  }
  catch(err){
    res.status(500).send(err);
  }
});


app.get('/api/users/counter', async (req, res) => {
  try {
      // Comptage des utilisateurs connectés et non connectés
      const connectedUsersCount = await UserConnecté.countDocuments(); // Assure-toi d'avoir un champ 'isConnected' dans ton modèle
      const disconnectedUsersCount = await UserNONConnecté.countDocuments();
      const disconnectedDomaines = await Domaine.countDocuments();
      // Envoie les données sous forme de réponse
      res.json({
          connectedStudents: connectedUsersCount,
          disconnectedStudents: disconnectedUsersCount,
          disconnectedDomaines:disconnectedDomaines  // Exemple statique, à adapter en fonction de tes données réelles
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      res.status(500).send('Erreur serveur');
  }
});

app.post('/api/domaines', async (req, res) => {
  const { nom, ecoles } = req.body;

  try {
    const domaine = new Domaine({ nom, ecoles }); // "nom" et pas "name"
    await domaine.save();
    res.status(201).json(domaine);
  } catch (err) {
    res.status(400).json({ message: err.message, errors: err.errors });
  }
});

app.post('/usersconnected', async (req, res) => {
  const { name, prenom, email, password } = req.body;
  const user = new UserConnecté({ name, prenom, email, password });
  try {
      await user.save();
      res.status(201).send(user);
  } catch (err) {
      res.status(500).send(err);
  }
});


app.get('/usersconnected',async(req,res)=>{
  try{
    const users =await UserConnecté.find();
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});

app.put('/usersconnected/:id',async(req,res)=>{
  const {name,prenom,email,password}=req.body;
  try{
  const users= await UserConnecté.findByIdAndUpdate(req.params.id,{name,prenom,email,password},{new:true});
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});

app.delete('/usersconnected/:id',async(req,res)=>{
 try{
    await UserConnecté.findByIdAndDelete(req.params.id);
    res.status(200).send('user connecté deleted');
  }
  catch(err){
    res.status(500).send(err);
  }
});



app.post('/events', async (req, res) => {
  const { nom, lieu, description, date, school } = req.body;

  const events = new Event({ nom, lieu, description, date });
// console.log(nom, lieu, description, date);
  try {
    await events.save();

    // Récupérer tous les utilisateurs liés à l’école
    const users = await UserConnecté.find();
    const emails = users.map(u => u.email);
console.log(emails);
    // ✅ Utiliser des backticks (`) pour interpolation
    const subject = `Nouvel événement : ${nom}`;
    const message = `Bonjour,

Un nouvel événement a été ajouté :
Nom : ${nom}\\n
Lieu : ${lieu}\\n
Date : ${date}\\n
Description : ${description}\\n

Merci.`;

    await sendEmailToUsers(emails, subject, events);

    res.status(201).send(events);
  } catch (err) {
    console.error('Erreur en envoyant les emails :', err);
    res.status(500).send(err);
  }
});


app.get('/events',async(req,res)=>{
  try{
    const events =await Event.find();
    res.status(200).json(events);
  }
  catch(err){
    res.status(500).send(err);
  }
});

app.put('/events/:id',async(req,res)=>{
  const {nom, lieu, description, date}=req.body;
  try{
  const events= await Event.findByIdAndUpdate(req.params.id,{nom, lieu, description, date},{new:true});
    res.status(200).json(events);
  }
  catch(err){
    res.status(500).send(err);
  }
});

app.delete('/events/:id',async(req,res)=>{
 try{
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).send('events deleted');
  }
  catch(err){
    res.status(500).send(err);
  }
});