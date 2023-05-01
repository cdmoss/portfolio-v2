import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import Nav from '@/components/Nav';
import { useContext } from 'react';
import { ThemeContext } from '@/ThemeContext';
import Main from '@/components/Main';
import { Work } from '@/components/Work';
import { Contact } from '@/components/Contact';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useScreenSize } from '@/hooks/useScreenSize';

export const NAV_ITEMS = ["work", "name", "contact"] as const
export type NavItem = typeof NAV_ITEMS[number]; 

type SlideDirection = "left" | "right"

const inter = Inter({ subsets: ['latin'] });

const ANIM_DELAY = 0.25

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = {
    mainStyle: { background: theme?.primary },
  };
  
  const [activePage, setActivePage] = useState<NavItem>('name');
  
  const prevActivePage = useRef<NavItem>('name')
  const pages = {'work': <Work />, 'name': <Main/>, 'contact': <Contact />};

  useEffect(() => {
    prevActivePage.current = activePage
  }, [activePage])

  const pageVariants: Record<NavItem, Variants | {}> = {
    'work': {
      initial: { x: '-100%', opacity: 0 },
      enter: { x: '0%', opacity: 1, transition: { duration: ANIM_DELAY } },
      exit: { x: '-100%', opacity: 0, transition: { duration: ANIM_DELAY } },
    },
    'name': {
      initial: (custom: {prevPage: NavItem, currentPage: NavItem}) => ({
        x: NAV_ITEMS.indexOf(custom.currentPage) > NAV_ITEMS.indexOf(custom.prevPage) ? "100%" : "-100%",
        transition: { duration: ANIM_DELAY }
      }),
      enter: { x: '0%', opacity: 1, transition: { duration: ANIM_DELAY } },
      exit: (custom: {prevPage: NavItem, currentPage: NavItem}) => ({
        x: NAV_ITEMS.indexOf(custom.currentPage) > NAV_ITEMS.indexOf(custom.prevPage) ? "-100%" : "100%",
        transition: { duration: ANIM_DELAY } 
      })
    },
    'contact': {
      initial: { x: '100%', opacity: 0,},
      enter: { x: '0%', opacity: 1, transition: { duration: ANIM_DELAY } },
      exit: { x: '100%', opacity: 0, transition: { duration: ANIM_DELAY } },
    },    
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen" style={styles.mainStyle}>
        <Nav activePage={activePage} setActivePage={setActivePage} />
        <AnimatePresence mode="wait">
          <motion.div
            custom={{prevPage: prevActivePage.current, currentPage: activePage}}
            key={activePage}
            variants={pageVariants[activePage]}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-[90%]"
          >
            {pages[activePage]}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}