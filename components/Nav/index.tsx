import { useState, useRef, useEffect } from 'react';

interface NavProps {
  onNavClick: (index: number) => void
}

interface ItemPosition {
  left: number;
  width: number;
}

const Nav: React.FC<NavProps> = ({onNavClick}) => {
  const [selected, setSelected] = useState(0);
  const [navReady, setNavReady] = useState(false);
  const [itemPositions, setItemPositions] = useState<ItemPosition[]>([]);
  const navRef = useRef<HTMLUListElement | null>(null);

  const navItems = ['Work', 'Chase Mossing', 'Contact'];

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

  const handleNavClick = (index: number) => {
    setSelected(index)
    onNavClick(index)
  }

  return (
    <nav className="sticky top-0 z-10 py-4 bg-white">
      <div className="container mx-auto">
        <ul className="flex flex-row justify-center items-center relative" ref={navRef}>
           {navItems.map((item, index) => (
            <li key={index} className="mx-8 mb-1">
              <button
                className="text-lg font-semibold tracking-wider focus:outline-none"
                onClick={() => handleNavClick(index)}
              >
                {item}
              </button>
            </li>
          ))}
          <li
            className="absolute left-0 bottom-0 h-1 bg-black transition-all duration-300"
            style={{
              width: itemPositions[selected]?.width,
              transform:
                itemPositions.length > 0 ? `translateX(${itemPositions[selected]?.left}px)` : 'translateX(0)',
            }}
          ></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;