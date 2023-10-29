import React, { useContext, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

import DarkModeContext from '../../utils/DarkModeContext';

// MUI
import Button from '@mui/material/Button';
import { Container, Box, TextField, Typography } from '@mui/material';

const Login: React.FC = () => {
    const darkMode = useContext(DarkModeContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const loginLogic = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/login', {
              username,
              password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data._id);
            localStorage.setItem('currentUser', username)

            console.log('User logged:', response.data);
            window.location.href = `/profile/${username}`;
        } catch (error) {
            console.error('login failed:', error);
        }
    }

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
                        Login
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

                    {/* button */}
                    <Button 
                        variant="contained"   
                        sx={{
                            borderRadius: '2px', 
                            marginTop: '10px',
                            marginBottom: '15px'
                        }}
                        onClick={loginLogic}
                    >
                        Login
                    </Button>

                    {/* link to register */}
                    <small> 
                        Don't have an account yet? 
                        <Link to={'/register'}> Register here!</Link>
                    </small>
                </Box>
            </Container>
        </>
    );
}

export default Login;