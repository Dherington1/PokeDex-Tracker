import React from 'react';
import {useState} from 'react'
// file import 
import ImageCard from './ImageCard';
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
    return (
        <>
            {checkStatus ? (
                <>
                    <Box onClick={onClick} sx={{ minWidth: 140, border: '1.5px #EDEDED solid', marginRight: '0px', backgroundColor: '#ffd924'}} id='card'>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>{pokemon}</p>
                        <ImageCard pokemon={pokemon} entryNum={entryNum}/>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>#{displayNum}</p>
                    </Box>
                </>
            ) : (
                <>
                    <Box onClick={onClick}  sx={{ minWidth: 140, border: '1.5px #EDEDED solid', marginRight: '0px'}} id='card'>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>{pokemon}</p>
                        <ImageCard pokemon={pokemon} entryNum={entryNum}/>
                        <p style={{fontSize: '12px', textAlign: 'center'}}>#{displayNum}</p>
                    </Box>
                </>
            )}
        
        </>
    );
  }
  
  export default MainCard;
  