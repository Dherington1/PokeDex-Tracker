import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// file imports
import ProgressBar from '../progressBar/ProgressBar';
import MainCard from '../Cards/mainCard';

// MUI
import Button from '@mui/material/Button';
import { Container, Box, TextField, Typography } from '@mui/material';

const SelectedDexComponent: React.FC = () => {
    // data from dex 
    const [dexData, setDexData] = useState<any[]>([]);
    const [pokedexTitle, setDexTitle] = useState<String>('')
    // for progress bar
    const [totalCaught, setTotalCaught] = useState<number>(0);
    const [lengthOfpokeArr, setLengthOfpokeArr] = useState<number>(0);

    // get variables from URL
    const { username, dexTitle, objectNumber } = useParams();

    // refresh screen when pokemon is clicked
    const [refreshFlag, setRefreshFlag] = useState(false);


    // get pokemon from selected dex
    const getDexData = async () => {
        try {
            const token = localStorage.getItem('token'); 
    
            // Add token to the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`http://localhost:8080/api/v1/pokedex/selectedDexEntry/${username}/${dexTitle}/${objectNumber}`, config);
            console.log('response in selected: ' , response.data)

            setDexData(response.data.pokedex);
            setDexTitle(response.data.title);
            
            setTotalCaught(response.data.totalChecked)
            setLengthOfpokeArr(response.data.pokedex.length)

        } catch (error) {
            console.log('SelectedDexComponent ERROR: ', error);
        }
    }
    // useEffect(() => {
    //     getDexData();
    // }, []);

    const handleCatchPokemon = async (pokedexId: String | undefined, pokemonId: String, checkedStatus: boolean) => {
        try {
            const token = localStorage.getItem('token'); 
    
            // Add token to the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            console.log(checkedStatus.toString()); 
            
            const response = await axios.put(`http://localhost:8080/api/v1/pokedex/checkPokemon/${pokedexId}/${pokemonId}/${checkedStatus.toString()}`, config)
            if (response.status === 200) {
                setRefreshFlag(!refreshFlag);
            }

        } catch (error) {
            console.log('changing checked boolean error: ', error);
        }
    }
    useEffect(() => {
        getDexData();
    }, [refreshFlag]);
    

    return (
        <>
            <Container component="main" maxWidth="md" sx={{padding: '30px', marginTop: '35px'}}>
                <h1 style={{fontWeight: 'bold', textAlign: 'center'}}>{pokedexTitle}</h1>

                <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ProgressBar 
                        caught={totalCaught}
                        total={lengthOfpokeArr}
                    /> 
                </div>
               
                <div style={{ width: '100%', textAlign: 'left', marginLeft: '6px', marginBottom: '10px'}}>
                    <h2 style={{marginBottom: '0px'}}>
                        001 - 030
                    </h2>
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    {dexData.map((poke, index) => (
                        <>
                            <MainCard 
                                pokemon={poke.name} 
                                entryNum={poke.dexNumber} 
                                displayNum={poke.pokemonId} 
                                key={index} 
                                checkStatus={poke.checked} 
                                onClick={() => handleCatchPokemon(objectNumber, poke._id, poke.checked)}
                            />
                            {(index + 1) % 30 === 0 && (
                                <>
                                    <div style={{ width: '100%', height: '10px', marginTop: '25px', marginBottom: '25px'}}></div>
                                    <div style={{ width: '100%', textAlign: 'left', marginLeft: '6px'}}>
                                        <h2 style={{marginBottom: '10px'}}>
                                            {(index + 2) < 100 ? `0${index + 2}` : index + 2} - {(index + 31) < 100 ? `0${index + 31}` : index + 31}
                                        </h2>
                                    </div>
                                </>
                            )}
                        </>
                    ))}
                </Box>
            </Container>
        </>
    );
}

export default SelectedDexComponent;