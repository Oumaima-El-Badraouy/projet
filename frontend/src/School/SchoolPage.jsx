import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SchoolPage() {
    const navigate = useNavigate();
    const [connectedStudents, setConnectedStudents] = useState(120);
    const [disconnectedStudents, setDisconnectedStudents] = useState(45);
    const [disconnectedDomaines, setDisconnectedDomaines] = useState(45);

    // Data for Écoles chart
    const chartDataEcoles = {
        labels: ['École A', 'École B', 'École C'],
        datasets: [
            {
                label: 'Consultations Écoles',
                data: [50, 80, 30],
                backgroundColor: 'rgba(15, 5, 204, 0.6)',
                borderColor: 'rgb(13, 111, 239)',
                borderWidth: 1,
            },
        ],
    };

    // Data for Domaines chart
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

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    return (
        <div className="flex-1 ml-72 p-5">
            <div className="grid grid-cols-3 gap-4">
                <div 
                    className="border-2 border-green-500 w-64 rounded-lg p-2 flex items-center bg-white shadow-md cursor-pointer" 
                    onClick={() => navigate("/Étudiants_connectés")}
                    role="button" 
                    tabIndex="0"
                >
                    <i className="bi bi-person-check text-green-500 text-4xl mr-4"></i>
                    <div>
                        <h2 className="text-lg font-semibold">Étudiants connectés</h2>
                        <p className="text-xl font-bold">{connectedStudents}</p>
                    </div>
                </div>
                
                <div 
                    className="border-2 border-red-500 rounded-lg w-64 p-2 flex items-center bg-white shadow-md cursor-pointer" 
                    onClick={() => navigate("/Étudiants_non_connectés")}
                    role="button" 
                    tabIndex="0"
                >
                    <i className="bi bi-person-x text-red-500 text-4xl mr-4"></i>
                    <div>
                        <h2 className="text-lg font-semibold">Étudiants non connectés</h2>
                        <p className="text-xl font-bold">{disconnectedStudents}</p>
                    </div>
                </div>
                
                <div 
                    className="border-2 border-blue-500 rounded-lg w-64 p-2 flex items-center bg-white shadow-md cursor-pointer" 
                    onClick={() => navigate("/Domaines")}
                    role="button" 
                    tabIndex="0"
                >
                    <i className="bi bi-book-half text-blue-500 text-4xl mr-4"></i>
                    <div>
                        <h2 className="text-lg font-semibold">Les Domaines</h2>
                        <p className="text-xl font-bold">{disconnectedDomaines}</p>
                    </div>
                </div>
            </div>
            
            {/* Charts Section */}
            <div className="flex justify-between mt-20">
                <div className="w-1/2 px-2 bg-gray-100 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-center mb-4">Écoles les plus consultées</h2>
                    <div style={{ width: '90%', height: '250px' }}>
                        <Bar data={chartDataEcoles} options={chartOptions} />
                    </div>
                </div>
                
                <div className="w-1/2 px-2 bg-gray-100 rounded-lg shadow-lg p-4">
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