import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import Menu from "./Components/Menu";
import Forgotpassword from "./Components/Forgotpassword";
// import ResetPassword from "./Components/ResetPassword";
import About from "./Components/About";
import { ToastContainer } from 'react-toastify';
import SingUp from "./SignUp/SignUp";
import ResetPassword from './Components/ResetPassword';
import SchoolPage from './School/SchoolPage';
import Home from "./Home/Home";
import Menuuser from "./School/Menuuser";
import Ecoles from "./School/Ecoles/Ecoles";
import EtudiantsNonConnecté  from "./School/Users/etudiants_non_connecté";
import EtudiantsConnecté  from "./School/Users/etudiants_connecté";
import Domaines  from "./School/Users/Domaines";
import Evenements  from "./School/Users/Evenements";

function App() {
    return (
   <Router>
            <Routes>
                <Route path="/" element={<Menu/>}>
              

                    <Route path="/Login" element={<Login />} />
                    <Route index element={<Home />} />
                    <Route path="/signup" element={<SingUp/>}/>
                <Route path="/About" element={<About />} /> 
                    <Route path="/Contact" element={<Contact />} /> 
                    <Route path="/Home" element={<Home />} /> 
                    <Route path="/Forgotpassword" element={<Forgotpassword />} /> 
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                

                </Route>
                <Route path="/" element={<Menuuser />} >
                    <Route path="/school/:id" element={<SchoolPage />} />
                    <Route path="/ecoles" element={<Ecoles />} />
                   <Route path="/Étudiants_non_connectés" element={<EtudiantsNonConnecté />} />
                   <Route path="/Étudiants_connectés" element={<EtudiantsConnecté />} />
                   <Route path="/Domaines" element={<Domaines />} />
                   <Route path="/Evenement" element={<Evenements />} />
                </Route>  
            </Routes>
    </Router>
    );
}

export default App;



// // import React, { useState } from 'react';
// // import './App.css';

// // function App() {
  
// //   const users = [
// //     { id: 'user1', password: 'password1' },
// //     { id: 'user2', password: 'password2' },
// //     { id: 'user3', password: 'password3' },
// //   ];

// //   const [name, setName] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [errorMessages, setErrorMessages] = useState({});
// //   const [isSubmitted, setIsSubmitted] = useState(false);

 
// //   const handleNameChange = (e) => {
// //     setName(e.target.value);
// //   };

// //   const handlePasswordChange = (e) => {
// //     setPassword(e.target.value);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Réinitialiser les messages d'erreur
// //     setErrorMessages({});
   
// //     const user = users.find((user) => user.id === name);

// //     if (!user) {
// //       setErrorMessages((prevState) => ({ ...prevState, name: 'Identifiant non trouvé.' }));
// //       return;
// //     }

// //     if (user.password !== password) {
// //       setErrorMessages((prevState) => ({ ...prevState, password: 'Mot de passe incorrect.' }));
// //       return;
// //     }

    
// //     setErrorMessages({});
// //     setIsSubmitted(true);
// //   };

// //   // afficher les messages d'erreur pour le champ spécifié
// //   const renderErrorMessage = (fieldName) =>
// //     errorMessages[fieldName] && <div className="error">{errorMessages[fieldName]}</div>;

// //   return (
// //     <div className="App">
// //       <form onSubmit={handleSubmit} className="login-form">
// //         <div className="input-container">
// //           <label htmlFor="name">L'identifiant</label>
// //           <input
// //             type="text"
// //             id="name"
// //             value={name}
// //             onChange={handleNameChange}
// //             className="input-field"
// //           />
// //           {renderErrorMessage('name')} 
// //         </div>
// //         <div className="input-container">
// //           <label htmlFor="password">Mot de passe</label>
// //           <input
// //             type="password"
// //             id="password"
// //             value={password}
// //             onChange={handlePasswordChange}
// //             className="input-field"
// //           />
// //           {renderErrorMessage('password')}
// //         </div>
// //         <button type="submit" className="submit-button">Se connecter</button>
// //       </form>
// //       {isSubmitted && <p className="success-message">Connexion réussie!</p>}
// //     </div>
// //   );
// // }

// // export default App;

// // import React, { useState } from 'react';
// // import './App.css';

// // function App() {
  
// //   const [name, setName] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [dob, setDob] = useState('');
// //   const [city, setCity] = useState('Casablanca');
// //   const [gender, setGender] = useState('Homme');
// //   const [hobbies, setHobbies] = useState([]);
// //   const [photo, setPhoto] = useState(null);
// //   const [isSubmitted, setIsSubmitted] = useState(false);

