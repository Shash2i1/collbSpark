import React, { useState } from "react";
import { Input, Select, RTE, Button, Loading, Notification } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import projectService from "../../appwrite/ProjectServices";
import { Icon } from "@iconify/react/dist/iconify.js";

function PostProjectForm({ project }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: project?.title || "",
      field: project?.field || "",
      description: project?.description || "",
      githubLink: project?.githubLink || "",
    },
  });

  const submitProject = async (data) => {
    setIsLoading(true)
    let reportId = null;

    const file = data.report?.[0];
    if (file) {
      try {
        const uploadedFile = await projectService.uploadReport(file);
        reportId = uploadedFile.$id;
      } catch (error) {
        console.error("Error uploading report:", error);
        return;
      }
    }

    const date = new Date();
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthList[date.getMonth()];
    const createdDate = `${date.getDate()}, ${month} ${date.getFullYear()}`;

    const projectData = {
      ...data,
      thumbnailID: "sdsdsds",
      userID: userData?.userData.$id,
      authorName: userData?.userData.name,
      createdDate,
      reportID: reportId,
    };

    try {
      const dbResponse = await projectService.uploadProject(projectData);
      setNotification({ type: "success", message: "Project uploaded successfully!" })
      setTimeout(() => {
        navigate("/myprojects");
      }, 2000)

    } catch (error) {
      setNotification({ type: "error", message: "Failed to upload the project." });
      console.error("Error uploading project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
        Upload Project
      </h1>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit(submitProject)}
        className="bg-white shadow-md rounded-lg p-8 lg:w-2/3 w-full"
      >
        {/* Title and Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
              Project Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter project title"
              {...register("title", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />
          </div>

          {/* Select Field */}
          <div>
            <label htmlFor="field" className="block text-gray-700 text-sm font-medium mb-2">
              Select Field
            </label>
            <select
              id="field"
              {...register("field", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            >
              <option value="" disabled>
                Select Field
              </option>
              <option value="AIML">AIML</option>
              <option value="Web">Web</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <RTE
            label="Project Description"
            name="description"
            control={control}
            className="w-full border-gray-300 rounded-lg"
          />
        </div>

        {/* File Upload and GitHub URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* File Upload */}
          <div>
            <label htmlFor="report" className="block text-gray-700 text-sm font-medium mb-2">
              Report (PDF/PPT)
            </label>
            <div className="relative border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
              <input
                id="report"
                type="file"
                accept=".pdf, .ppt, .docx"
                {...register("report", { required: !project })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center">
                <Icon
                  icon="ic:baseline-upload-file"
                  width="24"
                  height="24"
                  className="text-blue-500"
                />
                <span className="ml-3 text-gray-500">Upload your report</span>
              </div>
            </div>
          </div>

          <Input
            type="url"
            label="GitHub URL"
            placeholder="https://github.com/..."
            {...register("githubLink")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit
          </Button>
        </div>
      </form>
      {notification && <Notification
        type={notification.type}
        message={notification.message}
      />}
      <Loading isLoading={isLoading} text="Uploading Project"/>
    </div>
  );
}

export default PostProjectForm;
