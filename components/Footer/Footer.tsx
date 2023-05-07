import { useTheme } from "@/ThemeContext";
import React from "react";

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      style={{ border: `solid 1px ${theme.secondary}` }}
      className=" border-t h-[10%] flex flex-col justify-center items-center"
    >
      <p style={{ color: theme.accent }} className=" mb-2">
        © {new Date().getFullYear()} Chase Mossing
      </p>
      <p style={{ color: theme.accent }}>Built with ❤️ using Next.js</p>
    </footer>
  );
};
