import React, { useState, useEffect } from 'react';
// file import 
import BigScreenImageCard from './BigScreenImageCard';
import SmallScreenImageCard from './SmallScreenImageCard';
import './card.css'

// MUI
import Box from '@mui/material/Box';

interface CardProps {
    pokemon: string;
    entryNum: string | number;
    displayNum: string;
    checkStatus: boolean;
    onClick: () => void; 
}

const MainCard: React.FC<CardProps> = ({ pokemon,  entryNum, displayNum, checkStatus, onClick }) => {

    const useWindowSize = () => {
        const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
        
        useEffect(() => {
            const handleResize = () => {
                setSize({ width: window.innerWidth, height: window.innerHeight });
            };
            
            window.addEventListener('resize', handleResize);
            
          // Clean up
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        
        return size;
    };

    const { width } = useWindowSize();

    return (
        <>
            {width < 748 ? (
                checkStatus ? (
                    <Box onClick={onClick} sx={{ minWidth: 140, border: '1.5px #EDEDED solid', marginRight: '0px', backgroundColor: '#ffd924', width: '100%'}} id='card'>
                        <div  style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <SmallScreenImageCard pokemon={pokemon} entryNum={entryNum}/>
                            <p style={{fontSize: '12px', textAlign: 'center', marginRight: '25px', flex:'1'}}>{pokemon}</p>
                            <p style={{fontSize: '12px', textAlign: 'center', marginRight: '25px'}}>#{displayNum}</p>
                        </div>
                    </Box>
                ) : (
                    <Box onClick={onClick}  sx={{ minWidth: 140, border: '1.5px #EDEDED solid', marginRight: '0px', width: '100%'}} id='card'>
                        <div  style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <SmallScreenImageCard pokemon={pokemon} entryNum={entryNum}/>
                            <p style={{fontSize: '12px', textAlign: 'center', marginRight: '25px', flex:'1'}}>{pokemon}</p>
                            <p style={{fontSize: '12px', textAlign: 'center', marginRight: '25px'}}>#{displayNum}</p>
                        </div>
                    </Box>
                )
            ) : (
                checkStatus ? (
                    <Box onClick={onClick} sx={{ minWidth: 140, border: '1.5px #EDEDED solid', marginRight: '0px', backgroundColor: '#ffd924'}} id='card'>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>{pokemon}</p>
                        <BigScreenImageCard pokemon={pokemon} entryNum={entryNum}/>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>#{displayNum}</p>
                    </Box>
                ) : (
                    <Box onClick={onClick}  sx={{ minWidth: 140, border: '1.5px #EDEDED solid', marginRight: '0px'}} id='card'>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>{pokemon}</p>
                        <BigScreenImageCard pokemon={pokemon} entryNum={entryNum}/>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>#{displayNum}</p>
                    </Box>
                )
            )}
        
        </>
    );
}

export default MainCard;