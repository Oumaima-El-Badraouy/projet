import React, { useState } from "react";

const questions = [
  { id: 1, question: "Aimes-tu les sciences et les mathématiques ?", domaines: { oui: "Sciences", non: "Lettres" } },
  { id: 2, question: "Préfères-tu lire des livres et écrire ?", domaines: { oui: "Lettres", non: "Sciences" } },
  { id: 3, question: "Es-tu intéressé par l'informatique ?", domaines: { oui: "Informatique", non: "" } },
  { id: 4, question: "Aimes-tu les activités artistiques ?", domaines: { oui: "Arts", non: "" } },
  { id: 5, question: "Aimes-tu travailler en groupe ?", domaines: { oui: "Management", non: "" } },
  { id: 6, question: "Es-tu créatif/créative ?", domaines: { oui: "Design", non: "" } },
  { id: 7, question: "Aimes-tu les expériences pratiques ?", domaines: { oui: "Technique", non: "" } },
  { id: 8, question: "Es-tu intéressé par l'économie ?", domaines: { oui: "Économie", non: "" } },
  { id: 9, question: "Aimes-tu enseigner ou partager tes connaissances ?", domaines: { oui: "Pédagogie", non: "" } },
  { id: 10, question: "As-tu le sens de l'organisation ?", domaines: { oui: "Administration", non: "" } },
];

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default function TestOrientation({ role }) {
  const [reponses, setReponses] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [domainesChoisis, setDomainesChoisis] = useState([]);

  function handleChange(id, value) {
    setReponses((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit() {
    const domaines = [];

    for (const q of questions) {
      const rep = reponses[q.id];
      if (!rep) continue;
      const domaine = q.domaines[rep];
      if (domaine && domaine.trim() !== "" && !domaines.includes(domaine)) {
        domaines.push(domaine);
      }
    }

    if (domaines.length === 0) {
      alert("Merci de répondre à au moins une question.");
      return;
    }

    setDomainesChoisis(domaines);
    setModalOpen(true);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Test d'orientation</h1>

      {questions.map((q) => (
        <div key={q.id} className="mb-4 p-4 border rounded">
          <p className="mb-2">{q.question}</p>
          <label className="mr-4">
            <input
              type="radio"
              name={"q" + q.id}
              value="oui"
              checked={reponses[q.id] === "oui"}
              onChange={() => handleChange(q.id, "oui")}
            />{" "}
            Oui
          </label>
          <label>
            <input
              type="radio"
              name={"q" + q.id}
              value="non"
              checked={reponses[q.id] === "non"}
              onChange={() => handleChange(q.id, "non")}
            />{" "}
            Non
          </label>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Voir mes domaines
      </button>

    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
  <h2 className="text-2xl font-bold mb-4">Résultat du test d'orientation</h2>
  <p className="mb-2">
    Le meilleur domaine pour toi est :{" "}
    <span className="font-semibold text-green-600">{domainesChoisis[0]}</span>
  </p>
  {domainesChoisis.length > 1 && (
    <div>
      <p>Autres domaines recommandés :</p>
      <ul className="list-disc list-inside">
        {domainesChoisis.slice(1).map((domaine, index) => (
          <li key={index}>{domaine}</li>
        ))}
      </ul>
    </div>
  )}

  <br />

  {role === "simpleuser" && (
    <a href={`/user/${userId}`} className="mt-4 inline-block text-blue-600 underline">
      Voir les écoles
    </a>
  )}
</Modal>

    </div>
  );
}
