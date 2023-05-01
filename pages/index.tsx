import {
  WheelEvent,
  WheelEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import Nav from "@/components/Nav";
import { useContext } from "react";
import { ThemeContext } from "@/ThemeContext";
import Main from "@/components/Main";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NavItem } from "@/types";
import { NAV_ITEMS } from "@/config";
import { pageIndex } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

const ANIM_DELAY = 0.25;

export default function Home() {
  const { theme } = useContext(ThemeContext);

  const styles = {
    mainStyle: { background: theme?.primary },
  };

  const [activePage, setActivePage] = useState<NavItem>("home");
  const [scrollOnCoolown, setScrollOnCooldown] = useState(false);
  const prevActivePage = useRef<NavItem>("home");
  const navRef = useRef<HTMLUListElement | null>(null);

  const pages = {
    work: <Work />,
    home: <Main />,
    contact: <Contact />,
  };

  useEffect(() => {
    prevActivePage.current = activePage;
  }, [activePage]);

  const pageVariants: Record<NavItem, Variants | {}> = {
    work: {
      initial: { x: "-100%", opacity: 0 },
      enter: { x: "0%", opacity: 1, transition: { duration: ANIM_DELAY } },
      exit: { x: "-100%", opacity: 0, transition: { duration: ANIM_DELAY } },
    },
    home: {
      initial: (custom: { prevPage: NavItem; currentPage: NavItem }) => ({
        x:
          NAV_ITEMS.indexOf(custom.currentPage) >
          NAV_ITEMS.indexOf(custom.prevPage)
            ? "100%"
            : "-100%",
        transition: { duration: ANIM_DELAY },
      }),
      enter: { x: "0%", opacity: 1, transition: { duration: ANIM_DELAY } },
      exit: (custom: { prevPage: NavItem; currentPage: NavItem }) => ({
        x:
          NAV_ITEMS.indexOf(custom.currentPage) >
          NAV_ITEMS.indexOf(custom.prevPage)
            ? "-100%"
            : "100%",
        transition: { duration: ANIM_DELAY },
      }),
    },
    contact: {
      initial: { x: "100%", opacity: 0 },
      enter: { x: "0%", opacity: 1, transition: { duration: ANIM_DELAY } },
      exit: { x: "100%", opacity: 0, transition: { duration: ANIM_DELAY } },
    },
  };

  const changeActivePageOnScroll = (e: WheelEvent<HTMLElement> | undefined) => {
    if (e?.deltaY && !scrollOnCoolown) {
      setScrollOnCooldown(true);
      if (e.deltaY < 0 && activePage !== "work") {
        setActivePage(NAV_ITEMS[pageIndex(activePage) - 1]);
      } else if (e.deltaY > 0 && activePage !== "contact") {
        setActivePage(NAV_ITEMS[pageIndex(activePage) + 1]);
      }
    }

    setTimeout(() => setScrollOnCooldown(false), 1000);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="h-screen"
        onWheel={changeActivePageOnScroll}
        style={styles.mainStyle}
      >
        <Nav
          activePage={activePage}
          setActivePage={setActivePage}
          navEl={navRef}
        />
        <AnimatePresence mode="wait">
          <motion.div
            custom={{
              prevPage: prevActivePage.current,
              currentPage: activePage,
            }}
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
