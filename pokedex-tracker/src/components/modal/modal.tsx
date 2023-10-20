import React, { useContext, useState } from 'react';
import DarkModeContext from '../../utils/DarkModeContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, TextField} from '@mui/material';
import axios from 'axios';
import GenSelectDropDown from './genSelectDropDown'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #18447d',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
    open: boolean;
    handleClose: () => void;
    userID: String; 
}

export default function BasicModal({ open, handleClose, userID }: BasicModalProps) {
    const darkMode = useContext(DarkModeContext);


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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <h1 style={{textAlign: 'center', color: "#18447d",}}>Create New Dex</h1>
            {/* TITLE */}
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
                    // onChange={(e) => setUsername(e.target.value)}
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


            {/* GENERATIONS */}
            <GenSelectDropDown />



            {/* BUTTON */} <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '25px'}} >
                    <Button 
                        variant="contained"   
                        sx={{
                            borderRadius: '2px', 
                            marginTop: '10px',
                            marginBottom: '15px',
                            width: '55%', 
                            padding: '10px',
                            fontWeight: 'bold',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '2px',
                            },
                        }}
                        // onClick={(e) => addGeneration(userID, generationNumber)}
                    >
                    Create new Dex 
                    </Button>
                </Box>
        </Box>
      </Modal>
    );
  }
