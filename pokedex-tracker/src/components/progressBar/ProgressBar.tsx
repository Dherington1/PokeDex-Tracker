import * as React from 'react';
import './progressBar.css'

interface BasicModalProps {
    caught: number;
    total: number;
}

const ProgressBar: React.FC<BasicModalProps> = ({ caught, total }) => {
    const percentage = ((caught / total) * 100).toFixed(2);
  
    const innerStyle = {
      width: `${percentage}%`,
      height: '26px',
      backgroundColor: '#ffd924'
    };
  
    return (
        <div className='outerStyle'>
            <div className='numbersStyle'>
                <b>{percentage}%</b> done!
                <span>
                    {' '}
                    (<b>{caught}</b> caught, <b>{total - caught}</b> to go)
                </span>
            </div>

            <div style={{width: '100%', height: '20px', backgroundColor: 'white'}}>
                <div style={innerStyle}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
