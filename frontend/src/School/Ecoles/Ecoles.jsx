// src/pages/Ecoles.jsx
import React, { useState } from 'react';

const Ecoles = () => {
  const [ecoles, setEcoles] = useState([
    { id: 1, nom: 'École A', admin: true },
    { id: 2, nom: 'École B', admin: false },
  ]);
  const [nouvelleEcole, setNouvelleEcole] = useState('');

  const ajouterEcole = () => {
    if (nouvelleEcole.trim()) {
      setEcoles([...ecoles, { id: Date.now(), nom: nouvelleEcole, admin: false }]);
      setNouvelleEcole('');
    }
  };

  const supprimerEcole = (id) => {
    setEcoles(ecoles.filter(ecole => ecole.id !== id || ecole.admin));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gérer les Écoles</h2>
      <input 
        type="text" 
        className="border p-2 mr-2" 
        value={nouvelleEcole} 
        onChange={(e) => setNouvelleEcole(e.target.value)}
        placeholder="Ajouter une école"
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={ajouterEcole}>Ajouter</button>
      <ul className="mt-4">
        {ecoles.map(ecole => (
          <li key={ecole.id} className="flex justify-between p-2 border-b">
            {ecole.nom} {!ecole.admin && (
              <button className="bg-red-500 text-white px-2" onClick={() => supprimerEcole(ecole.id)}>Supprimer</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ecoles;