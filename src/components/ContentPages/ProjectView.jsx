import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { DocumentViewer, Loading, SaveComp } from '../index'; // Assume a component for viewing PDFs
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import projectService from '../../appwrite/ProjectServices';

const ProjectView = () => {
  const [isLoading, setisLoading] = useState(false)
  const [project, setProject] = useState(null);
  const [reportURL, setReportURL] = useState('');
  const { projectID } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (projectID) {
      setisLoading(true);
      projectService.getProject(projectID).then(async (fetchedProject) => {
        if (fetchedProject) {
          console.log("report", fetchedProject);
          
          try {
            const report = await projectService.getReport(fetchedProject.reportID);
            setProject(fetchedProject);
            setReportURL(report); // Assuming 'report' contains the URL
            console.log("report", report);  // This should log the resolved report object
            console.log(fetchedProject);  // This will log the fetched project
          } catch (error) {
            console.log("Error fetching report:", error);
          } finally {
            setisLoading(false);
          }
        } else {
          navigate('/');
        }
      });
    }
  }, [projectID, navigate]);
  

  if (isLoading) {
    // Show loading spinner or message
    return <Loading isLoading={isLoading} />;
  }

  if (!project) {
    // If no project is found, you can show an error message
    return <div>Project not found.</div>;
  }

  return (
    <div className="p-6 lg:p-10 bg-gray-100 min-h-screen flex flex-col">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#021526]">
          {project.title}
        </h1>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300">
            <Icon icon="material-symbols:thumb-up-outline" width="24" height="24" />
          </button>
          <SaveComp/>
          <button className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300">
            <Icon icon="material-symbols:share-outline" width="24" height="24" />
          </button>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="mb-4 text-sm text-gray-600">
        <p>Created by: <span className="font-medium">{project.authorName}</span></p>
        <p>Created on: <span className="font-medium">{project.createdDate}</span></p>
      </div>
      <hr className="my-8 border-t border-gray-300 sm:border-t-2 md:border-t-2" />
      {/* Field Row */}
      <div className="mb-2 text-lg font-medium text-gray-800">
        Field : {project.field}
      </div>
      
      {/*Github Link */}
      <div className="mb-2 text-lg font-medium text-gray-800">
        GithubLink : {project.githubLink}
      </div>

      {/* Project Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
        <div className="text-gray-700 leading-relaxed">
          {parse(project.description)}
        </div>
      </div>

      {/* Report PDF */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Report</h2>
        {reportURL ? (
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow">
            <DocumentViewer url={reportURL} hasSubscription={project.subscription} />
          </div>
        ) : (
          <p className="text-gray-500">No report available for this project.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectView;
