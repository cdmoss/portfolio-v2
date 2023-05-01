import { ThemeContext } from "@/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";

interface Project {
  name: string;
  description: string;
  screenshots: string[];
}

interface ProjectInfoProps {
  project: Project;
}

// Assuming your projects are stored in an array of objects
const projects = [
  {
    idx: 0,
    name: "click & push",
    description: "This is Project 1",
    screenshots: [],
  },
  {
    idx: 1,
    name: "YARO",
    description: "This is Project 1",
    screenshots: [],
  },
  {
    idx: 2,
    name: "elixr",
    description: "This is Project 3",
    screenshots: [],
  },
  {
    idx: 3,
    name: "TRAD data monitor",
    description: "This is Project 3",
    screenshots: [],
  },
  {
    idx: 4,
    name: "HR manager",
    description: "This is Project 3",
    screenshots: [],
  },
  {
    idx: 5,
    name: "bitcoin info site",
    description: "This is Project 3",
    screenshots: [],
  },
  {
    idx: 6,
    name: "minimalist design project",
    description: "This is Project 3",
    screenshots: [],
  },
  {
    idx: 7,
    name: "business manager school project",
    description: "This is Project 3",
    screenshots: [],
  },
];

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  console.log(project);

  const changeScreenshot = (delta: number) => {
    setCurrentScreenshotIndex(
      (prevIndex) =>
        (prevIndex + delta + project.screenshots.length) %
        project.screenshots.length
    );
  };

  return (
    <motion.div
      className="flex-1"
      initial={{ x: "300%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <p className="text-xl">{project.description}</p>
      {project.screenshots.length > 0 && (
        <div>
          <button onClick={() => changeScreenshot(-1)}>Previous</button>
          <Image
            src={project.screenshots[currentScreenshotIndex]}
            alt="Screenshot"
            width={200}
            height={200}
          />
          <button onClick={() => changeScreenshot(1)}>Next</button>
        </div>
      )}
    </motion.div>
  );
  //   <div className="flex-1 bg-white">
  //     <p className="text-xl">{project.description}</p>
  //     {project.screenshots.length > 0 && (
  //       <div>
  //         <button onClick={() => changeScreenshot(-1)}>Previous</button>
  //         <Image
  //           src={project.screenshots[currentScreenshotIndex]}
  //           alt="Screenshot"
  //           width={200}
  //           height={200}
  //         />
  //         <button onClick={() => changeScreenshot(1)}>Next</button>
  //       </div>
  //     )}
  //   </div>
  // );
};

export const Work: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const ulRef = useRef<HTMLUListElement | null>(null);

  return (
    <div
      className="h-full justify-center items-center w-[30%] mx-auto "
      style={{ color: theme?.accent, display: "flex", flexDirection: "row" }}
    >
      <ul
        className="text-xl mr-20 pr-5"
        style={{ borderRight: `solid 2px ${theme?.secondary}` }}
        ref={ulRef}
      >
        {projects.map((project) => (
          <li
            className="relative my-2 rounded-sm"
            key={project.name}
            onClick={() => setSelectedProject(project)}
            style={{
              backgroundColor:
                project == selectedProject ? theme?.secondary : theme?.primary,
              transition: "background-color 0.2s linear 0s",
            }}
          >
            <button
              style={{
                color:
                  project == selectedProject
                    ? theme?.primary
                    : theme?.secondary,
              }}
              className="p-2"
            >
              {project.name}
            </button>
          </li>
        ))}
      </ul>
      <ProjectInfo project={selectedProject} />
    </div>
  );
};
