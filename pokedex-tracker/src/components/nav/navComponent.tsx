import * as React from "react";
import { useContext } from "react";
import SmallDisplayNavComponent from "./smallDisplayNavComponent";
import DarkModeContext from "../../utils/DarkModeContext";

// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";

// user account options (right side of nav)
const userAccount = ["LOGIN", "REGISTER"];

const Nav: React.FC = () => {
  // going to fetch logged in status from local storage
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Dark mode
  const { darkTheme, darkMode, setDarkMode } = useContext(DarkModeContext);

  // send users to proper page onClick
  const handleUserAccount = (arg?: string) => {
    console.log("hello");
    if (arg) {
      const lowercaseArg = arg.toLowerCase();
      window.location.href = `/${lowercaseArg}`;
    } else {
      window.location.href = "/";
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {!loggedIn ? (
        <AppBar position="static" sx={{ backgroundColor: "#ffd924" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  color: "#18447d",
                  textDecoration: "none",
                }}
                onClick={() => handleUserAccount()}
              >
                POKEDEX TRACKER
              </Typography>

              {/* small screen component */}
              <SmallDisplayNavComponent />
              {/* middle spacer */}
              <Box sx={{ flexGrow: 20 }} />

              {/* Rightside BOX  */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <div onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? (
                    <>
                      <WbSunnyIcon
                        sx={{
                          color: "#18447d",
                          marginRight: "25px",
                          fontSize: "15px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <NightlightIcon
                        sx={{
                          color: "#18447d",
                          marginRight: "25px",
                          fontSize: "15px",
                        }}
                      />
                    </>
                  )}
                </div>

                {userAccount.map((userAccounts) => (
                  <Button
                    key={userAccounts}
                    onClick={() => handleUserAccount(userAccounts)}
                    sx={{
                      mr: 2,
                      fontWeight: 700,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "Montserrat",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      color: "#18447d",
                      textDecoration: "none",
                    }}
                  >
                    {userAccounts}
                  </Button>
                ))}
              </Box>

              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
              </ThemeProvider>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar position="static">
          {/* if logged in */}
        </AppBar>
      )}
    </ThemeProvider>
  );
};

export default Nav;