// //   const [errorMessages, setErrorMessages] = useState({});

 
// //   const handleNameChange = (e) => setName(e.target.value);
// //   const handlePasswordChange = (e) => setPassword(e.target.value);
// //   const handleDobChange = (e) => setDob(e.target.value);
// //   const handleCityChange = (e) => setCity(e.target.value);
// //   const handleGenderChange = (e) => setGender(e.target.value);

// //   const handleHobbiesChange = (e) => {
// //     const value = e.target.value;
// //     setHobbies((prevHobbies) =>
// //       prevHobbies.includes(value)
// //         ? prevHobbies.filter((hobby) => hobby !== value)
// //         : [...prevHobbies, value]
// //     );
// //   };

// //   const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setErrorMessages({});
   
// //     if (!name || !password || !dob) {
// //       setErrorMessages({ general: 'Veuillez remplir tous les champs obligatoires.' });
// //       return;
// //     }

// //     setIsSubmitted(true);
// //   };

// //   return (
// //     <div className="App">
// //       <h2>Formulaire d'Inscription</h2>

// //       <form onSubmit={handleSubmit} className="registration-form">
// //         <div className="input-container">
// //           <label htmlFor="name">L'identifiant</label>
// //           <input
// //             type="text"
// //             id="name"
// //             value={name}
// //             onChange={handleNameChange}
// //             className="input-field"
// //           />
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="password">Mot de passe</label>
// //           <input
// //             type="password"
// //             id="password"
// //             value={password}
// //             onChange={handlePasswordChange}
// //             className="input-field"
// //           />
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="dob">Date de naissance (jj/mm/aaaa)</label>
// //           <input
// //             type="date"
// //             id="dob"
// //             value={dob}
// //             onChange={handleDobChange}
// //             className="input-field"
// //           />
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="city">Ville</label>
// //           <select
// //             id="city"
// //             value={city}
// //             onChange={handleCityChange}
// //             className="input-field"
// //           >
// //             <option value="Casablanca">Casablanca</option>
// //             <option value="Rabat">Rabat</option>
// //             <option value="Marrakech">Marrakech</option>
// //             <option value="Fes">Fes</option>
// //           </select>
// //         </div>

// //         <div className="input-container">
// //           <label>Genre</label>
// //           <div>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="Homme"
// //                 checked={gender === 'Homme'}
// //                 onChange={handleGenderChange}
// //               />
// //               Homme
// //             </label>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="Femme"
// //                 checked={gender === 'Femme'}
// //                 onChange={handleGenderChange}
// //               />
// //               Femme
// //             </label>
// //           </div>
// //         </div>

// //         <div className="input-container">
// //           <label>Loisirs</label>
// //           <div>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 value="Sport"
// //                 checked={hobbies.includes('Sport')}
// //                 onChange={handleHobbiesChange}
// //               />
// //               Sport
// //             </label>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 value="Lecture"
// //                 checked={hobbies.includes('Lecture')}
// //                 onChange={handleHobbiesChange}
// //               />
// //               Lecture
// //             </label>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 value="Musique"
// //                 checked={hobbies.includes('Musique')}
// //                 onChange={handleHobbiesChange}
// //               />
// //               Musique
// //             </label>
// //           </div>
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="photo">Photo</label>
// //           <input
// //             type="file"
// //             id="photo"
// //             onChange={handlePhotoChange}
// //             className="input-field"
// //           />
// //         </div>

// //         {errorMessages.general && (
// //           <div className="error">{errorMessages.general}</div>
// //         )}

// //         <button type="submit" className="submit-button">S'inscrire</button>
// //       </form>

// //       {isSubmitted && (
// //         <div className="success-message">
// //           <h3>Inscription réussie !</h3>
// //           <p><strong>L'identifiant :</strong> {name}</p>
// //           <p><strong>Date de naissance :</strong> {dob}</p>
// //           <p><strong>Ville :</strong> {city}</p>
// //           <p><strong>Genre :</strong> {gender}</p>
// //           <p><strong>Loisirs :</strong> {hobbies.join(', ')}</p>
// //           {photo && <p><strong>Photo :</strong> {photo.name}</p>}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

//  export default App;
// // import React, { useState } from 'react';
// // import './App.css';

// // function App() {
// //   // Initialiser un objet d'état contenant toutes les informations de l'utilisateur
// //   const [userData, setUserData] = useState({
// //     name: '',
// //     password: '',
// //     dob: '',
// //     city: 'Casablanca',
// //     gender: 'Homme',
// //     hobbies: [],
// //     photo: null
// //   });

// //   // États pour gérer les messages d'erreur et le succès de l'inscription
// //   const [errorMessages, setErrorMessages] = useState({});
// //   const [isSubmitted, setIsSubmitted] = useState(false);

