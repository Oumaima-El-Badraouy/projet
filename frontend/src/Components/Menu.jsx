import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DALLEEL from '../assets/DALEEL.png';

function Menu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={DALLEEL} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tawjih 360</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button 
            type="button" 
            onClick={() => navigate("/Login")}
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Commencer
          </button>
          <button 
            onClick={toggleMenu} 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            aria-controls="navbar-sticky" 
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <NavLink to="/home" className="block py-2 px-3 text-blue-500 hover:bg-gray-100 rounded md:p-0">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/About" className="block py-2 px-3 text-blue-500 hover:bg-gray-100 rounded md:p-0">À propos</NavLink>
            </li>
            <li>
              <NavLink to="/Contact" className="block py-2 px-3 text-blue-500 hover:bg-gray-100 rounded md:p-0">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="block py-2 px-3 text-blue-500 hover:bg-gray-100 rounded md:p-0">S'inscrire</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="pt-20">
      <Outlet />
    </div>
  </div>
  
  );
}

export default Menu;
