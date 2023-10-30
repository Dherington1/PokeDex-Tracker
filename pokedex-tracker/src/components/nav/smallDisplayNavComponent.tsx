import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

interface SmallDisplayNavComponentProps {
  Logout: string[];
  LoggedIn: string[];
  loggedInStatus: boolean
}

const SmallDisplayNavComponent: React.FC<SmallDisplayNavComponentProps> = ({ Logout, LoggedIn, loggedInStatus }) => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    // send users to proper page onClick
    const handleUserAccount = (arg: String | null) => {
      console.log('in handle');
      console.log(arg);
      
      if (arg === 'Login' || arg === 'Register') {
        const lowercaseArg = arg.toLowerCase();
        navigate(`/${lowercaseArg}`);

      } else if (arg === 'Logout') {
        localStorage.clear();
        navigate('/login')

      } else if (arg != null) {
        const lowercaseArg = arg.toLowerCase();
        let currentUsername = localStorage.getItem('currentUser')
        navigate(`/${lowercaseArg}/${currentUsername}`);

      } else {
        console.log('hello');
        navigate("/");
      }
    }

    return (
        <>
          {/* burger bar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {loggedInStatus ? 
                    LoggedIn.map((userChoice: string) => (
                      <MenuItem key={userChoice} onClick={handleCloseNavMenu}>
                        <Typography 
                          textAlign="center"
                          onClick={() => handleUserAccount(userChoice)}
                        >
                          {userChoice}
                        </Typography>
                      </MenuItem>
                    ))  
                : 
                    Logout.map((userChoice: string) => (
                      <MenuItem key={userChoice} onClick={handleCloseNavMenu}>
                        <Typography 
                          textAlign="center"
                          onClick={() => handleUserAccount(userChoice)}
                        >
                          {userChoice}
                        </Typography>
                      </MenuItem>
                    ))
                }

              </Menu>
            </Box>

            <Box sx={{ flexGrow: 12 }} />

          {/* middle of nav logo */}
          <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#18447d',
                textDecoration: 'none',
              }}
              onClick={() => handleUserAccount}
            >
              POKEDEX TRACKER
            </Typography>
        </>
    );
}

export default SmallDisplayNavComponent;