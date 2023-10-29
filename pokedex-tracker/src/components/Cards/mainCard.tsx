import React from 'react';

// file import 
import ImageCard from './ImageCard';

// MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CardProps {
    pokemon: string;
    entryNum: string | number;
    displayNum: string
}

const MainCard: React.FC<CardProps> = ({ pokemon,  entryNum, displayNum }) => {
    
    return (
        <Box sx={{ minWidth: 140, border: '1px #EDEDED solid', marginRight: '0px'}}>
            <p style={{fontSize: '12px', textAlign: 'center'}}>{pokemon}</p>
            <ImageCard pokemon={pokemon} entryNum={entryNum}/>
            <p style={{fontSize: '12px', textAlign: 'center'}}>#{displayNum}</p>
        </Box>
    );
  }
  
  export default MainCard;
  