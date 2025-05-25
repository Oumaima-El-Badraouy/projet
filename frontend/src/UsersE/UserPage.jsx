import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './Chatbot';

export default function UserPage() {
  const { id } = useParams();
  const [ecoles, setEcoles] = useState([]);
  const [filters, setFilters] = useState({
    lieu: '',
    type: '',
    seuil: '',
    search: ''
  });
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [questionEmail, setQuestionEmail] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchEcoles();
  }, [id]);

  const handleSubmitQuestion = async () => {
    if (!questionEmail.trim() || !questionText.trim()) {
      alert('Merci de remplir email et question.');
      return;
    }
    setSubmitLoading(true);
    try {
      await axios.post('http://localhost:5001/questions', {
        email: questionEmail,
        question: questionText,
      });
      toast.success('Merci pour nous contacter. Le conseiller va te répondre par email.', {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

      setQuestionEmail('');
      setQuestionText('');
      setModalOpen(false);
    } catch (error) {
      alert('Erreur lors de l\'envoi de la question.');
      console.error(error);
    }
    setSubmitLoading(false);
  };

  const fetchEcoles = async () => {
    try {
      const queryParams = {};
      if (filters.lieu) queryParams.lieu = filters.lieu;
      if (filters.type) queryParams.type = filters.type;
      if (filters.seuil) queryParams.seuil = filters.seuil;
      if (filters.search) queryParams.search = filters.search;

      const query = new URLSearchParams(queryParams).toString();
      const url = query
        ? `http://localhost:5001/api/ecoles?${query}`
        : `http://localhost:5001/api/ecoles`;

      const res = await axios.get(url);
      setEcoles(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erreur chargement écoles :", error);
      setEcoles([]);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-gray-100 shadow">
        <div className="flex items-center space-x-4">
          <img src={DALLEEL} className="h-8" alt="Logo" />
          <span className="font-bold text-xl">Tawjih 360</span>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="search"
              placeholder="Rechercher...🔎 "
              value={filters.search}
              onChange={handleChange}
              onClick={fetchEcoles}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchEcoles(); }}
              className="border rounded px-3 py-1 w-64"
            />
          </div>
          <button
            onClick={() => navigate("/test")}
            className="text-gray-900 bg-green-300 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Test Orientation
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="text-gray-900 bg-blue-400 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Questions
          </button>
          <button
            onClick={handleLogout}
            className="text-red px-4 bg-red-500 py-2 rounded hover:bg-gray-300 hover:bg-red-400 transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Zone filtres */}
      <div className="flex items-center justify-right space-x-4 mt-4 mb-8 px-6 flex-wrap gap-4">
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Type</option>
          <option value="public">Public</option>
          <option value="privé">Privé</option>
        </select>

        <input
          type="number"
          name="seuil"
          placeholder="Seuil max"
          value={filters.seuil}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={fetchEcoles}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
        >
          Filtrer
        </button>
      </div>

      {/* Liste écoles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {Array.isArray(ecoles) && ecoles.length > 0 ? (
          ecoles.map((ecole) => (
            <div
              key={ecole._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={ecole.img}
                alt={ecole.nom}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-bold mb-1">{ecole.nom}</h3>
              <p className="text-sm text-gray-600 mb-1 line-clamp-3">{ecole.description}</p>
              <p className="text-sm">
                <strong>Lieu:</strong> {ecole.lieu}
              </p>
              <p className="text-sm">
                <strong>Seuil:</strong> {ecole.niveauBac}
              </p>
              <button
                onClick={() => navigate(`/ecole/${ecole._id}`)}
                className="mt-3 w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Détails
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Aucune école trouvée.
          </p>
        )}
      </div>

      {/* Message de confirmation */}
      {confirmationMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded max-w-4xl mx-auto mt-4">
          {confirmationMessage}
        </div>
      )}

      {/* Modal Questions */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Pose ta question</h2>

            <input
              type="email"
              placeholder="Ton email"
              value={questionEmail}
              onChange={(e) => setQuestionEmail(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <textarea
              rows="4"
              placeholder="Ta question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={submitLoading}
              >
                Annuler
              </button>

              <button
                onClick={handleSubmitQuestion}
                disabled={submitLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {submitLoading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}
{/* Chatbot d'orientation */}
<div className="mt-12 px-6">
  <Chatbot />
</div>

      <br />
      <Footer />
      <ToastContainer />

    </div>
  );
}
