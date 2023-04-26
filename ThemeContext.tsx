import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface Theme {
  bgPrimary: string;
  bgSecondary: string;
  tertiaryColor: string;
}

interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export type ThemeName = "cyber";
//| "light" | "dark"

const themes: Record<ThemeName, Theme> = {
  cyber: {
    bgPrimary: "#05242F",
    bgSecondary: "#1F2A67",
    tertiaryColor: "#8AE06A",
  },
};

const ThemeContext = React.createContext<ThemeContextProps>({});

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>(themes["cyber"]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
