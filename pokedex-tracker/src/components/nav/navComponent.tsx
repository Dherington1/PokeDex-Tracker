import * as React from "react";
import { useContext, useEffect } from "react";
import SmallDisplayNavComponent from "./smallDisplayNavComponent";
import DarkModeContext from "../../utils/DarkModeContext";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // going to fetch logged in status from local storage
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState<String | null>('')

  // Dark mode
  const { darkTheme, darkMode, setDarkMode } = useContext(DarkModeContext);
  // send users to proper page onClick
  const handleUserAccount = (arg?: string) => {
    if (arg) {
      const lowercaseArg = arg.toLowerCase();
      navigate(`/${lowercaseArg}`);
    } else {
      navigate("/");
    }
  };
  
  // for logged in users to go to their profile
  const handleUserProfile = (arg: String | null) => {
    if (arg != null) {
      const lowercaseArg = arg.toLowerCase();
      navigate(`/profile/${lowercaseArg}`);
    } 
  }

  // check if user is logged in
  const checkLoggedIn = () => {
    let userToken = localStorage.getItem('token')
    let currentUsername = localStorage.getItem('currentUser')
    
    if (userToken !== null) {
      setLoggedIn(true)
      setUsername(currentUsername?.toLocaleUpperCase() ?? null);
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])

  // logout user 
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login')
  }
  
  // choices for burger menu
  const loggedInUserChoices = ['Profile', 'Logout'];
  const loggedOutUserChoices = ['Login', 'Register'];

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
              <SmallDisplayNavComponent Logout={loggedOutUserChoices} LoggedIn={loggedInUserChoices} loggedInStatus={loggedIn}/>
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
        <AppBar position="static" sx={{ backgroundColor: "#ffd924" }}>
          {/* if logged in */}
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
              <SmallDisplayNavComponent Logout={loggedOutUserChoices} LoggedIn={loggedInUserChoices} loggedInStatus={loggedIn} />
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

                {/* username and signout */}
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
                  onClick={() => handleUserProfile(username)}
                >
                  {username}
                </Typography>

                <Button
                    onClick={() => handleLogOut()}
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
                    Logout
                </Button>
              </Box>

              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
              </ThemeProvider>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </ThemeProvider>
  );
};

export default Nav;
