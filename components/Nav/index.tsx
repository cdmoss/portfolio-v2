import { useTheme } from "@/ThemeContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { MutableRefObject, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { ThemeChanger } from "./ThemeChanger";
import { NAV_ITEMS, NavItem, pageIndex } from "./helpers";

interface NavProps {
  activePage: NavItem;
  setActivePage: (index: NavItem) => void;
  navEl: MutableRefObject<HTMLUListElement | null>;
}

interface ItemPosition {
  left: number;
  width: number;
}

interface NavButton {
  item: NavItem;
  active: boolean;
  setActivePage: (index: NavItem) => void;
}

const NavButton: React.FC<NavButton> = ({ item, active, setActivePage }) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: active || hover ? theme?.secondary : theme?.accent,
      }}
      className="sm:text-2xl text-md tracking-wider focus:outline-none transition-colors"
      onClick={() => setActivePage(item)}
    >
      <span>{item}</span>
    </button>
  );
};

const Nav: React.FC<NavProps> = ({
  activePage,
  setActivePage,
  navEl: navRef,
}) => {
  const [navReady, setNavReady] = useState(false);
  const [itemPositions, setItemPositions] = useState<ItemPosition[]>([]);
  const [gitHover, setGitHover] = useState(false);

  const { width } = useScreenSize();

  const { theme } = useTheme();

  useEffect(() => {
    if (navRef.current) {
      if (!navReady) {
        setNavReady(true);
      } else {
        const containerLeft = navRef.current.getBoundingClientRect().left;
        const positions = Array.from(navRef.current.children).map((item) => ({
          left: item.getBoundingClientRect().left - containerLeft,
          width: item.getBoundingClientRect().width,
        }));
        console.log(positions);
        setItemPositions(positions);
      }
    }
  }, [navReady, width]);

  return (
    <nav
      className="flex sticky top-0 z-10 md:h-[10%] h-[10%] items-center justify-evenly"
      style={{
        backgroundColor: theme?.primary,
        borderBottom: `2px solid ${theme?.secondary}`,
        boxShadow: `0px 0px 5px ${theme?.secondary}`,
      }}
    >
      {width && width > 1024 && <ThemeChanger />}
      <div className="flex h-full items-center justify-center">
        <ul
          className="flex flex-row justify-center items-center relative"
          ref={navRef}
        >
          {NAV_ITEMS.map((item, index) => (
            <li key={index} className="md:mx-8 mx-2 mb-2">
              <NavButton
                active={activePage == item}
                item={item}
                setActivePage={setActivePage}
              />
            </li>
          ))}
          <li
            className="absolute left-0 bottom-0 md:h-1 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: theme?.secondary,
              width: itemPositions[pageIndex(activePage)]?.width,
              transform:
                itemPositions.length > 0
                  ? `translateX(${
                      itemPositions[pageIndex(activePage)]?.left
                    }px)`
                  : "translateX(0)",
            }}
          ></li>
        </ul>
      </div>
      <div className="flex gap-5 items-center">
        <a
          onMouseEnter={() => setGitHover(true)}
          onMouseLeave={() => setGitHover(false)}
          href="https://github.com/cdmoss"
          target="_blank"
          className="transition-colors"
          style={{ color: gitHover ? theme.secondary : theme.accent }}
        >
          <FaGithub size={width && width > 640 ? 30 : 20} />
        </a>
        {width && width <= 1024 && <ThemeChanger />}
      </div>
    </nav>
  );
};

export * from "./helpers";
export default Nav;
