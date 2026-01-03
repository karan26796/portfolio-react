import React from 'react';
import '../styles/Loader.scss';

const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
