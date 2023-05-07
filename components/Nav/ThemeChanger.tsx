import { useTheme } from "@/ThemeContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeChanger = () => {
  const { theme, changeTheme } = useTheme();
  const [hover, setHover] = useState(false);
  const { width } = useScreenSize();

  const toggleTheme = () => {
    if (theme.name == "dark") changeTheme("light");
    else changeTheme("dark");
  };

  const renderIcon = () => {
    const iconSize = width && width > 640 ? 30 : 20;

    if (theme.name == "dark") return <FaSun size={iconSize} />;
    else return <FaMoon size={iconSize} />;
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={toggleTheme}
      style={{ color: hover ? theme.secondary : theme.accent }}
      className="transition-colors"
    >
      {renderIcon()}
    </button>
  );
};
