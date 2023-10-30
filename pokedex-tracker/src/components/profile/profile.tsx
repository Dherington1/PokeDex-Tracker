import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Container, Box} from '@mui/material';
import BasicModal from '../modal/modal'
import ProgressBar from '../progressBar/ProgressBar';

const Profile: React.FC = () => {

    // user info 
    const [userName, setUsername] = useState<String>("")
    const [userID, setUserID] = useState<String>("")

    // user dex info
    const [dexData, setDexData] = useState<any[]>([]);

    // for modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUserData = async () => {
        try {
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
            
            // get users dex data
            getUserPokeDexData(config, response.data.data.user._id);
        } catch (error) {
            console.log("fetch user data error: ", error);
        }
    }
    const getUserPokeDexData = async (config: object, userID: String) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/pokedex/allUserDexData/${userID}`, config);

          console.log("dexData" , response.data);
          setDexData(response.data)
        } catch (error) {
          console.log("Fetch user pokeDex data error:", error);
        }
    };
      
    useEffect(() => {
        getUserData();
    }, []); 

    // go to selected dex 
    const title2Dex = (username: String, dexTitle: String, objectNumber: String) => {
        window.location.href = `/${username}/${dexTitle}/${objectNumber}`
    }
  

    return (
        <>
            {/* current username */}
            <h1 style={{textAlign: 'center', color: "#18447d",}}>{userName}'s Profile</h1>

            {/* load all pokedexs users has  */}
            {dexData.map((dex, index) => (
                <div key={index} style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 
                        onClick={() => title2Dex(userName, dex.title, dex._id)}
                        style={{marginBottom: '2px', cursor: 'pointer'}}
                    >
                        {dex.title}
                    </h2>

                    <ProgressBar
                        caught={dex.totalChecked}
                        total={dex.pokedex.length}
                    />
               
                </div>
            ))}

            {/* Button to pull up modal */}
            <Container component="main" maxWidth="sm" >
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