import React, { useState, useEffect } from "react";
import axios from "axios";

function Evenements() {
  const [events, setevents] = useState([]);
  const [nom, setNom] = useState("");
  const [date, setdate] = useState("");
  const [description, setdescription] = useState("");
  const [lieu, setlieu] = useState("");
  const [editingeventsId, setEditingeventsId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchitem, setsearch] = useState("");

  useEffect(() => {
    fetchevents();
  }, []);

  const fetchevents = async () => {
    const response = await axios.get("http://localhost:5001/events");
    setevents(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = { nom: nom, description, lieu, date };

    try {
      if (editingeventsId) {
        await axios.put(`http://localhost:5001/events/${editingeventsId}`, event);
        setEditingeventsId(null);
      } else {
        await axios.post("http://localhost:5001/events", event);
      }

      setNom("");
      setdescription("");
      setlieu("");
      setdate("");
      fetchevents();
      setShowForm(false); // Masquer le formulaire après ajout/modif
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/events/${id}`);
      fetchevents();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (event) => {
    setEditingeventsId(event._id);
    setNom(event.nom);
    setdescription(event.description);
    setlieu(event.lieu);
    setdate(event.date.slice(10));
    setShowForm(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}className="flex-1 ml-68 p-4">
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Gestion des Evénements</h1>
      <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Rechercher un evenement..."
        value={searchitem}
        onChange={(e) => setsearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {showForm ? "Fermer le formulaire" : "Ajouter un evénement"}
      </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
            marginBottom: "2rem"
          }}
        >
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="lieu"
            value={lieu}
            onChange={(e) => setlieu(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem",
              backgroundColor: editingeventsId ? "#f39c12" : "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            {editingeventsId ? "Modifier" : "Ajouter"}
          </button>
        </form>
      )}

      
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1" }}>
            <th style={cellStyle}>Nom</th>
            <th style={cellStyle}>Description</th>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Lieu</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {events
            .filter((u) =>
              u.nom.toLowerCase().includes(searchitem.toLowerCase())||( u.description.toLowerCase().includes(searchitem.toLowerCase()))||( u.lieu.toLowerCase().includes(searchitem.toLowerCase()))
             
                
            )
          .map((u) => (
            <tr key={u._id}>
              <td style={cellStyle}>{u.nom}</td>
              <td style={cellStyle}>{u.description}</td>
              <td style={cellStyle}>{u.date.slice(0,10)}</td>
              <td style={cellStyle}>{u.lieu}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => handleEdit(u)}
                  style={{ marginRight: "0.5rem", color:"white", backgroundColor: "rgba(11, 70, 234, 0.99)", border: "none", padding: "5px", cursor: "pointer" }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{ backgroundColor: "#e74c3c", border: "none", padding: "5px", color: "white", cursor: "pointer" }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left"
};

export default Evenements;
