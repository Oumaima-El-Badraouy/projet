import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
function etudiants_connecté() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', password: '', nom: '' });
 // Récupérer les utilisateurs connectés
 useEffect(() => {
    axios.get('/api/connected-users')
        .then(response => {
            setUsers(response.data.users);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}, []);
const handleAddUser = () => {
    axios.post('/api/connected-users', newUser)
        .then(response => {
            setUsers([...users, response.data.user]);
            setNewUser({ email: '', password: '', nom: '' });
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
};
   


    return (
        <div>
            <h2>Utilisateurs Connectés</h2>

            {/* Formulaire d'ajout d'un utilisateur */}
            <div>
                <input
                    type="text"
                    placeholder="Nom"
                    value={newUser.nom}
                    onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button onClick={handleAddUser}>Ajouter un utilisateur</button>
            </div>

            {/* Table des utilisateurs connectés */}
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                     
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.nom}</td>
                            <td>{user.email}</td>
                           
                            <td>
                                <button>Mettre à jour</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default etudiants_connecté;

