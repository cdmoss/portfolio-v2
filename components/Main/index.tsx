import React, { useContext } from 'react';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeContext } from '@/ThemeContext';
import { FaChevronRight } from "react-icons/fa"

const DELAY_STEP = 0.25

interface SectionProps {
  hasRenderedBefore: boolean 
}

interface MaybeAnimateDivProps {
  children: React.ReactNode, 
  hasRenderedBefore: boolean, 
  index?: number, 
  variants: Variants,
  className: string | undefined
}

const styles = {
  pointText: 'text-lg text-white font-semibold'
}

const MaybeAnimateDiv: React.FC<MaybeAnimateDivProps> = (props) => {
  return (
    <>
    {!props.hasRenderedBefore ?
      <motion.div
        custom={props.index}
        variants={props.variants}
        initial="hidden"
        animate="visible"
        className={props.className}
      >
        {props.children}
      </motion.div> : 
      <div className={props.className}>
        {props.children}
      </div>}
    </>
  )
}

const Main: React.FC<SectionProps> = ({hasRenderedBefore}) => {
  const {theme} = useContext(ThemeContext)
  
  // Define the bullet points
  const bulletPoints = [
    "I recently obtained an undergraduate degree in Computer Science (April 2023)",
    "I've gained experience using a variety of languages and frameworks across the stack, having spent a collective 16 months during my degree working as full-stack intern in multiple roles.", 
  ];

  const bulletVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: (i + 1) * DELAY_STEP, // Staggered delay based on index
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: (bulletPoints.length + 2) * DELAY_STEP, 
      },
    },
  };


  return (
    <div className='flex h-full w-5/6 mx-auto'>
      {/* Left half with bullet points */}
      <div className="flex-1 h-full flex flex-col items-center space-y-20">
        <div className='flex h-full flex-col pt-48 px-10'>
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
              <MaybeAnimateDiv hasRenderedBefore={hasRenderedBefore} index={index} variants={bulletVariants} className="flex justify-start">
                  <FaChevronRight style={{color: theme?.secondary}} className='mr-5 mt-2' />
                  <span className='text-xl' style={{color: theme?.accent}}>{point}</span>
              </MaybeAnimateDiv>
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
      <MaybeAnimateDiv hasRenderedBefore={hasRenderedBefore} variants={imageVariants} className="flex flex-none justify-center items-center">
        <Image
            src="/person.png" // Replace with your image URL
            alt="Large"
            className="h-auto"
            width={500}
            height={500}
          />
      </MaybeAnimateDiv>
    </div>
  );
};

export default Main;