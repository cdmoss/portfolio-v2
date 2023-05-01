import React, { useContext } from 'react';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeContext } from '@/ThemeContext';
import { FaChevronRight } from "react-icons/fa"

const DELAY_STEP = 0.25

const Main: React.FC = () => {
  const {theme} = useContext(ThemeContext)
  
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
    hidden: { opacity: 0, x: "200%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: (bulletPoints.length + 1) * DELAY_STEP, 
      },
    },
  };


  return (
    <div className='flex h-full w-5/6 mx-auto'>
      {/* Left half with bullet points */}
      <div className="flex-1 h-full flex flex-col relative items-center space-y-20">
        <div className='flex h-full flex-col absolute top-1/4 px-10'>
          <div style={{color: theme?.secondary}} className='text-6xl pb-10'>
            <span style={{color: theme?.accent}}>{"Hi, I'm "}</span>
            <span style={{color: theme?.secondary}}>{"Chase Mossing"}</span>
          </div>
          <p className='text-2xl mb-3' style={{color: theme?.accent}}>{"I'm a driven full-stack developer looking for opportunities to grow my skillset and build excellent software."}</p>
          <hr className='my-5'/>
          <p className='text-2xl mb-2' style={{color: theme?.secondary}}>{"Highlights:"}</p>
          <ul>
          {bulletPoints.map((point, index) => (
            <li className='my-3' key={index}>
              <motion.div
                custom={index}
                variants={bulletVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-start">
                  <FaChevronRight style={{color: theme?.secondary}} className='mr-5 mt-2' />
                  <span className='text-xl' style={{color: theme?.accent}}>{point}</span>
              </motion.div> 
            </li>
          ))}
          </ul>
        </div>
      </div>

      {/* Middle section */}
      {/* <MaybeAnimateDiv hasRenderedBefore={hasRenderedBefore} variants={skillsVariants} className="flex-1 break-all">        
          skillsskillsskillsskillsskillssk illsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskills skillsskillsskillsskillsskillsskillsskillsskillsskillsskillss killsskillsskil lsskillsski lsskillsskillsskillsski llsskillsskillsskillsskillsskillsskillsskill sskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskillsskills
      </MaybeAnimateDiv> */}

      {/* Right half with image */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-none justify-center items-center">
        <Image
            src="/person.png" // Replace with your image URL
            alt="Large"
            className="h-auto"
            width={500}
            height={500}
          />
        </motion.div>
    </div>
  );
};

export default Main;