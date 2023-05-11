import { useTheme } from "@/ThemeContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { MutableRefObject, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IconType } from "react-icons";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
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

interface IconLinkProps {
  link: string;
  Icon: IconType;
  onClick?: () => void;
  blankTarget?: boolean;
}

const IconLink: React.FC<IconLinkProps> = ({
  link,
  Icon,
  onClick,
  blankTarget = true,
}) => {
  const [hover, setHover] = useState(false);
  const { theme } = useTheme();
  const { width } = useScreenSize();

  return (
    <a
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={link}
      target={blankTarget ? "__blank" : ""}
      className="transition-colors"
      style={{ color: hover ? theme.secondary : theme.accent }}
    >
      <Icon onClick={onClick} size={width && width > 640 ? 30 : 20} />
    </a>
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

  const copyDiscord = async () => {
    await navigator.clipboard.writeText("mawzy#9415");
    toast("Copied Username!", { duration: 1000, position: "top-right" });
  };

  return (
    <>
      <style></style>
      <nav
        className="flex sticky top-0 z-10 md:h-[10%] h-[10%] items-center lg:justify-between lg:px-52 justify-evenly"
        style={{
          backgroundColor: theme?.primary,
          borderBottom: `2px solid ${theme?.secondary}`,
          boxShadow: `0px 0px 5px ${theme?.secondary}`,
        }}
      >
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
        <div className="flex gap-3 items-center h-full">
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: theme.primary,
                color: theme.secondary,
                border: `solid 1px ${theme.secondary}`,
              },
            }}
          />
          <IconLink link="https://github.com/cdmoss" Icon={FaGithub} />
          <IconLink
            link="https://www.linkedin.com/in/chase-mossing-66832a9a/"
            Icon={FaLinkedin}
          />
          <IconLink
            link="#"
            Icon={FaDiscord}
            blankTarget={false}
            onClick={copyDiscord}
          />
          <TbMinusVertical
            color={theme.accent}
            size={width && width > 640 ? 40 : 25}
          />
          <ThemeChanger />
        </div>
      </nav>
    </>
  );
};

export * from "./helpers";
export default Nav;
