import { ThemeContext } from "@/ThemeContext";
import { logos } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaExpand,
} from "react-icons/fa";
import { IoMdOpen, IoMdShare } from "react-icons/io";
import { Project, projects } from "./projects";
import { useScreenSize } from "@/hooks/useScreenSize";

const EXPAND_BTN_SIZE = 30;

interface ProjectInfoProps {
  project: Project;
  exitDirection: number;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [linkHover, setLinkHover] = useState(false);
  const [gitHover, setGitHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  const { theme } = useContext(ThemeContext);
  const imageRef = useRef<HTMLImageElement | null>(null);

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
      className="h-full flex-1 flex flex-col gap-5 justify-start relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-10 justify-even items-center h-full">
        <div className="flex flex-1 flex-col gap-5">
          <div className="2xl:text-lg xl:text-md ">{project.description}</div>
          <hr className="py-3" />
          {project.logos.length > 0 && (
            <div className="flex flex-1 gap-3 flex-wrap justify-center">
              {project.logos.map((logo) => (
                <div
                  key={logo}
                  style={{}}
                  className="2xl:h-14 2xl:w-14 lg:h-10 lg:w-10 relative"
                >
                  <Image
                    src={logo}
                    alt="logo"
                    fill={true}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {project.screenshots.length > 0 && (
          <div className="h-full flex flex-1 flex-col gap-3 justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreenshotIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full relative w-full p-2 transition-all"
              >
                <Image
                  onMouseEnter={() => setPhotoHover(true)}
                  onMouseLeave={() => setPhotoHover(false)}
                  ref={imageRef}
                  key={currentScreenshotIndex}
                  style={{
                    objectFit: "contain",
                    opacity: photoHover ? 0.3 : 1,
                  }}
                  src={project.screenshots[currentScreenshotIndex]}
                  fill={true}
                  alt="Screenshot"
                  className="transition-all cursor-pointer"
                />
                {imageRef.current && photoHover && (
                  <motion.div
                    key={currentScreenshotIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaExpand
                      onMouseEnter={() => setPhotoHover(true)}
                      onMouseLeave={() => setPhotoHover(false)}
                      size={EXPAND_BTN_SIZE}
                      color={theme?.secondary}
                      className="absolute z-10 cursor-pointer"
                      style={{
                        top: (imageRef.current.height - EXPAND_BTN_SIZE) / 2,
                        left: (imageRef.current.width - EXPAND_BTN_SIZE) / 2,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            {project.screenshots?.length > 1 && (
              <div className="flex gap-5">
                <FaChevronLeft
                  onMouseEnter={() => setLeftHover(true)}
                  onMouseLeave={() => setLeftHover(false)}
                  style={{
                    color: leftHover ? theme?.secondary : theme?.accent,
                  }}
                  size={25}
                  className="cursor-pointer"
                  onClick={() => changeScreenshot(-1)}
                />
                <FaChevronRight
                  onMouseEnter={() => setRightHover(true)}
                  onMouseLeave={() => setRightHover(false)}
                  style={{
                    color: rightHover ? theme?.secondary : theme?.accent,
                  }}
                  size={25}
                  className="cursor-pointer"
                  onClick={() => changeScreenshot(1)}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {(project.github || project.link) && (
        <div className="flex gap-3 justify-end absolute top-0 right-0">
          {project.github && (
            <a
              target="_blank"
              href={project.github}
              onMouseEnter={() => setGitHover(true)}
              onMouseLeave={() => setGitHover(false)}
              style={{ color: gitHover ? theme?.secondary : theme?.accent }}
              className="transition-all"
            >
              <FaCode size={25} />
            </a>
          )}
          {project.link && (
            <a
              target="_blank"
              href={project.link}
              onMouseEnter={() => setLinkHover(true)}
              onMouseLeave={() => setLinkHover(false)}
              style={{
                color: linkHover ? theme?.secondary : theme?.accent,
              }}
              className="transition-all"
            >
              <IoMdOpen size={25} />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

interface ProjectButtonProps {
  project: Project;
  selectedProjectIdx: number;
  setSelectedProject: (project: Project) => void;
}

const ProjectListItem: React.FC<ProjectButtonProps> = ({
  project,
  selectedProjectIdx,
  setSelectedProject,
}) => {
  const { theme } = useContext(ThemeContext);
  const [onHover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative my-2 rounded-sm"
      onClick={() => setSelectedProject(project)}
      style={{
        border:
          onHover || project.idx == selectedProjectIdx
            ? `solid 1px ${theme?.secondary}`
            : `solid 1px ${theme?.primary}`,
        backgroundColor:
          project.idx == selectedProjectIdx ? theme?.secondary : theme?.primary,
        transition: "background-color 0.2s linear 0s, border 0.2s linear 0s",
      }}
    >
      <button
        style={{
          color:
            project.idx == selectedProjectIdx
              ? theme?.primary
              : theme?.secondary,
        }}
        className="p-2 w-full text-left 2xl:text-xl xl:text-lg lg:text-base"
      >
        {project.name}
      </button>
      <button></button>
    </li>
  );
};

export const Work: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const [lastProjectIndex, setLastProjectIndex] = useState(0);
  const exitDirection = selectedProject.idx < lastProjectIndex ? 1 : -1;

  const [sectionHover, setSectionHover] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div
        onMouseEnter={() => setSectionHover(true)}
        onMouseLeave={() => setSectionHover(false)}
        className="transition-all justify-start items-center 2xl:w-[75%] 2xl:h-[75%] xl:w-[90%] xl-[90%] m-auto p-10 rounded-md"
        style={{
          color: theme?.accent,
          display: "flex",
          flexDirection: "row",
          border: `solid 1px ${theme?.secondary}`,
          boxShadow: sectionHover ? `0px 0px 10px ${theme?.secondary}` : "",
        }}
      >
        <ul
          className="text-xl mr-20 pr-5 h-full"
          style={{
            borderRight: `solid 2px ${theme?.secondary}`,
          }}
          ref={ulRef}
        >
          {projects.map((project) => (
            <ProjectListItem
              key={project.idx}
              project={project}
              selectedProjectIdx={selectedProject.idx}
              setSelectedProject={(project) => {
                setLastProjectIndex(selectedProject.idx);
                setSelectedProject(project);
              }}
            />
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <ProjectInfo
            key={selectedProject.idx}
            project={selectedProject}
            exitDirection={exitDirection}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
