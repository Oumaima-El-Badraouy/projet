import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';

import './SchoolPage.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // 👈 Ajouté pour Pie chart
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function SchoolPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [connectedStudents, setConnectedStudents] = useState(0);
  const [disconnectedStudents, setDisconnectedStudents] = useState(0);
  const [disconnectedDomaines, setDisconnectedDomaines] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/counter');
      const data = await response.json();
      setConnectedStudents(data.connectedStudents);
      setDisconnectedStudents(data.disconnectedStudents);
      setDisconnectedDomaines(data.disconnectedDomaines);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const chartDataEcoles = {
    labels: ['BTS', 'EST', 'ENSAM','OFPPT'],
    datasets: [
      {
        label: 'Consultations Écoles',
        data: [40, 80, 30,10],
        backgroundColor: '#1E88E5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  const chartDataDomaines = {
    labels: ['Informatique', 'Gestion','Economie'],
    datasets: [
      {
        label: 'Consultations Domaines',
        data: [120, 70, 90],
        backgroundColor: [
          '#FDD835',
          '#1E88E5',
          '#43A047',
        ],
        borderColor: [
         '#FDD835',
         '#1E88E5',
          '#43A047',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: { display: false },
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: { ticks: { font: { size: 10 } } },
    },
  };

  return (
    <div className="flex-1 ml-72 p-5  min-h-screen">
  <div className="flex justify-end mb-6">
    <button
      className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-sm"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
    </button>
  </div>

  {/* Cartes statistiques */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div 
      className="bg-white border-l-4 border-green-700 rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate("/Étudiants_connectés")}
    >
      <div className="flex items-center">
        <i className="bi bi-person-check text-green-700 text-3xl mr-4"></i>
        <div>
          <h2 className="text-lg font-semibold">Étudiants connectés</h2>
          <p className="text-2xl font-bold">{connectedStudents}</p>
        </div>
      </div>
    </div>

    <div 
      className="bg-white border-l-4 border-yellow-400 rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate("/Étudiants_non_connectés")}
    >
      <div className="flex items-center">
        <i className="bi bi-person-x text-yellow-500 text-3xl mr-4"></i>
        <div>
          <h2 className="text-lg font-semibold">Étudiants non connectés</h2>
          <p className="text-2xl font-bold">{disconnectedStudents}</p>
        </div>
      </div>
    </div>

    <div 
      className="bg-white border-l-4 border-blue-400 rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate("/Domaines")}
    >
      <div className="flex items-center">
        <i className="bi bi-book-half text-blue-400 text-3xl mr-4"></i>
        <div>
          <h2 className="text-lg font-semibold">Les Domaines</h2>
          <p className="text-2xl font-bold">{disconnectedDomaines}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Section des graphiques */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-center mb-6" id="ecoles">🎓 Écoles les plus consultées</h2>
      <div className="w-full h-64">
        <Bar data={chartDataEcoles} options={chartOptions} />
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-center mb-6">📚 Domaines les plus consultés</h2>
      <div className="w-full h-64">
        <Pie data={chartDataDomaines} />
      </div>
    </div>
  </div>
</div>

  );
}

export default SchoolPage;
