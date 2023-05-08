import { useTheme } from "@/ThemeContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaCode,
} from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { Project, projects } from "./projects";

const EXPAND_BTN_SIZE = 30;

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [linkHover, setLinkHover] = useState(false);
  const [gitHover, setGitHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  const { theme } = useTheme();
  const { width } = useScreenSize();
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
      className="h-full flex-1 flex gap-5 justify-start max-lg:flex-col relative max-lg:mb-16 lg:pl-20"
      style={{
        borderLeft:
          width && width > 1024 ? `solid 2px ${theme?.secondary}` : "",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex max-lg:flex-col gap-10 justify-even items-center lg:h-full w-full">
        <div className="flex flex-1 flex-col lg:max-w-[50%] m-auto">
          <div className="2xl:text-lg xl:text-md">{project.description}</div>
          {(project.github || project.link) && (
            <div className="flex gap-3 justify-end">
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
          <hr className="py-3 mt-5" />
          {project.logos.length > 0 && (
            <div className="flex lg:flex-1 gap-3 flex-wrap justify-center">
              {project.logos.map((logo) => (
                <div
                  key={logo}
                  style={{}}
                  className="2xl:h-14 2xl:w-14 h-10 w-10 relative"
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
          <div className="h-full w-full flex lg:flex-1 flex-col gap-3 justify-center items-center max-lg:hidden">
            <AnimatePresence mode="wait">
              <motion.a
                href={project.screenshots[currentScreenshotIndex]}
                target="_blank"
                key={currentScreenshotIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full relative w-full p-2"
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
                  className="cursor-pointer transition-opacity"
                />
                {imageRef.current && (
                  <div
                    key={currentScreenshotIndex}
                    style={{ opacity: imageRef.current && photoHover ? 1 : 0 }}
                    className="transition-opacity"
                  >
                    <IoMdOpen
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
                  </div>
                )}
              </motion.a>
            </AnimatePresence>
            {project.screenshots?.length > 1 && (
              <div className="flex gap-5 max-lg:hidden">
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
    </motion.div>
  );
};

interface ProjectButtonProps {
  project: Project;
  selectedProjectIdx: number;
  setSelectedProject?: (project: Project) => void;
}

const ProjectListItem: React.FC<ProjectButtonProps> = ({
  project,
  selectedProjectIdx,
  setSelectedProject,
}) => {
  const { theme } = useTheme();
  const [onHover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative lg:my-2 rounded-sm flex justify-center"
      onClick={() => {
        if (setSelectedProject) setSelectedProject(project);
      }}
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
          cursor: project.idx == selectedProjectIdx ? "default" : "pointer",
        }}
        className="p-2 w-full text-left max-lg:text-center 2xl:text-xl xl:text-lg lg:text-base"
      >
        {project.name}
      </button>
      <button></button>
    </li>
  );
};

export const Work: React.FC = () => {
  const { theme } = useTheme();

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [listOpen, setListOpen] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const { width } = useScreenSize();

  return (
    <div className="flex flex-col h-full max-lg:pb-10">
      <div
        className="transition-all flex lg:items-center max-lg:flex-col h-full m-8 lg:m-20 2xl:m-52 rounded-md"
        style={{
          color: theme?.accent,
        }}
      >
        <ul
          className="text-xl h-fit justify-center lg:pr-5 flex flex-col"
          style={{
            transition: "height 0.2s linear 0s",
          }}
          ref={ulRef}
        >
          {width && width <= 1024 && !listOpen ? (
            <ProjectListItem
              project={selectedProject}
              selectedProjectIdx={selectedProject.idx}
            />
          ) : (
            <>
              {projects.map((project) => (
                <ProjectListItem
                  key={project.idx}
                  project={project}
                  selectedProjectIdx={selectedProject.idx}
                  setSelectedProject={(project) => {
                    setSelectedProject(project);
                    if (listOpen) setListOpen(false);
                  }}
                />
              ))}
            </>
          )}
          <li
            onClick={() => setListOpen(!listOpen)}
            className="w-full flex justify-center mt-2 mb-4 cursor-pointer lg:hidden"
          >
            {listOpen ? (
              <FaChevronUp color={theme?.secondary} />
            ) : (
              <FaChevronDown color={theme?.secondary} />
            )}
          </li>
        </ul>
        <AnimatePresence mode="wait">
          <ProjectInfo key={selectedProject.idx} project={selectedProject} />
        </AnimatePresence>
      </div>
    </div>
  );
};