// //   // Fonction pour gérer le changement de valeur dans les champs
// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     if (type === 'checkbox') {
// //       setUserData(prevState => ({
// //         ...prevState,
// //         hobbies: checked
// //           ? [...prevState.hobbies, value]
// //           : prevState.hobbies.filter(hobby => hobby !== value)
// //       }));
// //     } else {
// //       setUserData(prevState => ({
// //         ...prevState,
// //         [name]: value
// //       }));
// //     }
// //   };

// //   const handlePhotoChange = (e) => {
// //     const photo = e.target.files[0];
// //     setUserData(prevState => ({
// //       ...prevState,
// //       photo: photo
// //     }));
// //   };

// //   // Fonction pour soumettre le formulaire
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setErrorMessages({});
    
// //     // Validation des champs
// //     if (!userData.name || !userData.password || !userData.dob) {
// //       setErrorMessages({ general: 'Veuillez remplir tous les champs obligatoires.' });
// //       return;
// //     }

// //     // Enregistrer les informations de l'utilisateur
// //     setIsSubmitted(true);
// //   };

// //   return (
// //     <div className="App">
// //       <h2>Formulaire d'Inscription</h2>

// //       <form onSubmit={handleSubmit} className="registration-form">
// //         <div className="input-container">
// //           <label htmlFor="name">L'identifiant</label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={userData.name}
// //             onChange={handleChange}
// //             className="input-field"
// //           />
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="password">Mot de passe</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             value={userData.password}
// //             onChange={handleChange}
// //             className="input-field"
// //           />
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="dob">Date de naissance (jj/mm/aaaa)</label>
// //           <input
// //             type="date"
// //             id="dob"
// //             name="dob"
// //             value={userData.dob}
// //             onChange={handleChange}
// //             className="input-field"
// //           />
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="city">Ville</label>
// //           <select
// //             id="city"
// //             name="city"
// //             value={userData.city}
// //             onChange={handleChange}
// //             className="input-field"
// //           >
// //             <option value="Casablanca">Casablanca</option>
// //             <option value="Rabat">Rabat</option>
// //             <option value="Marrakech">Marrakech</option>
// //             <option value="Fes">Fes</option>
// //           </select>
// //         </div>

// //         <div className="input-container">
// //           <label>Genre</label>
// //           <div>
// //             <label>
// //               <input
// //                 type="radio"
// //                 name="gender"
// //                 value="Homme"
// //                 checked={userData.gender === 'Homme'}
// //                 onChange={handleChange}
// //               />
// //               Homme
// //             </label>
// //             <label>
// //               <input
// //                 type="radio"
// //                 name="gender"
// //                 value="Femme"
// //                 checked={userData.gender === 'Femme'}
// //                 onChange={handleChange}
// //               />
// //               Femme
// //             </label>
// //           </div>
// //         </div>

// //         <div className="input-container">
// //           <label>Loisirs</label>
// //           <div>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="hobbies"
// //                 value="Sport"
// //                 checked={userData.hobbies.includes('Sport')}
// //                 onChange={handleChange}
// //               />
// //               Sport
// //             </label>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="hobbies"
// //                 value="Lecture"
// //                 checked={userData.hobbies.includes('Lecture')}
// //                 onChange={handleChange}
// //               />
// //               Lecture
// //             </label>
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="hobbies"
// //                 value="Musique"
// //                 checked={userData.hobbies.includes('Musique')}
// //                 onChange={handleChange}
// //               />
// //               Musique
// //             </label>
// //           </div>
// //         </div>

// //         <div className="input-container">
// //           <label htmlFor="photo">Photo</label>
// //           <input
// //             type="file"
// //             id="photo"
// //             onChange={handlePhotoChange}
// //             className="input-field"
// //           />
// //         </div>

// //         {errorMessages.general && (
// //           <div className="error">{errorMessages.general}</div>
// //         )}

// //         <button type="submit" className="submit-button">S'inscrire</button>
// //       </form>

// //       {isSubmitted && (
// //         <div className="success-message">
// //           <h3>Inscription réussie !</h3>
// //           <p><strong>L'identifiant :</strong> {userData.name}</p>
// //           <p><strong>Date de naissance :</strong> {userData.dob}</p>
// //           <p><strong>Ville :</strong> {userData.city}</p>
// //           <p><strong>Genre :</strong> {userData.gender}</p>
// //           <p><strong>Loisirs :</strong> {userData.hobbies.join(', ')}</p>
// //           {userData.photo && <p><strong>Photo :</strong> {userData.photo.name}</p>}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
