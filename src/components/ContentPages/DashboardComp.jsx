import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ data }) => {
  const uploadedProjectsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Uploaded Projects",
        data: [3, 5, 2, 8, 6, 7],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const downloadedProjectsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Downloaded Projects",
        data: [4, 3, 7, 5, 6, 8],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const coinsEarnedData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Coins Earned",
        data: [10, 20, 15, 25, 30, 35],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Uploaded Projects */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
            <i className="fas fa-upload text-2xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Uploaded Projects</h3>
            <p className="text-2xl font-bold text-gray-800">{data.uploadedProjects}</p>
          </div>
        </div>

        {/* Downloaded Projects */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <i className="fas fa-download text-2xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Downloaded Projects</h3>
            <p className="text-2xl font-bold text-gray-800">{data.downloadedProjects}</p>
          </div>
        </div>

        {/* Coins Earned */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full">
            <i className="fas fa-coins text-2xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Coins Earned</h3>
            <p className="text-2xl font-bold text-gray-800">{data.coinsEarned}</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Uploaded Projects Graph */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Projects</h2>
          <div className="h-64">
            <Bar data={uploadedProjectsData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
          </div>
        </div>

        {/* Downloaded Projects Graph */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Downloaded Projects</h2>
          <div className="h-64">
            <Bar data={downloadedProjectsData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
          </div>
        </div>

        {/* Coins Earned Graph */}
        <div className="bg-white shadow-md rounded-lg p-6 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Coins Earned</h2>
          <div className="h-64">
            <Bar data={coinsEarnedData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
