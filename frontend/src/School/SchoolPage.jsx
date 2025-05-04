import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './SchoolPage.css'; // 👉 Assure-toi d'importer le CSS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SchoolPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [connectedStudents, setConnectedStudents] = useState();
  const [disconnectedStudents, setDisconnectedStudents] = useState();
  const [disconnectedDomaines, setDisconnectedDomaines] = useState();

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
    labels: ['École A', 'École B', 'École C'],
    datasets: [
      {
        label: 'Consultations Écoles',
        data: [50, 80, 30],
        backgroundColor: 'rgba(11, 70, 234, 0.99)',
        borderColor: 'rgb(13, 111, 239)',
        borderWidth: 1,
      },
    ],
  };

  const chartDataDomaines = {
    labels: ['Domaine 1', 'Domaine 2', 'Domaine 3'],
    datasets: [
      {
        label: 'Consultations Domaines',
        data: [120, 70, 90],
        backgroundColor: 'rgba(235, 17, 13, 0.6)',
        borderColor: 'rgb(226, 18, 18)',
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
    <div className="flex-1 ml-72 p-5">
      <div style={{ textAlign: 'right' }}>
        <button className="toggle-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div 
          className="card-box border-2 border-green-500 w-64 rounded-lg p-2 flex items-center shadow-md cursor-pointer" 
          onClick={() => navigate("/Étudiants_connectés")}
          role="button"
        >
          <i className="bi bi-person-check text-green-500 text-4xl mr-4"></i>
          <div>
            <h2 className="text-lg font-semibold">Étudiants connectés</h2>
            <p className="text-xl font-bold">{connectedStudents}</p>
          </div>
        </div>

        <div 
          className="card-box border-2 border-red-500 w-64 rounded-lg p-2 flex items-center shadow-md cursor-pointer" 
          onClick={() => navigate("/Étudiants_non_connectés")}
          role="button"
        >
          <i className="bi bi-person-x text-red-500 text-4xl mr-4"></i>
          <div>
            <h2 className="text-lg font-semibold">Étudiants non connectés</h2>
            <p className="text-xl font-bold">{disconnectedStudents}</p>
          </div>
        </div>

        <div 
          className="card-box border-2 border-blue-500 w-64 rounded-lg p-2 flex items-center shadow-md cursor-pointer" 
          onClick={() => navigate("/Domaines")}
          role="button"
        >
          <i className="bi bi-book-half text-blue-500 text-4xl mr-4"></i>
          <div>
            <h2 className="text-lg font-semibold">Les Domaines</h2>
            <p className="text-xl font-bold">{disconnectedDomaines}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-20">
        <div className="chart-box w-1/2 px-2 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-center mb-4">Écoles les plus consultées</h2>
          <div style={{ width: '90%', height: '250px' }}>
            <Bar data={chartDataEcoles} options={chartOptions} />
          </div>
        </div>

        <div className="chart-box w-1/2 px-2 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-center mb-4">Domaines les plus consultés</h2>
          <div style={{ width: '90%', height: '250px' }}>
            <Bar data={chartDataDomaines} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolPage;
