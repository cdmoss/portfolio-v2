import { ThemeContext } from '@/ThemeContext';
import { NAV_ITEMS, NavItem } from '@/pages';
import { useState, useRef, useEffect, useContext } from 'react';

interface NavProps {
  activePage: NavItem
  setActivePage: (index: NavItem) => void 
}

interface ItemPosition {
  left: number;
  width: number;
}

const pageIndex = (item: NavItem) => NAV_ITEMS.indexOf(item) 

const navNames: Record<NavItem, string> = {
  'work': "Work",
  'name': "CM",
  "contact": "Contact"
}

const Nav: React.FC<NavProps> = ({activePage, setActivePage}) => {
  const [navReady, setNavReady] = useState(false);
  const [itemPositions, setItemPositions] = useState<ItemPosition[]>([]);
  const navRef = useRef<HTMLUListElement | null>(null);

  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    if (navRef.current) {
      if (!navReady) {
        setNavReady(true);
      } else {
        const containerLeft = navRef.current.getBoundingClientRect().left;
        const positions = Array.from(navRef.current.children).map(
          (item) => ({left: item.getBoundingClientRect().left - containerLeft, width: item.getBoundingClientRect().width })
        );
        console.log(positions)
        setItemPositions(positions);
      }
    }
  }, [navReady]);

  return (
    <nav className="sticky top-0 z-10 h-[10%]" style={{borderBottom: `2px solid ${theme?.secondary}`}}>
      <div className='flex h-full items-center justify-center'>
        <ul className="flex flex-row justify-center items-center relative" ref={navRef}>
           {NAV_ITEMS.map((item, index) => (
            <li key={index} className="mx-8 mb-3">
              <button
                style={{color: activePage == item ? theme?.secondary : theme?.accent, transition: "color .2s linear 0s"}}
                className="text-lg font-semibold tracking-wider focus:outline-none"
                onClick={() => setActivePage(item)}
              >
                {navNames[item]}
              </button>
            </li>
          ))}
          <li
            className="absolute left-0 bottom-0 h-1 transition-all duration-300"
            style={{
              backgroundColor: theme?.secondary,
              width: itemPositions[pageIndex(activePage)]?.width,
              transform:
                itemPositions.length > 0 ? `translateX(${itemPositions[pageIndex(activePage)]?.left}px)` : 'translateX(0)',
            }}
          ></li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Nav;