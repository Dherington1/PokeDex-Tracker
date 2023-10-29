import React from 'react';
// import './Card.css';

// Define the props type
interface CardProps {
  pokemon: string;
  entryNum: string | number;
}

const ImageCard: React.FC<CardProps> = ({ pokemon,  entryNum }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img 
          src={`/pokemon/${entryNum}.png`} 
          alt="pokemon" 
          key={pokemon}
          style={{cursor: 'pointer', width:' 68px'}}
      />
    </div>
  );
}

export default ImageCard;
