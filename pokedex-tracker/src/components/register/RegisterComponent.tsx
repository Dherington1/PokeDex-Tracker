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

const Register: React.FC = () => {
  const navigate = useNavigate();
  const darkMode = useContext(DarkModeContext);

  // set register variables from user
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // register logic
  const registerLogic = async () => {
    
    // Basic validation (you can make it more comprehensive)
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/register', {
        username,
        email,
        password,
      });
      console.log('User registered:', response.data);
      navigate(`/profile`);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  

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
                        <h4 style={{ marginBottom: '0' }}>Username</h4>
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
                        <h4 style={{ marginBottom: '0' }}>Email</h4>
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
                    <h4 style={{ marginBottom: '0' }}>Password</h4>
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
                    <h4 style={{ marginBottom: '0' }}>Confirm Password</h4>
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
                    <Button
                        variant="contained"
                        sx={{
                          borderRadius: "2px",
                          marginTop: "10px",
                          marginBottom: "15px",
                        }}
                        onClick={registerLogic}
                    >
                        Register
                    </Button>

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
