import * as React from 'react';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// file imports
import DarkModeContext from '../../utils/DarkModeContext';

// MUI
import Button from "@mui/material/Button";
import { Container, Box, TextField, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const darkMode = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // set register variables from user
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // error handling useStates
  const [usedEmail, setUsedEmail] = useState<boolean>(false);
  const [usedUsername, setUsedUsername] = useState<boolean>(false);
  const [notSamePassowrds, setnotSamePassowrds] = useState<boolean>(false);

  // register logic
  const registerLogic = async () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    // check if passwords are the same
    if (password !== confirmPassword) {
        setnotSamePassowrds(true);
        return;
    }

    try {
        const response = await axios.post(`${baseUrl}/api/v1/users/register`, {
            username,
            email,
            password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data._id);
        localStorage.setItem('currentUser', username)   
        navigate(`/profile/${username}`);

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.data.message === "Email already exists") {
                setUsedEmail(true);
            } else if (error.response.data.message === 'Username already exists') {
                setUsedUsername(true);
            }
            console.error(error);
        } else {
            // Handle unexpected errors
            console.error('An unexpected error occurred', error);
        }
    }
};
  
    // check if username length is okay
        // must be unique
    // make sure email was inputed 
        // must be unique
    // make sure password and confirm password are the same  
        // minlength: 5

  return (
    <>
        <Container component="main" maxWidth="xs" sx={{padding: '30px', marginTop: '35px'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{color: '#18447d', fontWeight: 'bold'}}>
                        Register
                    </Typography>
                    
                    {/* username */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-start', 
                            width: '100%', 
                            marginBottom: '8px'
                        }}
                    >
                        {!usedUsername
                         ? (<><h4 style={{ marginBottom: '0' }}>Username</h4></>)
                         : (<><h4 style={{ marginBottom: '0', color: 'red' }}>Username: Already taken</h4></>)
                        }
                        <TextField 
                            label="Username" 
                            variant="outlined" 
                            fullWidth 
                            margin="none"
                            id="username"
                            autoComplete="off"
                            spellCheck={false}
                            required
                            placeholder="pokemonMaster06"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '2px',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkMode ? 'lightgray' : undefined,
                                },
                                '& .MuiOutlinedInput-input': {
                                    backgroundColor: darkMode ? 'rgba(211, 211, 211, 0.1)' : undefined,
                                },
                                marginTop: '3px',
                            }}
                        />
                    </Box>


                    {/* email */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-start', 
                            width: '100%', 
                            marginBottom: '8px'
                        }}
                        >
                        {!usedEmail 
                         ? (<><h4 style={{ marginBottom: '0' }}>Email</h4></>)
                         : (<><h4 style={{ marginBottom: '0', color: 'red' }}>Email: Already taken</h4></>)
                        }
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            fullWidth 
                            margin="none"
                            id="email"
                            autoComplete="off"
                            spellCheck={false}
                            required
                            placeholder="pokemonMaster06@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '2px',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkMode ? 'lightgray' : undefined,
                                },
                                '& .MuiOutlinedInput-input': {
                                    backgroundColor: darkMode ? 'rgba(211, 211, 211, 0.1)' : undefined,
                                },
                                marginTop: '3px',
                            }}
                        />
                    </Box>

                    
                    {/* password */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-start', 
                            width: '100%', 
                            marginBottom: '8px'
                        }}
                    >
                    {!notSamePassowrds
                        ? (<><h4 style={{ marginBottom: '0' }}>Password</h4></>)
                        : (<><h4 style={{ marginBottom: '0', color: 'red' }}>Password: Does not match</h4></>)
                    }
                    <TextField 
                        label="Password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        id="password"
                        type="password"
                        required
                        placeholder="************" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: darkMode ? 'lightgray' : undefined,
                            },
                            '& .MuiOutlinedInput-input': {
                                backgroundColor: darkMode ? 'rgba(211, 211, 211, 0.1)' : undefined,
                            },
                            marginTop: '3px',
                        }}
                    />
                    </Box>

                    {/*confirm  password */}
                     <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-start', 
                            width: '100%', 
                            marginBottom: '8px'
                        }}
                    >
                    {!notSamePassowrds
                        ? (<><h4 style={{ marginBottom: '0' }}>Confirm Password</h4></>)
                        : (<><h4 style={{ marginBottom: '0', color: 'red' }}>Confirm Password: Does not match</h4></>)
                    }
                    <TextField 
                        label="Confirm Password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        id="password"
                        type="password"
                        required
                        placeholder="************" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: darkMode ? 'lightgray' : undefined,
                            },
                            '& .MuiOutlinedInput-input': {
                                backgroundColor: darkMode ? 'rgba(211, 211, 211, 0.1)' : undefined,
                            },
                            marginTop: '3px',
                        }}
                    />
                    </Box>

                    {/* button */}
                    {isLoading ? (
                        <><CircularProgress /></>
                    ) : (
                        <>
                            <Button 
                                variant="contained"   
                                sx={{
                                    borderRadius: '2px', 
                                    marginTop: '10px',
                                    marginBottom: '15px'
                                }}
                                onClick={registerLogic}
                            >
                                Register
                            </Button>
                        </>
                    )}

                    <small>
                        Already have an account? 
                        <Link to={"/login"}> Login here!</Link>
                    </small>
                </Box>
            </Container>
    </>
  );
};

export default Register;
