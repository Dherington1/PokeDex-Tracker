import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Container, Box, TextField, Typography } from '@mui/material';
import BasicModal from '../modal/modal'


const Profile: React.FC = () => {

    const [userName, setUsername] = useState<String>("")
    const [userID, setUserID] = useState<String>("")

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUserData = async () => {
        try {
            // Retrieve the token from local
            const token = localStorage.getItem('token'); 

            // Add token to the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://localhost:8080/api/v1/users/allUserData`, config);
            setUserID(response.data.data.user._id)
            setUsername(response.data.data.user.username);
            console.log("userData: ", response.data.data.user);
        } catch (error) {
            console.log("fetch user data error: ", error);
        }
    }
    useEffect(() => {
        getUserData();
    }, []); 



    const generationNumber = '1'

    const addGeneration = async (userId: String, generationNumber: String) => {
        try {
          const response = await axios.post(`http://localhost:8080/api/v1/pokedex/addGenerationToUser`, {
            userId,
            generationNumber
          });
          console.log(response);
          console.log('Generation added successfully');
        } catch (error) {
          console.log('Error adding generation:', error);
        }
    };
    
    return (
        <>
            <h1 style={{textAlign: 'center', color: "#18447d",}}>{userName}'s Profile</h1>

            {/* load all pokedexs users has  */}



            <Container 
                component="main" 
                maxWidth="sm" 
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '25px'}} >
                    <Button 
                        variant="contained"   
                        sx={{
                            borderRadius: '2px', 
                            marginTop: '10px',
                            marginBottom: '15px',
                            width: '40%', 
                            padding: '10px',
                            fontWeight: 'bold',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2px',
                            },
                        }}
                        onClick={handleOpen}
                        // onClick={(e) => addGeneration(userID, generationNumber)}
                    >
                    Create new Dex 
                    </Button>
                </Box>
           </Container>

           <BasicModal open={open} handleClose={handleClose} userID={userID}/>
        </>
    );
}

export default Profile;