import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">À propos de DALLEEL</h5>
            <p>
              DALLEEL vous aide à trouver la meilleure orientation scolaire et universitaire selon votre profil et vos compétences.
            </p>
            <div className="flex space-x-3 mt-3">
              <a className="text-blue-400 hover:text-white-400" href="#"><i className="fab fa-instagram"></i></a>
              <a className="text-blue-400 hover:text-white-400" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="text-blue-400 hover:text-white-400" href="#"><i className="fab fa-linkedin-in"></i></a>
              <a className="text-blue-400 hover:text-white-400" href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>

          {/* Catégories */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">Nos services</h5>
            <ul className="space-y-2">
              <li><a className="text-gray-300 hover:text-white-400" href="#">✔︎ Tests d'orientation</a></li>
              <li><a className="text-gray-300 hover:text-white-400" href="#">✔︎ Conseil en orientation</a></li>
              <li><a className="text-gray-300 hover:text-white-400" href="#">✔︎ Événements d'orientation</a></li>
              <li><a className="text-gray-300 hover:text-white-400" href="#">✔︎ Guides éducatifs</a></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h5 className="text-blue-400 text-lg font-semibold mb-4">Liens utiles</h5>
            <ul className="space-y-2">
              <li><NavLink to="/about"className="text-gray-300 hover:text-gray-400" >🔗 À propos</NavLink></li>
              <li><NavLink className="text-gray-300 hover:text-gray-400" to="/contact">📩 Contact</NavLink></li>
              <li><NavLink className="text-gray-300 hover:text-gray-400" to="/Login">➕  Rejoindre</NavLink></li>
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
              <NavLink to="/SignUp" className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500" href="/Signup">
                S'inscrire
              </NavLink>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-400">
          &copy; 2025 <a className="text-blue-400" href="#">DALLEEL</a>. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
