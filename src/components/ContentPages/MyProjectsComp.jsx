import React, { useState } from "react";
import { Icon } from '@iconify/react';
import projectService from "../../appwrite/ProjectServices";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { Notification, Loading } from '../index';

const MyProjects = ({ projects, setProjects }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await projectService.deleteProject(projectToDelete.$id);
      if (projectToDelete.reportID) {
        await projectService.deleteReport(projectToDelete.reportID);
      }
      setProjects((prevProjects) =>
        prevProjects.filter((proj) => proj.$id !== projectToDelete.$id)
      );
      setNotification({ type: "success", message: "Project deleted successfully!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to delete the project." });
    } finally {
      setShowModal(false);
      setProjectToDelete(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-100 min-h-screen flex flex-col">
      {/* Heading */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">My Projects</h1>

      {/* Action Row */}
      <div className="flex items-center justify-between mb-4">
        <Link to='/uploadProject'>
          <button className="px-6 flex items-center py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition">
            <Icon icon="material-symbols:add" width="24" height="24" style={{ color: '#f4efef' }} /> Create Project
          </button>
        </Link>

        <button className="px-6 py-2 flex items-center justify-between text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md transition">
          <Icon icon="icon-park-outline:sort-two" width="14" height="14" style={{ color: '#000' }} /> Sort
        </button>
      </div>

      {/* Horizontal Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* Project Cards or No Project Message */}
      {projects.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.$id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{project.title}</h2>
                <h2 className="text-md text-gray-800 truncate">{project.createdDate}</h2>
              </div>
              <p className="text-gray-600 mt-2 line-clamp-3">{parse(project.description)}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                  onClick={() => navigate(`/project/${project.$id}`)}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteClick(project)}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                >
                  <Icon icon="mingcute:delete-fill" width="14" height="14" style={{ color: '#f4efef' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center text-gray-500 text-xl">
            No project uploaded. Start creating one by clicking "+ Create Project."
          </p>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{projectToDelete.title}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Loading Spinner */}
      <Loading isLoading={isLoading} text="Deleting Project..." />
    </div>
  );
};

export default MyProjects;
