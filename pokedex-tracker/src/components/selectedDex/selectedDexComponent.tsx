import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// file imports
import ProgressBar from '../progressBar/ProgressBar';
import MainCard from '../Cards/mainCard';
import SearchBarComponent from '../searchBar/SearchBarComponent';

// MUI
import { Container, Box } from '@mui/material';

const SelectedDexComponent: React.FC = () => {
    // data from dex 
    const [originalDexData, setOriginalDexData] = useState<any[]>([]);
    const [dexData, setDexData] = useState<any[]>([]); // if searchInput.length = 0 this renders 
    const [pokedexTitle, setDexTitle] = useState<String>('')
    // for progress bar
    const [totalCaught, setTotalCaught] = useState<number>(0);
    const [lengthOfpokeArr, setLengthOfpokeArr] = useState<number>(0);
    // for searching 
    const [searchInput, setSearchInput] = useState<String>(''); // used for if statement in rendering 
    // hiding caught pokemon
    const [hidePokemonState, setHidePokemon] = useState<boolean>(false);

    // change from search bar
    const change4Search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchInput(searchTerm);
    
        if (searchTerm.length > 0) {
            const filteredData = originalDexData.filter((pokemon) => 
                pokemon.name.toLowerCase().includes(searchTerm)
            );
            setDexData(filteredData);
        } else {
            setDexData(originalDexData); 
        }
    };

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

            setOriginalDexData(response.data.pokedex); 
            setDexData(response.data.pokedex);   
            setDexTitle(response.data.title);
            
            setTotalCaught(response.data.totalChecked)
            setLengthOfpokeArr(response.data.pokedex.length)

        } catch (error) {
            console.log('SelectedDexComponent (getDexData function) ERROR: ', error);
        }
    }

    // changes box color on click 
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
                setSearchInput('');
                setRefreshFlag(!refreshFlag);
            }

        } catch (error) {
            console.log('changing checked boolean error: ', error);
        }
    }
    useEffect(() => {
        getDexData();
    }, [refreshFlag]);

    // changes for if hidden pokemon check box is clicked
    const handleHidePokemon = (hide: boolean) => {
        setHidePokemon(hide);

        const newData = hide ? originalDexData.filter(poke => !poke.checked) : originalDexData;
        setDexData(newData);
    }
    
    // screen size
    const useWindowSize = () => {
        const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
        useEffect(() => {
            const handleResize = () => {
                setSize({ width: window.innerWidth, height: window.innerHeight });
            };
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        
        return size;
    };
    const { width } = useWindowSize();

    return (
        <>
            <Container component="main" maxWidth="md" sx={{padding: '30px', marginTop: '35px'}}>
                {/* search bar */}
                <SearchBarComponent handleChange={change4Search} handleHidePokemon={handleHidePokemon} />

                <h1 style={{fontWeight: 'bold', textAlign: 'center'}}>{pokedexTitle}</h1>

                {/* progress bar */}
                <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ProgressBar 
                        caught={totalCaught}
                        total={lengthOfpokeArr}
                    /> 
                </div>
            
                {/* pokemon boxes start here */}
                {width > 748 ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >

                    {searchInput.length > 0 || hidePokemonState ? 
                        (
                            <>
                                <div style={{ width: '100%', textAlign: 'left', marginLeft: '6px', marginBottom: '10px'}}>
                                    <h2 style={{marginBottom: '0px'}}>
                                        001 - 030
                                    </h2>
                                </div>
                                    {dexData.map((poke, index) => (
                                        <>
                                            <MainCard 
                                                pokemon={poke.name} 
                                                entryNum={poke.dexNumber} 
                                                displayNum={poke.pokemonId} 
                                                key={poke.name} 
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
                            </>
                        ) : (searchInput.length < 1 ) ?  (
                            <>
                            <div style={{ width: '100%', textAlign: 'left', marginLeft: '6px', marginBottom: '10px'}}>
                                <h2 style={{marginBottom: '0px'}}>
                                    001 - 030
                                </h2>
                            </div>
                            
                            {dexData.map((poke, index) => (
                                <>
                                    <MainCard 
                                        pokemon={poke.name} 
                                        entryNum={poke.dexNumber} 
                                        displayNum={poke.pokemonId} 
                                        key={poke.name} 
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
                        </>
                        ) : (
                            <>
                            </>
                        )
                    }
                </Box>
                ) : ( 
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            width: '100%',
                            flexDirection: 'column'
                        }}
                    >

                        {searchInput.length > 0 || hidePokemonState ? 
                            (
                                <>
                                    <div style={{ width: '100%', textAlign: 'left', marginLeft: '6px', marginBottom: '15px', marginTop: '15px'}}></div>
                                        {dexData.map((poke, index) => (
                                            <>
                                                <MainCard 
                                                    pokemon={poke.name} 
                                                    entryNum={poke.dexNumber} 
                                                    displayNum={poke.pokemonId} 
                                                    key={poke.name} 
                                                    checkStatus={poke.checked} 
                                                    onClick={() => handleCatchPokemon(objectNumber, poke._id, poke.checked)}
                                                />
                                            </>
                                    ))}
                                </>
                            ) : (searchInput.length < 1 ) ?  (
                                <>
                                <div style={{ width: '100%', textAlign: 'left', marginLeft: '6px', marginBottom: '10px'}}>
                                    <h2 style={{marginBottom: '0px'}}>
                                        001 - 030
                                    </h2>
                                </div>
                                
                                {dexData.map((poke, index) => (
                                    <>
                                        <MainCard 
                                            pokemon={poke.name} 
                                            entryNum={poke.dexNumber} 
                                            displayNum={poke.pokemonId} 
                                            key={poke.name} 
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
                            </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </Box>
                )}
            </Container>
        </>
    );
}

export default SelectedDexComponent;