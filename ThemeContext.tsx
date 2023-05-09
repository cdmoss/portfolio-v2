import React, { ReactNode, useContext } from "react";

interface Props {
  children: ReactNode;
}

interface Theme {
  name: ThemeName;
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
}

interface ThemeContextState {
  theme: Theme;
  changeTheme: (theme: ThemeName) => void;
}

export type ThemeName = "dark" | "light";

const themes: Record<ThemeName, Theme> = {
  dark: {
    name: "dark",
    primary: "#031926",
    secondary: "#00FFAB",
    tertiary: "#219F94",
    accent: "#EFE9F4",
  },
  light: {
    name: "light",
    primary: "white",
    secondary: "#005aff",
    tertiary: "#45B1E8",
    accent: "#031926",
  },
};

const ThemeContext = React.createContext<ThemeContextState | undefined>(
  undefined
);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>(themes["dark"]);

  const changeTheme = (name: ThemeName) => {
    setTheme(themes[name]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
