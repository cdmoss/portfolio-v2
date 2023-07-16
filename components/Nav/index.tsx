import { useTheme } from "@/ThemeContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { MutableRefObject, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IconType } from "react-icons";
import {
  FaEnvelope,
  FaPhone,
  FaDiscord,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
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
  label?: string;
}

const IconLink: React.FC<IconLinkProps> = ({
  link,
  Icon,
  onClick,
  blankTarget = true,
  label,
}) => {
  const [hover, setHover] = useState(false);
  const { theme } = useTheme();
  const { width } = useScreenSize();

  return (
    <a
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      href={link}
      target={blankTarget ? "__blank" : ""}
      className="transition-colors flex"
      style={{ color: hover ? theme.secondary : theme.accent }}
    >
      <Icon size={width && width > 640 ? 30 : 20} />
      {label && <span>{label}</span>}
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

  const copyContact = async (copyText: string, copyAlert: string) => {
    await navigator.clipboard.writeText(copyText);
    toast(copyAlert, { duration: 1000, position: "bottom-center" });
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
            <li className="md:mx-8 mx-2 mb-2">
              <details className="dropdown">
                <summary
                  style={{
                    color: theme?.accent,
                    listStyleType: "none",
                  }}
                  className="cursor-pointer sm:text-2xl text-md tracking-wider focus:outline-none transition-colors"
                >
                  contact
                </summary>
                <ul
                  style={{
                    borderTop: "none",
                    backgroundColor: theme?.primary,
                    color: theme?.accent,
                    listStyleType: "none",
                  }}
                  className="menu shadow-white dropdown-content z-[1]"
                >
                  <li>
                    <IconLink
                      link="tel:403-502-1394"
                      Icon={FaPhone}
                      blankTarget={false}
                      onClick={async () =>
                        await copyContact("403-502-1394", "Copied phone number")
                      }
                      label="403-502-1394"
                    />
                  </li>
                  <li>
                    <IconLink
                      link="mailto:cdmossing@gmail.com"
                      Icon={FaEnvelope}
                      blankTarget={false}
                      onClick={async () =>
                        await copyContact(
                          "cdmossing@gmail.com",
                          "Copied email!"
                        )
                      }
                      label="cdmossing@gmail.com"
                    />
                  </li>
                  <li>
                    <IconLink
                      link="#"
                      Icon={FaDiscord}
                      blankTarget={false}
                      onClick={async () =>
                        await copyContact("_mawzy", "Copied username!")
                      }
                      label="_mawzy"
                    />
                  </li>
                </ul>
              </details>
            </li>
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
