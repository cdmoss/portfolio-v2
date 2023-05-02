import { ThemeContext } from "@/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";

interface Project {
  idx: number;
  name: string;
  link: string;
  description: string;
  screenshots: string[];
  logos: string[];
}

interface ProjectInfoProps {
  project: Project;
}

// Assuming your projects are stored in an array of objects
const projects: Project[] = [
  {
    idx: 0,
    name: "click & push",
    link: "",
    description:
      "Click & Push is a company with the mission to make public spaces more accessible. I performed full-stack development for them, working with react native and django to build their main product, the Atlas - a mapping app that displays community sourced accessibility information of many kinds.",
    screenshots: [],
    logos: [
      "/logos/react.png",
      "/logos/django.png",
      "/logos/nginx.png",
      "/logos/docker1.png",
      "/logos/digitalocean.png",
    ],
  },
  {
    idx: 1,
    name: "YARO",
    link: "",
    description: "yaro description",
    screenshots: [],
    logos: [
      "/logos/react.png",
      "/logos/django.png",
      "/logos/nginx.png",
      "/logos/docker1.png",
      "/logos/unreal.png",
      "/logos/java1.png",
      "/logos/objc.png",
      "/logos/azure.png",
    ],
  },
  {
    idx: 2,
    name: "elixr",
    link: "",
    description: "elixr description",
    screenshots: [],
    logos: [
      "/logos/dotnet.png",
      "/logos/csharp.png",
      "/logos/html.webp",
      "/logos/css1.png",
      "/logos/js.png",
    ],
  },
  {
    idx: 3,
    name: "TRAD data monitor",
    link: "https://github.com/cdmoss/TradDataMonitor-v2",
    description: "TRAD description",
    screenshots: [],
    logos: ["/logos/avalonia.ico", "/logos/dotnet.png", "/logos/csharp.png"],
  },
  {
    idx: 4,
    name: "HR manager",
    link: "",
    description: "hr description",
    screenshots: [],
    logos: ["/logos/blazor.png", "/logos/dotnet.png", "/logos/csharp.png"],
  },
  {
    idx: 5,
    name: "bitcoin info site",
    link: "https://bitcoin-info.netlify.app",
    description: "btc description",
    screenshots: [],
    logos: ["/logos/html.webp", "/logos/css1.png", "/logos/js.png"],
  },
  {
    idx: 6,
    name: "minimalist website design",
    link: "https://www.figma.com/proto/glTvMyovhqOCohLZM0mZW8/3520AssignmentOne?scaling=scale-down&page-id=0%3A1&node-id=1-23&starting-point-node-id=1%3A5",
    description: "minimalist description",
    screenshots: [],
    logos: ["/logos/figma.png"],
  },
  {
    idx: 7,
    name: "business manager",
    link: "",
    description: "business description",
    screenshots: [],
    logos: ["/logos/php.webp", "/logos/mysql.png", "/logos/apache.png"],
  },
  {
    idx: 7,
    name: "logic simulator",
    link: "https://basic-logic-sim.netlify.app",
    description: "business description",
    screenshots: [],
    logos: ["/logos/html.webp", "/logos/css1.png", "/logos/js.png"],
  },
];

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [hoveringButton, setHoveringButton] = useState(false);
  const { theme } = useContext(ThemeContext);

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
      className="h-full flex-1 flex flex-col gap-5 justify-start"
      initial={{ x: "50%", opacity: 0 }}
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
            width={100}
            height={100}
          />
          <button onClick={() => changeScreenshot(1)}>Next</button>
        </div>
      )}
      {project.logos.length > 0 && (
        <div>
          <hr />
          <div className="text-xl my-2">Tools used:</div>
          <div className="flex flex-1 justify-start gap-3">
            {project.logos.map((logo) => (
              <Image
                key={logo}
                src={logo}
                alt="logo"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
            ))}
          </div>
        </div>
      )}
      {project.link && (
        <div className="flex-1 mt-2">
          <a
            target="_blank"
            href={project.link}
            onMouseEnter={() => setHoveringButton(true)}
            onMouseLeave={() => setHoveringButton(false)}
            style={{
              border: `solid 1px ${theme?.secondary}`,
              color: hoveringButton ? theme?.primary : theme?.secondary,
              backgroundColor: hoveringButton
                ? theme?.secondary
                : theme?.primary,
            }}
            className="text-xl p-3 rounded-md transition-all"
          >
            Check it out
          </a>
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
    <div className="flex flex-col h-full">
      <div className="h-[25%]"></div>
      <div
        className="justify-start items-center w-[50%] mx-auto "
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
                  project == selectedProject
                    ? theme?.secondary
                    : theme?.primary,
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
                className="p-2 w-full text-left"
              >
                {project.name}
              </button>
            </li>
          ))}
        </ul>
        <ProjectInfo project={selectedProject} />
      </div>
    </div>
  );
};
