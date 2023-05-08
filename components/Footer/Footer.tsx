import { useTheme } from "@/ThemeContext";
import React from "react";

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        borderTop: `solid 1px ${theme.secondary}`,
        backgroundColor: theme.primary,
      }}
      className="h-[10%] flex flex-col justify-center items-center z-10 absolute left-0 right-0 bottom-0"
    >
      <p style={{ color: theme.accent }} className=" mb-2">
        © {new Date().getFullYear()} Chase Mossing
      </p>
      <p style={{ color: theme.accent }}>Built with ❤️ using Next.js</p>
    </footer>
  );
};
