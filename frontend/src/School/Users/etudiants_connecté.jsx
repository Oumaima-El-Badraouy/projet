import React, { useState, useEffect } from "react";
import axios from "axios";

function EtudiantsConnecté() {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
 
  const [editingUserId, setEditingUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
const [searchitem, setsearch] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5001/usersconnected");
    setUsers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name: nom, prenom, email };

    try {
      if (editingUserId) {
        await axios.put(`http://localhost:5001/usersconnected/${editingUserId}`, user);
        setEditingUserId(null);
      } else {
        await axios.post("http://localhost:5001/usersconnected", user);
      }

      setNom("");
      setPrenom("");
      setEmail("");
    
      fetchUsers();
      setShowForm(false); // Masquer le formulaire après ajout/modif
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/usersconnected/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setNom(user.name);
    setPrenom(user.prenom);
    setEmail(user.email);
    
    setShowForm(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }} className="flex-1 ml-68 p-4">
    <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Gestion des Utilisateurs</h1>
    <div className="flex items-center gap-4 mb-4">
    <input
        type="text"
        placeholder="Rechercher un etudiant..."
        value={searchitem}
        onChange={(e) => setsearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />
    <button
      onClick={() => setShowForm(!showForm)}
      style={{
       marginTop: "1rem", // 👈 ESPACE AJOUTÉ ICI
    marginBottom: "2rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
      }}
    >
    
      {showForm ? "Fermer le formulaire" : "Ajouter un utilisateur"}
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
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            backgroundColor: editingUserId ? "#f39c12" : "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          {editingUserId ? "Modifier" : "Ajouter"}
        </button>
      </form>
    )}
  
    {/* 🎯 Table responsive wrapper */}
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
  <table
    style={{
      width: "100%",
      minWidth: "700px", // Pour ne pas casser les colonnes
      borderCollapse: "collapse",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}
  >
    <thead>
      <tr style={{ backgroundColor: "#f1f1f1" }}>
        <th style={cellStyle}>Nom</th>
        <th style={cellStyle}>Prénom</th>
        <th style={cellStyle}>Email</th>
      
        <th style={cellStyle}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u._id}>
          <td style={cellStyle}>{u.name}</td>
          <td style={cellStyle}>{u.prenom}</td>
          <td style={cellStyle}>{u.email}</td>
     
          <td style={cellStyle}>
            <button
              onClick={() => handleEdit(u)}
              style={{
                marginRight: "0.5rem",
               color:"white", backgroundColor: "rgba(11, 70, 234, 0.99)",
                border: "none",
                padding: "5px",
                cursor: "pointer"
              }}
            >
              Modifier
            </button>
            <span></span>
            <button
              onClick={() => handleDelete(u._id)}
              style={{
                backgroundColor: "#e74c3c",
                border: "none",
                padding: "10px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Supprimer
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left"
};

export default EtudiantsConnecté;
