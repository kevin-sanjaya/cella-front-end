import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner(props) {
    return (
        <div style={loadingSpinnerStyle}>
            <Spinner animation="border" variant="primary" />
            <h5 style={textStyle}>{props.text}</h5>
        </div>
    );
}

const loadingSpinnerStyle = {
    margin: '80px'
};

const textStyle = {
    marginTop: '8px'
};

export default LoadingSpinner;
