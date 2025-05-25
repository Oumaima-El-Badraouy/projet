import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Menuuser() {
  const schoolId = localStorage.getItem("schoolId");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-blue-500 w-70 min-h-screen p-4 text-white flex flex-col fixed">
        <div className="flex items-center space-x-3 mb-6">
          <img src={DALLEEL} className="h-10" alt="Logo" />
          <span className="text-3xl font-semibold">Tawjih 360</span>
        </div>

        <ul className="flex flex-col space-y-4">
          <NavLink 
            to={`/school/${schoolId}`}
            className={({ isActive }) =>
              `block py-3 px-4 rounded ${
                isActive ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 text-white'
              } hover:bg-gray-400`
            }
          >
            <i className="bi bi-house-door"></i> Tableau de bord
          </NavLink>

          <NavLink 
            to="/Étudiants_connectés"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 text-white'
              } hover:bg-gray-400`
            }
          >
            <i className="bi bi-person-check"></i> Étudiants connectés
          </NavLink>

          <NavLink 
            to="/Étudiants_non_connectés"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 text-white'
              } hover:bg-gray-400`
            }
          >
            <i className="bi bi-person-x"></i> Étudiants non connectés
          </NavLink>

          <NavLink 
            to="/Domaines"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 text-white'
              } hover:bg-gray-400`
            }
          >
            <i className="bi bi-tags"></i> Domaines
          </NavLink>

          <NavLink 
            to="/ecoles"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 text-white'
              } hover:bg-gray-400`
            }
          >
            <i className="bi bi-building"></i> Écoles
          </NavLink>

          <NavLink 
            to="/Evenement"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 text-white'
              } hover:bg-gray-400`
            }
          >
            <i className="bi bi-calendar-event"></i> ÉVÉNEMENTS
          </NavLink>

          <NavLink 
            to="/"
            onClick={() => localStorage.removeItem("schoolId")}
            className="block py-2 px-4 hover:bg-red-500 font-bold"
          >
            <i className="bi bi-box-arrow-right  "></i> Déconnexion
          </NavLink>
        </ul>
      </nav>

      {/* Contenu des pages */}
      <div className="flex-1 ml-0 p-2">
        <Outlet />
      </div>
    </div>
  );
}

export default Menuuser;
