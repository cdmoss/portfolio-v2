import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const DELAY_STEP = 0.25


const Main = () => {
  const bulletVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * DELAY_STEP, // Staggered delay based on index
      },
    }),
  };
  
  // Define the bullet points
  const bulletPoints = ['Point 1', 'Point 2', 'Point 3'];

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: (bulletPoints.length + 1) * DELAY_STEP, 
      },
    },
  };


  return (
    <div className='flex h-full mx-auto'>
      {/* Left half with bullet points */}
      <div className="flex-1 h-full flex flex-col justify-center space-y-20">
        {bulletPoints.map((point, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={bulletVariants}
            initial="hidden"
            animate="visible"
            className='text-lg font-semibold pl-48'
          >
            <span>{">"}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {point}
          </motion.div>
        ))}
      </div>

      {/* Middle section */}
      <div className="flex-1">
        {/* Content for the middle section goes here */}
      </div>

      {/* Right half with image */}
      <motion.div
        className="flex flex-1 justify-center items-center"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/person.png" // Replace with your image URL
          alt="Large"
          className="h-auto"
          width={200}
          height={200}
        />
      </motion.div>
    </div>
  );
};

export default Main;