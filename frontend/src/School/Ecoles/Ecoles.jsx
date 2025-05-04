import React, { useState, useEffect } from "react";
import axios from "axios";

function Ecoles() {
  const [ecoles, setEcoles] = useState([]);
    const [searchitem, setsearch] = useState("");

  useEffect(() => {
    fetchecoles();
  }, []);

  const fetchecoles = async () => {
    const response = await axios.get("http://localhost:5001/api/ecoles");
    setEcoles(response.data);
  };

  return (
    <div className="p-4 font-sans sm:ml-72">
      <h1 className="text-2xl font-bold text-center mb-6">Liste des écoles</h1>
      <input
        type="text"
        placeholder="Rechercher une école..."
        value={searchitem}
        onChange={(e) => setsearch(e.target.value)}
        className="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md text-sm sm:text-base">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Niveau du Bac</th>
              <th className="px-4 py-2 border">Lieu</th>
            </tr>
          </thead>
          <tbody>
          {ecoles
  .filter((ecole) =>
    (ecole.nom?.toLowerCase() ?? "").includes(searchitem.toLowerCase()) ||
    (ecole.description?.toLowerCase() ?? "").includes(searchitem.toLowerCase()) ||
    (ecole.niveauBac?.toLowerCase() ?? "").includes(searchitem.toLowerCase()) ||
    (ecole.lieu?.toLowerCase() ?? "").includes(searchitem.toLowerCase())
  )
  .map((ecole) => (
    <tr key={ecole._id} className="border-t hover:bg-gray-50">
      <td className="px-4 py-2 border">{ecole.nom}</td>
      <td className="px-4 py-2 border">{ecole.description}</td>
      <td className="px-4 py-2 border">{ecole.niveauBac}</td>
      <td className="px-4 py-2 border">{ecole.lieu}</td>
    </tr>
  ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ecoles;
