import { Checkbox } from '@mui/material';
import * as React from 'react';
import './searchBar.css'

interface BasicModalProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleHidePokemon: (value: boolean) => void;
}

const SearchBarComponent: React.FC<BasicModalProps> = ({ handleChange, handleHidePokemon }) => {

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div className='inputHolder' >
                    <input 
                        className='searchInput'
                        type='search' 
                        placeholder='Search by name'
                        onChange={handleChange}
                        style={{padding: '7px', width: '100%', borderRadius: '6px'}}
                    />
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Checkbox 
                        onChange={(e) => handleHidePokemon(e.target.checked)}
                    />

                    <h4>Hide Caught Pokemon</h4>
                </div>
            </div>
        </>
    )
}

export default SearchBarComponent;