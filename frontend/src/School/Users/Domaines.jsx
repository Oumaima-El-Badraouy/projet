import React, { useState, useEffect } from "react";
import axios from "axios";

function Domaines() {
  const [domaines, setDomaines] = useState([]);
  const [searchitem, setsearch] = useState("");

  useEffect(() => {
    fetchDomaines();
  }, []);

  const fetchDomaines = async () => {
    const response = await axios.get("http://localhost:5001/api/domaines");
    setDomaines(response.data);
  };

  return (
    <div className="flex-1 px-4 py-8 md:ml-68 font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">Liste des Domaines</h1>

      <input
        type="text"
        placeholder="Rechercher un domaine..."
        value={searchitem}
        onChange={(e) => setsearch(e.target.value)}
        className="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />

      {/* Table responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border">Nom</th>
              <th className="px-4 py-2 text-left border">Écoles</th>
            </tr>
          </thead>
          <tbody>
            {domaines
              .filter((domaine) =>
                domaine.nom.toLowerCase().includes(searchitem.toLowerCase())
              )
              .map((domaine) => (
                <tr key={domaine._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{domaine.nom}</td>
                  <td className="border px-4 py-2">
                    <ul className="pl-5 list-disc">
                      {domaine.ecoles.map((ecole, index) => (
                        <li key={index}>
                          <strong>{ecole.nom}</strong> - {ecole.lieu}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Domaines;
