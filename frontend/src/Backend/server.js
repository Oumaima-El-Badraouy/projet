import  express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import path from 'path';
import fetch from 'node-fetch';
import crypto from 'crypto';
import User from './Models/User.js';
import Contacts from './Models/Contact.js';
import Inscription from './Models/inscription.js';
import UserConnecté from './Models/UsersConnecté.js';
import UserNONConnecté from './Models/UserNONConnecté.js';
import Ecole from './Models/Ecole.js';
import Domaine from './Models/Domaine.js';


import Question from './Models/Question.js';
import Event from './Models/Events.js';
import Commentaire  from './Models/Commentaire.js';
import SimpleUser  from './Models/SimpleUser.js';
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
app.use('/images', express.static(path.join(process.cwd(), 'images')));


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


  const GROQ_API_KEY ='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';
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // ou "mixtral-8x7b-32768"
        messages: [{ role: "user", content: message }],
        temperature: 0.3,
        max_tokens: 70,
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("Erreur chatbot :", error);
    res.status(500).json({ error: "Erreur lors de la communication avec Groq" });
  }
});



app.post('/questions', async (req, res) => { 
  try {
    const { email, question } = req.body;
    if (!email || !question) {
      return res.status(400).json({ message: 'Email et question sont requis.' });
    }
    const nouvelleQuestion = new Question({ email, question });
    await nouvelleQuestion.save();

    // Ici tu peux envoyer un mail à un conseiller si tu veux (via nodemailer par ex)

    res.status(201).json(nouvelleQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
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

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
    }

    // Cherche un utilisateur non connecté
    let user = await UserNONConnecté.findOne({ email });
    if (user) {
      const existingUser = await UserConnecté.findOne({ email });
      if (existingUser) {
        return res.json({ message: 'Déjà connecté !', redirect: `/user/${existingUser._id}` });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Optionnel : rechercher l'école correspondante par email, si applicable
      const ecole = await Inscription.findOne({ email: user.ecoleEmail });
      const idEcole = ecole ? ecole._id : null;

      const userConnected = new UserConnecté({
        nom: user.nom,
        prenom: user.prenom,
        email,
        password: hashedPassword,
        idEcole: idEcole
      });

      await userConnected.save();
      await UserNONConnecté.deleteOne({ email });

      return res.json({ message: 'Connexion réussie en tant qu’utilisateur !', redirect: `/user/${userConnected._id}` });
    }

    // Sinon, vérifier si c'est une école
    let school = await Inscription.findOne({ email });
    if (school) {
      const match = await bcrypt.compare(password, school.password);
      if (match) {
        return res.json({ message: 'Connexion réussie en tant qu’école !', id: school._id, redirect: `/school/${school._id}` });
      }
    }

    return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('idEcole'); // si tu veux les détails de l’école
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', err });
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
app.delete('/deleteAll', async (req, res) => {
  try {
    await Ecole.deleteMany(); // supprime tous les documents
    res.status(200).json({ message: 'Toutes les écoles ont été supprimées.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.', error });
  }
});


app.get('/questions',async(req,res)=>{
  try{
    const users =await Question.find();
    res.status(200).json(users);
  }
  catch(err){
    res.status(500).send(err);
  }
});
app.post('/api/simpleusers/register', async (req, res) => {
  try {
    const { nom, prenom, email, motdepasse } = req.body;

    // Vérifie que tous les champs sont présents
    if (!nom || !prenom || !email || !motdepasse) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Vérifie si l'email existe déjà
    const existEmail = await SimpleUser.findOne({ email });
    if (existEmail) {
      return res.status(400).json({  success: false, error: "Email existe déjà." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const role="simpleuser";
    // Création du nouvel utilisateur
    const newUser = new SimpleUser({
  nom,
  prenom,
  email,
  motdepasse: hashedPassword,
  role, // Ajouté si requis par le modèle
});


    await newUser.save();

    console.log('Nouvel utilisateur:', newUser._id);

    // Réponse JSON attendue côté front
  res.status(201).json({
  success: true,
  message: "Utilisateur enregistré avec succès",
  userId: newUser._id,
  role:role,
  redirect: "/test"
});


  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
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
  const { nom, description, niveauBac, img, lieu, type } = req.body; // ajouter 'type'
  
  const ecole = new Ecole({ nom, description, niveauBac, img, lieu, type });

  try {
    await ecole.save();
    res.status(201).send(ecole);
  } catch (err) {
    console.error("Erreur lors de la création d'une école :", err);
    res.status(500).send(err);
  }
});

// GET /api/ecoles?lieu=...&type=...&seuil=...
app.get('/api/ecoles', async (req, res) => {
  try {
    const { lieu, type, seuil, search } = req.query;
    let query = {};

    // Filtres simples
    if (lieu) query.lieu = { $regex: lieu, $options: 'i' };
    if (type) query.type = type;
    if (seuil) query.niveauBac = { $lte: parseFloat(seuil) };

    // Recherche globale
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const seuilNum = parseFloat(search);

      query.$or = [
        { nom: { $regex: searchRegex } },
        { lieu: { $regex: searchRegex } },
        ...(isNaN(seuilNum) ? [] : [{ niveauBac: seuilNum }])  // recherche exacte sur niveauBac
      ];
    }

    const ecoles = await Ecole.find(query);
    res.status(200).json(ecoles);

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});
// Route GET /api/ecoles/:id
app.get('/api/ecoles/:id', async (req, res) => {
  try {
    const ecole = await Ecole.findById(req.params.id);
    if (!ecole) {
      return res.status(404).json({ message: "École non trouvée" });
    }
    res.status(200).json(ecole);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});


// Route pour récupérer les commentaires d'une école
app.get('/api/ecoles/:id/commentaires', async (req, res) => {
  try {
    const ecoleId = req.params.id;
    const commentaires = await Commentaire.find({ ecole: ecoleId });
    res.json(commentaires);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



// Récupérer les commentaires d'une école
app.get('/:id/commentaires', async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ ecole: req.params.id }).sort({ date: -1 });
    res.json(commentaires);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des commentaires" });
  }
});


app.post('/api/ecoles/:id/commentaires', async (req, res) => {
  try {
    const ecoleId = req.params.id;
    const { texte } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ecoleId)) {
      return res.status(400).json({ message: "ID école invalide." });
    }

    if (!texte || texte.trim() === '') {
      return res.status(400).json({ message: "Le texte du commentaire est obligatoire." });
    }

    const nouveauCommentaire = new Commentaire({
      ecole: ecoleId,
      texte: texte.trim(),
    });

    const savedComment = await nouveauCommentaire.save();
    res.status(201).json(savedComment);

  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    res.status(500).json({ message: "Erreur serveur" });
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