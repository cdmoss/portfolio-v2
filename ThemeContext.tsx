import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export type ThemeName = "cyber";
//| "light" | "dark"

const themes: Record<ThemeName, Theme> = {
  cyber: {
    primary: "#29244e",
    secondary: "#7effdf",
    accent: "#EFE9F4",
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
