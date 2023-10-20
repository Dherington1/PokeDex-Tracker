import React from 'react';

// MUI 
import Button from '@mui/material/Button';
import { Container, Box, TextField, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

const Home: React.FC = () => {
  
    const backgroundStyle: React.CSSProperties = {
      backgroundImage: `url('/halloween.png')`,
      backgroundPosition: 'center center', 
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat', 
      backgroundColor: 'rgb(255, 217, 36)',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1 
    }
    
    const supportedGames = [
      'Pokémon Scarlet & Violet Regional Dex', 
      'Pokémon Legends: Arceus Regional Dex',
      'Pokémon Brilliant Diamond & Shining Pearl Regional Dex',
      'Pokémon Sword & Shield (Expansion Pass)',
      'Pokémon Sword & Shield Regional Dex',
      "Pokémon Let's Go, Pikachu & Let's Go, Eevee", 
      'Pokémon Ultra Sun & Ultra Moon', 
      'Pokémon Sun & Moon',
      'Pokémon OMEGA Ruby & ALHPA Sapphire',
      'Pokémon X & Y',
    ]

    // send users to login or register
    const handleButton = (arg: string) => {
      window.location.href = `/${arg}`;
    }

  return (
    <>
     <div style={backgroundStyle}></div>
     <Container 
      component="main" 
      maxWidth="sm" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        height: '100vh' 
      }}
      
     >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
          {/* GENGAR */}
          <img src="gengar-sprit.gif" alt="gengar-sprit" style={{ width: '100px', height: '100px' }} />

          <h1 style={{ color: 'white', margin: '15px', fontSize: '55px', width: '100%', textAlign:'center' }}>POKEDEX TRACKER</h1>
          
          <small style={{color: 'white', margin: '10px 0px 28px 0px '}}>A tool for tacking your Living Dex progress!</small>

          {/* lIST OF GAMES */}
          <ul style={{color: 'white', listStyleType: 'circle', padding: 0, margin: 0 }}>
            {supportedGames.map((games) => (
              <li key={games} style={{color: 'white', marginBottom: '10px' }}><small>{games}</small></li>
            ))}
          </ul>

          {/*  LOGIN AND REGISTER BUTTONS  */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '25px'}} >
            <Button 
              variant="contained"   
              sx={{
                  borderRadius: '2px', 
                  marginTop: '10px',
                  marginBottom: '15px',
                  width: '48%',  
                  padding: '10px',
                  fontWeight: 'bold',
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '2px',
                  },
              }}
              onClick={() => handleButton('register')}
            >
                REGISTER
            </Button>

            <Button 
              variant="contained"   
              sx={{
                  borderRadius: '2px', 
                  marginTop: '10px',
                  marginBottom: '15px',
                  width: '48%', 
                  padding: '10px',
                  fontWeight: 'bold',
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '2px',
                  },
              }}
              onClick={() => handleButton('login')}
            >
              LOGIN
            </Button>
          </Box>


          {/* TEXT  */}
          <small style={{color: 'white', textAlign: 'center', margin: '25px 0px 25px 0px'}}>
            Easily toggle between and track your captured Pokémon and share a public link with others 
            to see how you can help each other out.
          </small>

        </Box>
      </Container>
    </>
  );
}

export default Home;



// import React from 'react';

// // MUI 
// import Button from '@mui/material/Button';
// import { Container, Box, TextField, Typography } from '@mui/material';
// import {Link} from 'react-router-dom';

// const Home: React.FC = () => {
  
//     const backgroundStyle: React.CSSProperties = {
//       backgroundImage: `url('/halloween.png')`,
//       backgroundPosition: 'center center', 
//       backgroundSize: 'cover',
//       backgroundRepeat: 'no-repeat', 
//       height: '100vh',
//       width: '100vw',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       zIndex: -1 
//     }
    
//     const supportedGames = [
//       'Pokémon Scarlet & Violet Regional Dex', 
//       'Pokémon Legends: Arceus Regional Dex',
//       'Pokémon Brilliant Diamond & Shining Pearl Regional Dex',
//       'Pokémon Sword & Shield (Expansion Pass)',
//       'Pokémon Sword & Shield Regional Dex',
//       "Pokémon Let's Go, Pikachu & Let's Go, Eevee", 
//       'Pokémon Ultra Sun & Ultra Moon', 
//       'Pokémon Sun & Moon',
//       'Pokémon OMEGA Ruby & ALHPA Sapphire',
//       'Pokémon X & Y',
//     ]

//     const handleButton = (arg: string) => {
//             window.location.href = `/${arg}`;
//           }

//     return (
//         <>
//         <div style={backgroundStyle}></div>
//         <Container component="main" maxWidth="sm" sx={{ marginTop: '35px', paddingTop: '30px' }}>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     width: '100%',
//                 }}
//             >
//               <img src="gengar-sprit.gif" alt="gengar-sprit" style={{ width: '100px', height: '100px' }} />

//               <h1 style={{ color: 'white', margin: '15px', fontSize: '55px', width: '100%', textAlign:'center' }}>POKEDEX TRACKER</h1>
              
//               <small style={{ color: 'white', margin: '10px 0px 28px 0px ' }}>A tool for tacking your Living Dex progress!</small>

//               <ul style={{ listStyleType: 'circle', padding: 0, margin: 0, color: 'white' }}>
//                 {supportedGames.map((games) => (
//                   <li key={games} style={{ marginBottom: '10px' }}><small>{games}</small></li>
//                 ))}
//               </ul>

//                {/*  LOGIN AND REGISTER BUTTONS  */}
//          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '25px'}} >
//             <Button 
//               variant="contained"   
//               sx={{
//                   borderRadius: '2px', 
//                   marginTop: '10px',
//                   marginBottom: '15px',
//                   width: '48%',  
//                   padding: '10px',
//                   fontWeight: 'bold',
//                   '& .MuiOutlinedInput-root': {
//                       borderRadius: '2px',
//                   },
//               }}
//               onClick={() => handleButton('register')}
//             >
//                 REGISTER
//             </Button>

//             <Button 
//               variant="contained"   
//               sx={{
//                   borderRadius: '2px', 
//                   marginTop: '10px',
//                   marginBottom: '15px',
//                   width: '48%', 
//                   padding: '10px',
//                   fontWeight: 'bold',
//                   '& .MuiOutlinedInput-root': {
//                       borderRadius: '2px',
//                   },
//               }}
//               onClick={() => handleButton('login')}
//             >
//               LOGIN
//             </Button>
//           </Box>


//           {/* TEXT  */}
//           <small style={{textAlign: 'center', margin: '25px 0px 25px 0px'}}>
//             Easily toggle between and track your captured Pokémon and share a public link with others 
//             to see how you can help each other out.
//           </small>
//           <small style={{textAlign: 'center', margin: '25px 0px 25px 0px'}}>
//             This project is open source, and you can find the code on GitHub. Feel free to report issues, 
//             suggest features. 
//           </small>

//         </Box>
//       </Container>
//     </>
//   );
// }

// export default Home;