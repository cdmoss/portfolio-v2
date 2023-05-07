import { useTheme } from "@/ThemeContext";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer/Footer";
import Main from "@/components/Main";
import Nav, { NAV_ITEMS, NavItem, pageIndex } from "@/components/Nav";
import { Work } from "@/components/Work";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Inter } from "@next/font/google";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Head from "next/head";
import { WheelEvent, useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const ANIM_DELAY = 0.25;

export default function Home() {
  const { theme } = useTheme();

  const [activePage, setActivePage] = useState<NavItem>("home");
  const [scrollOnCoolown, setScrollOnCooldown] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const prevActivePage = useRef<NavItem>("home");
  const navRef = useRef<HTMLUListElement | null>(null);

  const { width } = useScreenSize();

  const pages = {
    work: <Work />,
    home: <Main setActivePage={setActivePage} />,
    contact: <Contact />,
  };

  useEffect(() => {
    prevActivePage.current = activePage;
  }, [activePage]);

  useEffect(() => {
    const touchDelta = touchEnd - touchStart;

    if (touchDelta > 50) {
      if (touchDelta < 0) {
        setActivePage(NAV_ITEMS[pageIndex(activePage) - 1]);
      } else {
        setActivePage(NAV_ITEMS[pageIndex(activePage) + 1]);
      }
    }
  }, [touchStart, touchEnd]);

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
    if (scrollOnCoolown) {
      return;
    }

    if (width! >= 1029 && e?.deltaY) {
      if (e!.deltaY > 50) {
        setScrollOnCooldown(true);
        if (e!.deltaY < 0 && activePage !== "work") {
          setActivePage(NAV_ITEMS[pageIndex(activePage) - 1]);
        } else if (e!.deltaY > 0 && activePage !== "contact") {
          setActivePage(NAV_ITEMS[pageIndex(activePage) + 1]);
        }
      }
    }
    setTimeout(() => setScrollOnCooldown(false), 1000);
  };

  return (
    <>
      <Head>
        <title>Chase Mossing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: change icon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        onTouchStart={(e) => setTouchStart(e.touches.item(0).screenX)}
        onTouchEnd={(e) => setTouchStart(e.touches.item(0).screenX)}
        className="h-full transition-colors"
        onWheel={changeActivePageOnScroll}
        style={{ backgroundColor: theme?.primary }}
      >
        <div className="h-screen">
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
              className="h-[80%]"
            >
              {pages[activePage]}
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </main>
    </>
  );
}
