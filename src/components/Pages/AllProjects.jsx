import React, { useEffect, useState } from "react";
import projectService from "../../appwrite/ProjectServices";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Notification, Loading } from "../index";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { field } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
        setIsLoading(true);
      try {
        const fetchedProjects = await projectService.getFieldsProjects(field);
        setProjects(fetchedProjects.documents || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
      finally{
        setIsLoading(false)
      }
    };
    fetchProjects();
  }, [field]);

  // Handle clipboard copy with auto-dismiss notification
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Dismiss notification after 3 seconds
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          All Projects
        </h1>
        <h3 className="text-gray-800 mb-8 text-center">{field} Related</h3>

        {/* Project List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.$id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5"
              >
                {/* Project Title */}
                <Link to={`/project/${project.$id}`} className="block mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {project.title || "(Untitled)"}
                  </h2>
                </Link>

                {/* Metadata */}
                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    <span className="font-medium">Uploaded:</span>{" "}
                    {new Date(project.createdDate).toLocaleDateString()}
                  </p>
                  <p>By: {project.authorName || "Unknown"}</p>
                </div>

                {/* Action Icons */}
                <div className="flex items-center justify-between text-gray-600">
                  {/* Comments and Downloads */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center hover:text-blue-500 transition-colors">
                      <Icon icon="dashicons:admin-comments" width="20" height="20" />
                      <span className="text-sm ml-1">0</span>
                    </button>
                    <button className="flex items-center hover:text-red-500 transition-colors">
                      <Icon icon="ic:round-file-download" width="24" height="24" />
                      <span className="text-sm ml-1">0</span>
                    </button>
                  </div>

                  {/* Share Button */}
                  <button
                    className="hover:text-green-500 transition-colors"
                    onClick={() => handleCopy(`http://localhost:5173/project/${project.$id}`)}
                  >
                    <Icon icon="material-symbols:share" width="24" height="24" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No projects found.
            </p>
          )}
        </div>
      </div>

      {/* Notification */}
      {isCopied && <Notification type="success" message="Address copied to clipboard!" />}
      <Loading isLoading={isLoading}/>
    </div>
  );
};

export default AllProjects;
