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
    <div className='flex'>
      {/* Left half with bullet points */}
      <div className="flex-1">
        <ul>
          {bulletPoints.map((point, index) => (
            <motion.li
              key={index}
              custom={index}
              variants={bulletVariants}
              initial="hidden"
              animate="visible"
              className='text-white'
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right half with image */}
      <motion.div
        className="flex-1"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          Hello
        </div>
        {/* <Image
          src="https://via.placeholder.com/300" // Replace with your image URL
          alt="Large"
          className="w-full h-auto"
          width={100}
          height={100}
        /> */}
      </motion.div>
    </div>
  );
};

export default Main;