import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import projectService from "../../appwrite/ProjectServices";

const RecentProjects = () => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch projects from the service
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectData = await projectService.getRecentProjects();
                if (projectData) {
                    setProjects(projectData.documents);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    // Auto-slide every 3 seconds
    useEffect(() => {
        if (projects.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [projects.length]);

    // Handle manual slide (left or right)
    const handleSlide = (direction) => {
        setCurrentIndex((prevIndex) => {
            if (direction === "left") {
                return (prevIndex - 1 + projects.length) % projects.length;
            } else if (direction === "right") {
                return (prevIndex + 1) % projects.length;
            }
            return prevIndex;
        });
    };

    // Swipe detection for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 50) handleSlide("right");
        if (touchStartX - touchEndX < -50) handleSlide("left");
    };

    // Get the current, left, and right project for carousel effect
    const getCards = () => {
        if (projects.length === 0) return [];
        const leftIndex = (currentIndex - 1 + projects.length) % projects.length;
        const middleIndex = currentIndex;
        const rightIndex = (currentIndex + 1) % projects.length;
        return [projects[leftIndex], projects[middleIndex], projects[rightIndex]];
    };

    return (
        <div className="relative flex justify-center items-center h-screen bg-gray-900 overflow-hidden">
            <h2 className="absolute top-6 text-white text-2xl sm:text-4xl font-bold">
                Recent Projects
            </h2>

            {/* Left and Right Arrows */}
            <button
                className="absolute left-4 sm:left-10 text-white text-3xl z-30 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90"
                onClick={() => handleSlide("left")}
            >
                &#8592;
            </button>
            <button
                className="absolute right-4 sm:right-10 text-white text-3xl z-30 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90"
                onClick={() => handleSlide("right")}
            >
                &#8594;
            </button>

            {/* Cards */}
            <div
                className="flex items-center justify-center gap-6 relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {getCards().map((project, index) => {
                    const isMiddle = index === 1;
                    const isLeft = index === 0;
                    const isRight = index === 2;

                    return (
                        <div
                            key={project.$id}
                            className={`transition-all duration-700 ease-in-out transform rounded-lg shadow-lg ${isMiddle
                                ? "z-20 scale-110 w-80 sm:w-96 h-96"
                                : "z-10 scale-90 w-60 sm:w-72 h-80 opacity-80"
                                } ${isLeft ? "-translate-x-24 sm:-translate-x-36" : ""} ${isRight ? "translate-x-24 sm:translate-x-36" : ""
                                } bg-gray-800`}
                        >
                            <Link to={`/project/${project.$id}`}>
                                
                                {<img
                                    src="/src/assets/nameLogo.png"
                                    alt={project.title}
                                    className="w-full h-full object-contain rounded-lg"
                                /> }
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center text-sm sm:text-lg font-medium">
                                    {project.title}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentProjects;
