import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Container, Box, styled} from '@mui/material';
import BasicModal from '../modal/modal'
import ProgressBar from '../progressBar/ProgressBar';

// mui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProfileComponent: React.FC = () => {

    // user info 
    const [userName, setUsername] = useState<String | null>('')
    const [userID, setUserID] = useState<string | null>("")

    // user dex info
    const [dexData, setDexData] = useState<any[]>([]);

    // for modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // URL for fetches
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    // const getUserData = async () => {
    //     try {
    //         const currentUsername = localStorage.getItem('currentUser');
    //         const token = localStorage.getItem('token'); 
    //         const userId= localStorage.getItem('user_id');

    //         // Add token to the Authorization header
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         };

    //         const response = await axios.get(`${baseUrl}/api/v1/users/allUserData`, config);
            
    //         if (response.data && response.data.data && response.data.data.user) {
    //             setUserID(response.data.data.user._id);
    //             setUsername(currentUsername);
    //             getUserPokeDexData(config, response.data.data.user._id);
    //         } else {
    //             console.error('Unexpected response structure:', response);
    //         }

    //         console.log('response.data.data.user: ' , response.data.data.user);
    //         console.log('response.data.data.user._id: ', response.data.data.user._id);
            
    //         setUserID(response.data.data.user._id)
    //         setUsername(currentUsername);
            
    //         get users dex data
    //         getUserPokeDexData(config, userId);
            
    //     } catch (error) {
    //         console.error("fetch user data error: ", error);
    //         if (error instanceof Error) {
    //             console.log("Error message:", error.message);

    //             // If the error is an Axios error
    //             if (axios.isAxiosError(error)) {
    //                 console.log("Error response data:", error.response?.data);
    //                 console.log("Error response status:", error.response?.status);
    //                 console.log("Error response headers:", error.response?.headers);
    //             } 
    //         } else {
    //             console.log("An unknown error occurred:", error);
    //         }
    //     }
    // }

    const getUserPokeDexData = async () => {
        try {
            const currentUsername = localStorage.getItem('currentUser');
            const token = localStorage.getItem('token'); 
            const userId= localStorage.getItem('user_id');
            setUserID(userId)
            // Add token to the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            setUsername(currentUsername);

            const response = await axios.get(`${baseUrl}/api/v1/pokedex/allUserDexData/${userId}`, config);
            setDexData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
                // Handle the case where no Pokedex data is found
                console.log("No Pokedex data found for user:", userID);
                setDexData([]); // Set the state to an empty array to indicate no data
            } else {
                console.log("Fetch user Pokedex data error:", error);
            }
        }
    };

    useEffect(() => {
        getUserPokeDexData();
    }, []); 

    // go to selected dex 
    const title2Dex = (username: String|null, dexTitle: String, objectNumber: String) => {
        window.location.href = `/${username}/${dexTitle}/${objectNumber}`
    }

    // mui styling for delete button
    const SmallIcon = styled(DeleteForeverIcon)({
        fontSize: '18px', 
        color: 'red', 
        marginLeft: '10px',
        marginTop: '12px'
    });

    // delete a dex entry
    const deleteDex = async (objectNumber: String) => {
        console.log(objectNumber);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await axios.delete(`${baseUrl}/api/v1/pokedex/deleteDexEntry/${objectNumber}`, config);
            console.log('response for delete data' , response.data);
    
            getUserPokeDexData();
        } catch (err) {
            console.error('Error deleting dex entry:', err);
        }
    }


    return (
        <>
            <Container component="main" maxWidth="lg" >
                {/* current username */}
                <h1 style={{textAlign: 'center', color: "#18447d",}}>{userName}'s Profile</h1>

                {/* load all pokedexs users has  */}
                {dexData.map((dex, index) => (
                    <div key={index} style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        <div style={{justifyContent: 'space-between', display: 'flex',  alignItems: 'center' }}>
                            <h2 
                                onClick={() => title2Dex(userName, dex.title, dex._id)}
                                style={{marginBottom: '6px', cursor: 'pointer', fontSize: '20px'}}
                            >
                                {dex.title} 
                            </h2>

                            <SmallIcon 
                                sx={{cursor: 'pointer'}}
                                onClick={() => deleteDex(dex._id)}
                            />
                        </div>

                        <ProgressBar
                            caught={dex.totalChecked}
                            total={dex.pokedex.length}
                        />
                
                    </div>
                ))}
            </Container>

            {/* Button to pull up modal */}
            <Container component="main" maxWidth="sm" >
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '25px'}} >
                    <Button 
                        variant="contained"   
                        sx={{
                            borderRadius: '2px', 
                            marginTop: '10px',
                            marginBottom: '15px',
                            width: {
                                xs: '55%',  
                                sm: '40%'   
                            },
                            padding: '10px',
                            fontWeight: 'bold',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2px',
                            },
                        }}
                        onClick={handleOpen}
                    >
                    Create new Dex 
                    </Button>
                </Box>
           </Container>

           <BasicModal open={open} handleClose={handleClose} userID={userID}/>
           
        </>
    );
}

export default ProfileComponent;