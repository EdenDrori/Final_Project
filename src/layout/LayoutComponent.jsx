import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import FooterComponent from "./footer/FooterComponent";
import tmc from "twin-moon-color";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import { blueGrey, amber, teal } from "@mui/material/colors";

const LayoutComponent = ({ children }) => {
  const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.darkTheme);
  const dispatch = useDispatch();

  const themes = tmc({
    "text.headerColor": "!#b219e6",
    "text.headerActive": "#9e165c",
  });
  localStorage.getItem(themes);

  const darkTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);

  const getPrimaryColor = (isDarkTheme) => {
    const shade = isDarkTheme ? 200 : 900;
    return blueGrey[shade];
  };
  const getH4Color = (isDarkTheme) => {
    const shade = isDarkTheme ? 50 : 600;
    return blueGrey[shade];
  };
  const getItemCard = (isDarkTheme) => {
    return isDarkTheme ? blueGrey[500] : "#FFFFFF";
  };
  const getSectionBackground = (isDarkTheme) => {
    return isDarkTheme ? blueGrey[800] : "#FFFFFF";
  };

  const getSecondaryColor = (isDarkTheme) => {
    const shade = isDarkTheme ? 50 : 700;
    return teal[shade];
  };
  const getTextColor = (isDarkTheme) => {
    const shade = isDarkTheme ? 50 : 900;
    return blueGrey[shade];
  };

  const getBackgroundColor = (isDarkTheme) => {
    return isDarkTheme ? blueGrey[900] : blueGrey[50];
  };
  const getInputsColor = (isDarkTheme) => {
    return isDarkTheme ? blueGrey[500] : blueGrey[50];
  };
  const mainTheme = createTheme({
    palette: {
      primary: {
        main: getPrimaryColor(isDarkTheme),
      },
      secondary: {
        main: getSecondaryColor(isDarkTheme),
      },
      background: {
        default: getBackgroundColor(isDarkTheme),
      },
      inputs: {
        default: getInputsColor(isDarkTheme),
      },
      h4: {
        default: getH4Color(isDarkTheme),
      },
      itemCard: {
        default: getItemCard(isDarkTheme),
      },
      sectionBackground: {
        default: getSectionBackground(isDarkTheme),
      },
      text: {
        default: getTextColor(isDarkTheme),
      },
    },
  });

  const handleThemeChange = (checked) => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <ThemeProvider theme={mainTheme}>
        <ThemeProvider
          theme={(theme) => ({
            ...theme,
            components: {
              MuiInputLabel: {
                styleOverrides: {
                  root: {
                    color: theme.palette.primary.main,
                  },
                },
              },
              MuiInputBase: {
                styleOverrides: {
                  root: {
                    color: theme.palette.primary.main,
                  },
                },
              },
              MuiTypography: {
                styleOverrides: {
                  h4: {
                    color: theme.palette.h4.default,
                  },
                },
              },
            },
          })}
        >
          <HeaderComponent
            isDarkTheme={isDarkTheme}
            onThemeChange={handleThemeChange}
          />
          <MainComponent>{children}</MainComponent>
          <FooterComponent />
        </ThemeProvider>
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default LayoutComponent;
