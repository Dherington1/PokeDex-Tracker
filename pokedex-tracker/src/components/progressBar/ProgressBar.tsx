import React, { useContext, useState, useEffect} from 'react';
import './progressBar.css'
import DarkModeContext from '../../utils/DarkModeContext';
interface BasicModalProps {
    caught: number;
    total: number;
}

const ProgressBar: React.FC<BasicModalProps> = ({ caught, total }) => {
    const darkMode = useContext(DarkModeContext);
    const percentage = ((caught / total) * 100).toFixed(2);
  
    const innerStyle = {
      width: `${percentage}%`,
      height: '26px',
      backgroundColor: '#ffd924'
    };
  
    const textStyle = darkMode ? { color: 'black' } : {};  // This line
    
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
    const handleResize = () => {
        setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
        });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remove the listener when the component is unmounted
    return () => {
        window.removeEventListener('resize', handleResize);
    };
    }, []);

    return (
        <>
            {windowSize.width < 425 ? (
                <div className='outerStyle'>
                    <div className='numbersStyle' style={textStyle}>
                        <b>{percentage}%</b> done!
                    </div>
        
                    <div style={{ width: '100%', height: '20px', backgroundColor: 'white' }}>
                        <div style={innerStyle}></div>
                    </div>
                </div>
            ) : (
                <div className='outerStyle'>
                    <div className='numbersStyle' style={textStyle}>
                        <b>{percentage}%</b> done!
                        <span>
                            {' '}
                            (<b>{caught}</b> caught, <b>{total - caught}</b> to go)
                        </span>
                    </div>
        
                    <div style={{ width: '100%', height: '20px', backgroundColor: 'white' }}>
                        <div style={innerStyle}></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProgressBar;
