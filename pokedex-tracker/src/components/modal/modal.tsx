import React, { useContext, useState } from 'react';
import axios from 'axios';
import DarkModeContext from '../../utils/DarkModeContext';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Container, TextField} from '@mui/material';


// file import
import MultipleSelect from './MultipleSelect'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #18447d',
  boxShadow: 24,
  p: 4,
};

// used for params 
interface BasicModalProps {
  open: boolean;
  handleClose: () => void;
  userID: String; 
}

export default function BasicModal({ open, handleClose, userID }: BasicModalProps) {
    const darkMode = useContext(DarkModeContext);
    const [generationNumber, setGenerationNumber] = useState<number | null>(null);
    const [title, setTitle] = useState<String>("")

    // logic for adding fetch call to create new dex
    const addGeneration = async (userId: String, generationNumber: number | null) => {
      console.log("userId: ",  userId);
      console.log('userId should = 653ea73dcc47cc9ee48b276d');
      console.log("generationNumber: ",  generationNumber);
      
        try {
          const response = await axios.post(`http://localhost:8080/api/v1/pokedex/addGenerationToUser`, {
            // passed in as a param from profile 
            userId,
            // from input on modal
            title,
            // sent up through the MultipleSelect.tsx
            generationNumber
          });
          console.log(response);
          console.log('Generation added successfully');

          // reload users pokedexes 
          window.location.reload();
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
        <Box  sx={{
            width: {
              xs: '90%', 
              sm: '75%', 
              md: '60%', 
              lg: '20%', 
              xl: '20%',
            },
            ...style, 
          }}
        >

        <h1 style={{textAlign: 'center', color: "#18447d",}}>Create New Dex</h1>
            {/* DEX TITLE */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    width: '100%', 
                    marginBottom: '8px',
                    m: 1,  
                    mt: 3, 
                }}
            >
                <h4 style={{ marginBottom: '0' }}>PokeDex Name</h4>
                <TextField 
                    label="PokeDex Name" 
                    variant="outlined" 
                    fullWidth 
                    margin="none"
                    id="PokeDexName"
                    autoComplete="off"
                    spellCheck={false}
                    required
                    placeholder="pokemon X PokeDex "
                    onChange={(e) => setTitle(e.target.value)}
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
            <h4 style={{ marginBottom: '0', marginLeft: '7px'}}>Choose Game</h4>
            <MultipleSelect 
              setGenerationNumber={setGenerationNumber}
            />



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
                        onClick={(e) => addGeneration(userID, generationNumber)}
                    >
                    Create new Dex 
                    </Button>
                </Box>
        </Box>
      </Modal>
    );
  }
