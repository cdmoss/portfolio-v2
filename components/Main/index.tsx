import { useTheme } from "@/ThemeContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { CSSProperties, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { NavItem } from "../Nav";
import styles from "./Main.module.css";

const DELAY_STEP = 0.25;

const Main: React.FC<{ setActivePage: (item: NavItem) => void }> = ({
  setActivePage,
}) => {
  const { theme } = useTheme();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const picRef = useRef<HTMLImageElement | null>(null);
  const { width } = useScreenSize();
  const pictureSize = () => {
    if (!width || width > 1535) return 400;
    if (width > 640) return 300;
    return 200;
  };

  // Define the bullet points
  const bulletPoints = [
    "I recently obtained an undergraduate degree in Computer Science (April 2023)",
    "I've gained experience using a variety of languages and frameworks across the stack",
    "I've spent a collective 16 months during my degree working as a full-stack intern in multiple roles",
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

  const buttonVariants = {
    hidden: {
      y: "200%",
      opacity: 0,
    },
    entering: {
      y: "0%",
      opacity: 1,
      transition: {
        delay: DELAY_STEP,
      },
    },
    idle: {
      color: theme?.secondary,
      backgroundColor: theme?.primary,
    },
    hover: {
      color: theme?.primary,
      backgroundColor: theme?.secondary,
      transition: { duration: 0.2 },
    },
  };

  const buttonStyles: CSSProperties = {
    border: `solid 1px ${theme?.secondary}`,
  };

  const buttonClasses = "md:p-5 p-3 h-fit rounded-sm";

  const buttonData = [
    {
      text: "see my work",
      action: () => setActivePage("work"),
    },
    {
      text: "get in touch",
      action: () => setActivePage("contact"),
    },
  ];

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

  const renderButtons = () => {
    return (
      <div className="flex py-5 justify-center gap-5 items-center">
        {buttonData.map((data) => (
          <motion.button
            onClick={data.action}
            key={data.text}
            style={buttonStyles}
            variants={buttonVariants}
            initial={"hidden"}
            animate={["idle", "entering"]}
            whileHover="hover"
            className={buttonClasses}
          >
            {data.text}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full relative lg:overflow-hidden">
      {/* Outer vertical flexbox */}
      <div className="flex h-full flex-col">
        {/* Right half with picture */}
        <div className="flex justify-center lg:gap-36 max-lg:flex-col w-[85%] mx-auto ">
          <div className="flex flex-col mt-[5%]">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className={`${styles.hexagon} flex justify-center items-center h-full max-lg:self-center`}
              style={{
                height: pictureSize() + 25,
                width: pictureSize() + 25,
                backgroundColor: theme?.secondary,
              }}
            >
              <Image
                src="/me1.jpg" // Replace with your image URL
                alt="Large"
                ref={picRef}
                className={styles.hexagon}
                width={pictureSize()}
                height={pictureSize()}
              />
            </motion.div>
            {width && width > 1024 && renderButtons()}
          </div>
          {/* Left half with bullet points */}
          <div className="h-full flex flex-col justify-center items-center lg:mt-[17%]">
            <div className="flex h-full flex-col">
              <div
                style={{ color: theme?.secondary }}
                className="2xl:text-5xl lg:text-4xl md:text-3xl max-md:text-2xl xl:pb-12 max-lg:text-center"
              >
                <span style={{ color: theme?.accent }}>{"Hi, I'm "}</span>
                <span style={{ color: theme?.secondary }}>
                  {"Chase Mossing"}
                </span>
              </div>
              {width && width <= 1024 && renderButtons()}
              <p
                className="2xl:text-2xl lg:text-lg mb-3"
                style={{ color: theme?.accent }}
              >
                {
                  "I'm a driven full-stack developer looking for opportunities to grow my skillset and build excellent software."
                }
              </p>
              {<hr className="my-5" />}

              <p
                className="2xl:text-3xl lg:text-xl mb-2"
                style={{ color: theme?.secondary }}
              >
                {"Highlights:"}
              </p>
              <ul ref={ulRef}>
                {bulletPoints.map((point, index) => (
                  <motion.li
                    custom={index}
                    key={index}
                    variants={bulletVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start my-3"
                  >
                    <FaChevronRight
                      size={20}
                      style={{ color: theme?.secondary }}
                      className="mr-5 mt-2"
                    />
                    <p
                      className="flex-1 2xl:text-2xl lg:text-lg"
                      style={{ color: theme?.accent }}
                    >
                      {point}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
