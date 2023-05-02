import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { ThemeContext } from "@/ThemeContext";
import { FaChevronRight } from "react-icons/fa";
import { ReactSVG } from "react-svg";
import styles from "./Main.module.css";
import { useScreenSize } from "@/hooks/useScreenSize";

interface Coordinate {
  x: number;
  y: number;
}

const DELAY_STEP = 0.25;

const PICTURE_SIZE = 400;

const Main: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const picRef = useRef<HTMLImageElement | null>(null);

  // Define the bullet points
  const bulletPoints = [
    "I recently obtained an undergraduate degree in Computer Science (April 2023)",
    "I've gained experience using a variety of languages and frameworks across the stack, having spent a collective 16 months during my degree working as a full-stack intern in multiple roles.",
  ];

  const bulletVariants = {
    hidden: { opacity: 0, x: "-25%" },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: (i + 1) * DELAY_STEP, // Staggered delay based on index
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, x: "50%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: DELAY_STEP,
      },
    },
  };

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", duration: 1.5, bounce: 0 },
          opacity: { duration: 0.01 },
        },
      };
    },
  };

  return (
    <div className="h-full w-full relative">
      <div className="flex h-full w-5/6 mx-auto">
        {/* Left half with bullet points */}
        <div className="flex-1 h-full flex flex-col items-center">
          <div className="flex h-full flex-col">
            <div className="h-[25%]"></div>
            <div style={{ color: theme?.secondary }} className="text-6xl pb-10">
              <span style={{ color: theme?.accent }}>{"Hi, I'm "}</span>
              <span style={{ color: theme?.secondary }}>{"Chase Mossing"}</span>
            </div>
            <p className="text-2xl mb-3" style={{ color: theme?.accent }}>
              {
                "I'm a driven full-stack developer looking for opportunities to grow my skillset and build excellent software."
              }
            </p>
            <hr className="my-5" />
            <p className="text-2xl mb-2" style={{ color: theme?.secondary }}>
              {"Highlights:"}
            </p>
            <ul ref={ulRef}>
              {bulletPoints.map((point, index) => (
                <li className="my-3" key={index}>
                  <motion.div
                    custom={index}
                    variants={bulletVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start"
                    style={{}}
                  >
                    <FaChevronRight
                      style={{ color: theme?.secondary }}
                      className="mr-5 mt-2"
                    />
                    <span className="text-xl" style={{ color: theme?.accent }}>
                      {point}
                    </span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className={`${styles.hexagon} flex justify-center items-center h-full`}
          style={{
            height: PICTURE_SIZE + 25,
            width: PICTURE_SIZE + 25,
            backgroundColor: theme?.secondary,
          }}
        >
          <Image
            src="/person.png" // Replace with your image URL
            alt="Large"
            ref={picRef}
            className={styles.hexagon}
            width={PICTURE_SIZE}
            height={PICTURE_SIZE}
          />
        </motion.div>
      </div>
      {/* {(width && height) && 
      <motion.svg 
        className="absolute top-0 left-0" 
        width="100%" 
        height="100%" 
        viewBox={`0 0 100 100`} 
        initial="hidden" 
        animate="visible">
        <motion.path
          d={`M0 15 L0 5 L10 5`}
          stroke="#00cc88"
          strokeLinejoin={'round'}
          strokeLinecap={'butt'}
          variants={draw}
          custom={2}/>
      </motion.svg>} */}
    </div>
  );
};

export default Main;
