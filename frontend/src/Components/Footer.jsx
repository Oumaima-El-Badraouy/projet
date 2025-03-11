import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-200 py-10 mt-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Adresse */}
          <div>
            <h5 className="text-white mb-4">Adresse</h5>
            <p className="flex items-center mb-2">
              <i className="fa fa-map-marker-alt mr-3"></i> 123 Rue, Casablanca, Maroc
            </p>
            <p className="flex items-center mb-2">
              <i className="fa fa-phone-alt mr-3"></i> +212 6 1234 5678
            </p>
            <p className="flex items-center mb-2">
              <i className="fa fa-envelope mr-3"></i> contact@dalleel.com
            </p>
            <div className="flex space-x-3 mt-3">
              <a className="text-gray-400 hover:text-white" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-gray-400 hover:text-white" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-gray-400 hover:text-white" href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a className="text-gray-400 hover:text-white" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white mb-4">Nos Services</h5>
            <ul className="space-y-2">
              <li><a className="hover:text-sky-400" href="#">Orientation scolaire</a></li>
              <li><a className="hover:text-white" href="#">Tests d'aptitude</a></li>
              <li><a className="hover:text-white" href="#">Coaching étudiant</a></li>
              <li><a className="hover:text-white" href="#">Événements d'orientation</a></li>
              <li><a className="hover:text-white" href="#">Support aux étudiants</a></li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h5 className="text-white mb-4">Liens rapides</h5>
            <ul className="space-y-2">
              <li><a className="hover:text-white" href="/About">À propos</a></li>
              <li><a className="hover:text-white" href="/Contact">Contact</a></li>
              <li><a className="hover:text-white" href="#">Assistance</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-white mb-4">Newsletter</h5>
            <p>Recevez nos dernières actualités et conseils d'orientation.</p>
            <div className="relative mt-3">
              <input
                type="email"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
                placeholder="Votre email"
              />
              <a className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-900 text-black px-4 py-2 rounded-md hover:bg-blue-600"href="/Signup">
                S'inscrire
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500">
          &copy; 2025 <a className="text-white" href="#">DALLEEL</a>. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
