import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Chatbot from "../UsersE/Chatbot"; // Assure-toi du bon chemin


const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      {/* Bouton Chatbot flottant */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        title="Pose une question"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h4m-5 8l-4-4V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 4z"
          />
        </svg>
      </button>

     {modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white p-6 rounded-md shadow-lg text-black w-[90%] max-w-xl">
      {/* Bouton de fermeture */}
      <button
        onClick={() => setModalOpen(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
        title="Fermer le chatbot"
      >
        &times;
      </button>
      <Chatbot />
    </div>
  </div>
)}


      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">À propos de Tawjih 360</h5>
            <p>
              Tawjih 360 vous aide à trouver la meilleure orientation scolaire et universitaire selon votre profil et vos compétences.
            </p>
            <div className="flex space-x-3 mt-3">
              <a className="text-blue-400 hover:text-white" href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a className="text-blue-400 hover:text-white" href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a className="text-blue-400 hover:text-white" href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a className="text-blue-400 hover:text-white" href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>

          {/* Nos services */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">Nos services</h5>
            <ul className="space-y-2">
              <li><a className="text-gray-300 hover:text-white" href="#">✔︎ Tests d'orientation</a></li>
              <li><a className="text-gray-300 hover:text-white" href="#">✔︎ Conseil en orientation</a></li>
              <li><a className="text-gray-300 hover:text-white" href="#">✔︎ Événements d'orientation</a></li>
              <li><a className="text-gray-300 hover:text-white" href="#">✔︎ Guides éducatifs</a></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">Liens utiles</h5>
            <ul className="space-y-2">
              <li><NavLink to="/about" className="text-gray-300 hover:text-gray-400">🔗 À propos</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-300 hover:text-gray-400">📩 Contact</NavLink></li>
              <li><NavLink to="/Login" className="text-gray-300 hover:text-gray-400">➕ Rejoindre</NavLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">Restez informé</h5>
            <p>Inscrivez-vous à notre newsletter pour recevoir nos conseils et événements.</p>
            <div className="relative mt-3">
              <input
                type="email"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                placeholder="Votre email"
              />
              <NavLink to="/SignUp" className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                S'inscrire
              </NavLink>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-400">
          &copy; 2025 <a className="text-blue-400" href="#">Tawjih 360</a>. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
