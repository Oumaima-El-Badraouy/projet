import express  from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
import User from '../Models/User.js';
import School from '../Models/School.js';
// Connecter MongoDB
mongoose.connect("mongodb://omaimaelbdraouy:r9oc2gzlMHYB0ZEH@federateddatabaseinstance0-uapyf.a.query.mongodb.net/?ssl=true&authSource=admin")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


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
      return res.json({ message: 'Connexion réussie en tant qu\'école!', redirect: '/school' });
    } else {
      return res.status(400).json({ message: 'Mot de passe incorrect pour l\'école' });
    }
  }
  return res.status(400).json({ message: 'Email non trouvé'});
});


app.listen(5001, () => {
  console.log('Server is running on port 5000');
});
