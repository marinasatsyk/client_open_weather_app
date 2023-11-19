import { useMemo, useState } from "react";
import { createContext } from "vm";

export const tokensTheme = (mode: string) => ({
  ...(mode === "dark"
    ? {
        mainBlue: {
          DEFAULT: "#11315C",
          50: "#4887DD",
          100: "#367CDA",
          200: "#2468C3",
          300: "#1E56A1",
          400: "#17437E",
          500: "#11315C",
          600: "#08182D",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#FFFFFF",
          600: "#E3E3E3",
          700: "#C7C7C7",
          800: "#ABABAB",
          900: "#8F8F8F",
          950: "#818181",
        },
        gray: {
          DEFAULT: "#868794",
          50: "#E7E8EA",
          100: "#DDDDE1",
          200: "#C7C7CD",
          300: "#B1B2BA",
          400: "#9C9CA7",
          500: "#868794",
          600: "#6A6B78",
          700: "#50505A",
          800: "#35363C",
          900: "#1B1B1F",
          950: "#0E0E10",
        },
        graphFuchsia: {
          DEFAULT: "#CB33D8",
          50: "#F2CDF5",
          100: "#EEBCF2",
          200: "#E59AEC",
          300: "#DC78E5",
          400: "#D455DF",
          500: "#CB33D8",
          600: "#A622B1",
          700: "#7A1982",
          800: "#4E1053",
          900: "#210724",
          950: "#0B020C",
        },
        graphBlue: {
          DEFAULT: "#3389D8",
          50: "#CDE2F5",
          100: "#BCD8F2",
          200: "#9AC4EC",
          300: "#78B1E5",
          400: "#559DDF",
          500: "#3389D8",
          600: "#226CB1",
          700: "#195082",
          800: "#103353",
          900: "#071624",
          950: "#02070C",
        },
        graphYellow: {
          DEFAULT: "#F2C94C",
          50: "#FEFDF7",
          100: "#FDF7E4",
          200: "#FAEBBE",
          300: "#F8E098",
          400: "#F5D472",
          500: "#F2C94C",
          600: "#EEB918",
          700: "#C0940E",
          800: "#8C6C0A",
          900: "#574306",
          950: "#3D2F04",
        },
        graphGreen: {
          DEFAULT: "#24C38E",
          50: "#AEF0DA",
          100: "#9DEDD2",
          200: "#7BE7C3",
          300: "#58E0B3",
          400: "#36DAA3",
          500: "#24C38E",
          600: "#1B946C",
          700: "#136449",
          800: "#0A3527",
          900: "#010604",
          950: "#000000",
        },
        red: {
          DEFAULT: "#F90A0A",
          50: "#FDBDBD",
          100: "#FDA9A9",
          200: "#FC8181",
          300: "#FB5A5A",
          400: "#FA3232",
          500: "#F90A0A",
          600: "#C60505",
          700: "#8F0404",
          800: "#590202",
          900: "#220101",
          950: "#060000",
        },
      }
    : {
        mainBlue: {
          DEFAULT: "#11315C",
          50: "#000000",
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#08182D",
          500: "#11315C",
          600: "#17437E",
          700: "#1E56A1",
          800: "#2468C3",
          900: "#367CDA",
          950: "#4887DD",
        },
        white: {
          DEFAULT: "#FFFFFF",
          50: "#818181",
          100: "#8F8F8F",
          200: "#ABABAB",
          300: "#C7C7C7",
          400: "#E3E3E3",
          500: "#FFFFFF",
          600: "#FFFFFF",
          700: "#FFFFFF",
          800: "#FFFFFF",
          900: "#FFFFFF",
          950: "#FFFFFF",
        },
        gray: {
          DEFAULT: "#868794",
          50: "#0E0E10",
          100: "#1B1B1F",
          200: "#35363C",
          300: "#50505A",
          400: "#6A6B78",
          500: "#868794",
          600: "#9C9CA7",
          700: "#B1B2BA",
          800: "#C7C7CD",
          900: "#DDDDE1",
          950: "#E7E8EA",
        },
        graphFuchsia: {
          DEFAULT: "#CB33D8",
          50: "#0B020C",
          100: "#210724",
          200: "#4E1053",
          300: "#7A1982",
          400: "#A622B1",
          500: "#CB33D8",
          600: "#D455DF",
          700: "#DC78E5",
          800: "#E59AEC",
          900: "#EEBCF2",
          950: "#F2CDF5",
        },
        graphBlue: {
          DEFAULT: "#3389D8",
          50: "#02070C",
          100: "#071624",
          200: "#103353",
          300: "#195082",
          400: "#226CB1",
          500: "#3389D8",
          600: "#559DDF",
          700: "#78B1E5",
          800: "#9AC4EC",
          900: "#BCD8F2",
          950: "#CDE2F5",
        },
        graphYellow: {
          DEFAULT: "#F2C94C",
          50: "#3D2F04",
          100: "#574306",
          200: "#8C6C0A",
          300: "#C0940E",
          400: "#EEB918",
          500: "#F2C94C",
          600: "#F5D472",
          700: "#F8E098",
          800: "#FAEBBE",
          900: "#FDF7E4",
          950: "#FEFDF7",
        },
        graphGreen: {
          DEFAULT: "#24C38E",
          50: "#000000",
          100: "#010604",
          200: "#0A3527",
          300: "#136449",
          400: "#1B946C",
          500: "#24C38E",
          600: "#36DAA3",
          700: "#58E0B3",
          800: "#7BE7C3",
          900: "#9DEDD2",
          950: "#AEF0DA",
        },
        red: {
          DEFAULT: "#F90A0A",
          50: "#060000",
          100: "#220101",
          200: "#590202",
          300: "#8F0404",
          400: "#C60505",
          500: "#F90A0A",
          600: "#FA3232",
          700: "#FB5A5A",
          800: "#FC8181",
          900: "#FDA9A9",
          950: "#FDBDBD",
        },
      }),
});

export const ThemeSettings: any = (mode: string) => {
  const colors = tokensTheme(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.mainBlue.DEFAULT,
            },
            secondary: {
              main: colors.gray.DEFAULT,
            },
            neutral: {
              dark: colors.mainBlue[600],
              light: colors.white.DEFAULT,
            },
          }
        : {
            primary: {
              main: colors.white.DEFAULT,
            },
            secondary: {
              main: colors.gray.DEFAULT,
            },
            neutral: {
              dark: colors.mainBlue[600],
              light: colors.white.DEFAULT,
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sansserif"].join(","),
      fontSize: 14,
      fontWeight: 500,
      h1: {
        fontFamily: ["Poppins", "sansserif"].join(","),
        fontSize: 28,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Poppins", "sansserif"].join(","),
        fontSize: 20,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Poppins", "sansserif"].join(","),
        fontSize: 18,
        fontWeight: 600,
      },
      p: {
        fontFamily: ["Poppins", "sansserif"].join(","),
        fontSize: 14,
        fontWeight: 500,
      },
    },
  };
};

export const ColorModeContext: any = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  //we call matherial UI
  // const theme = useMemo(() => createTheme(mode), [mode])
  //retrn [colorMode, theme]
};
