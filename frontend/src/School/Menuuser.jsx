import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Menuuser() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-purple-900 w-70 min-h-screen p-4 text-white flex flex-col fixed">
        <div className="flex items-center space-x-3 mb-6">
          <img src={DALLEEL} className="h-10" alt="Logo" />
          <span className="text-2xl font-semibold">DALLEEL</span>
        </div>
        <ul className="flex flex-col space-y-4">
          <NavLink 
            to="#"
            className={({ isActive }) => isActive ? "block py-3 px-4 rounded bg-gray-400 text-white" : "block py-3 px-4 rounded bg-gray-300 text-black hover:bg-gray-400"}
          >
            <i className="bi bi-house-door"></i> Tableau de bord
          </NavLink>
          <NavLink to="/Étudiants_connectés" className="block py-2 px-4 rounded hover:bg-gray-700 ">
            <i className="bi bi-person-check"></i> Étudiants connectés
          </NavLink>
          <NavLink to="/Étudiants_non_connectés" className="block py-2 px-4 rounded hover:bg-gray-700">
            <i className="bi bi-person-x"></i> Étudiants non connectés
          </NavLink>
          <NavLink to="/Domaines" className="block py-2 px-4 rounded hover:bg-gray-700">
            <i className="bi bi-tags"></i> Domaines
          </NavLink>
          <NavLink to="/ecoles" className="block py-2 px-4 rounded hover:bg-gray-700">
            <i className="bi bi-building"></i> Écoles
          </NavLink> 
          <NavLink to="/events" className="block py-2 px-4 rounded hover:bg-gray-700">
          <i className="bi bi-calendar-event"></i>  ÉVÉNEMENTS
          </NavLink>
          <NavLink to="/" className="block py-2 px-4 bg-red-500 rounded hover:bg-gray-700">
            <i className="bi bi-box-arrow-right"></i> Déconnexion
          </NavLink>
         
        </ul>
      </nav>

      {/* Contenu des pages */}
      <div className="flex-1 ml-0 p-2">
        <Outlet />  {/* Ceci affiche les pages enfants comme SchoolPage */}
      </div>
    </div>
  );
}

export default Menuuser;
