
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    motdepasse: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
    if (!form.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
    if (!form.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!validateEmail.test(form.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!form.motdepasse.trim()) {
      newErrors.motdepasse = 'Le mot de passe est obligatoire';
    } else if (form.motdepasse.length < 8) {
      newErrors.motdepasse = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) return;

    try {
      const res = await fetch('http://localhost:5001/api/simpleusers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

    
    if (data.success) {
  if (data.redirect) {
    navigate(data.redirect);
  } else {
    setSuccessMessage(data.message || 'Inscription réussie !');
    setForm({ nom: '', prenom: '', email: '', motdepasse: '' });
  }
} else {
  // Utilise soit data.error soit data.message
  setErrorMessage( data.message || "Erreur lors de l'inscription");
}

    } catch (error) {
      console.error(error);
      setErrorMessage('Erreur serveur');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Créer un compte</h2>

        {successMessage && (
          <p className="text-green-600 mb-4 text-center font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 mb-4 text-center font-medium">{errorMessage}</p>
        )}

        {/* Nom */}
        <div className="mb-4">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md ${
              errors.nom ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
        </div>

        {/* Prénom */}
        <div className="mb-4">
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md ${
              errors.prenom ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mot de passe */}
        <div className="mb-6">
          <input
            type="password"
            name="motdepasse"
            placeholder="Mot de passe"
            value={form.motdepasse}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md ${
              errors.motdepasse ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.motdepasse && (
            <p className="text-red-500 text-sm mt-1">{errors.motdepasse}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={!form.nom || !form.prenom || !form.email || !form.motdepasse}
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
