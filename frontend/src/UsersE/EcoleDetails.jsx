import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EcoleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ecole, setEcole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Etats pour les commentaires et formulaire
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [commentaireLoading, setCommentaireLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // contrôle l'affichage du formulaire

  useEffect(() => {
    const fetchEcole = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/ecoles/${id}`);
        setEcole(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'école :", error);
        setLoading(false);
      }
    };

    const fetchCommentaires = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/ecoles/${id}/commentaires`);
        setCommentaires(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires :", error);
      }
    };

    fetchEcole();
    fetchCommentaires();
  }, [id]);

  // Ajouter un commentaire
  const handleAjouterCommentaire = async () => {
    if (nouveauCommentaire.trim() === '') {
      alert("Veuillez écrire un commentaire avant de l'envoyer.");
      return;
    }
    setCommentaireLoading(true);
    try {
      const res = await axios.post(`http://localhost:5001/api/ecoles/${id}/commentaires`, {
        texte: nouveauCommentaire,
      });
      setCommentaires([res.data, ...commentaires]);
      setNouveauCommentaire('');
      setShowForm(false); // cacher le formulaire après envoi
    } catch (error) {
      alert("Erreur lors de l'ajout du commentaire.");
    }
    setCommentaireLoading(false);
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!ecole) return <div className="p-6 text-red-500">École non trouvée.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-400 rounded"
      >
        ⬅ Retour
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <img src={ecole.img} alt={ecole.nom} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{ecole.nom}</h2>
          <p className="text-gray-700 mb-4">{ecole.description}</p>
          <p><strong>Lieu:</strong> {ecole.lieu}</p>
          <p><strong>Type:</strong> {ecole.type}</p>
          <p><strong>Seuil Bac:</strong> {ecole.niveauBac}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Commentaires</h3>

        {/* Bouton pour afficher/cacher le formulaire */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
          >
            Ajouter un commentaire
          </button>
        )}

        {/* Formulaire d'ajout de commentaire, affiché uniquement si showForm === true */}
        {showForm && (
          <div className="mb-4">
            <textarea
              rows="3"
              className="w-full border rounded p-2 mb-2"
              placeholder="Écrire un commentaire..."
              value={nouveauCommentaire}
              onChange={(e) => setNouveauCommentaire(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={handleAjouterCommentaire}
                disabled={commentaireLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 disabled:opacity-50"
              >
                {commentaireLoading ? 'Envoi...' : 'Envoyer'}
              </button>

              <button
                onClick={() => setShowForm(false)}
                disabled={commentaireLoading}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {commentaires.length === 0 ? (
          <p className="text-gray-600">Aucun commentaire pour le moment.</p>
        ) : (
          commentaires.map((com) => (
            <div key={com._id} className="border-b py-3">
              <p className="italic text-gray-800">"{com.texte}"</p>
              <small className="text-gray-500">
                Posté le {new Date(com.date).toLocaleDateString()} à {new Date(com.date).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
