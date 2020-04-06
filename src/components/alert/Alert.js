import React from 'react';

function Alert(props) {
    return (
        <div style={alertStyle}>
            <h5>
                <img src={props.alertSymbol} style={alertSymbolStyle} alt="alert-symbol" />
                {props.alertText}
            </h5>
        </div>
    );
}

const alertStyle = {
    marginTop: '80px'
};

const alertSymbolStyle = {
    width: '32px',
    marginRight: '8px'
};

export default Alert;
