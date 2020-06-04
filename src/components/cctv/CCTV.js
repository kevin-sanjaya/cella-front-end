import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from '../alert/Alert';
import cctvSymbol from '../../assets/cctv.svg';

class CCTV extends React.Component {
    constructor(props) {
        super(props);
        this.state = { progress: 0, displayedComponent: null, isProgressFinished: false };
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.setState({ progress: this.state.progress >= 100 ? 100 : this.state.progress + (this.state.progress + 15 === 105 ? 10 : 15) });

            if (this.state.progress === 100)
                setTimeout(function () {
                    this.setState({ isProgressFinished: true, displayedComponent: (<h5 style={warningTextStyle}>This feature has been disabled in this demo environment.</h5>) })
                }.bind(this), 2000);

            if (!this.state.isProgressFinished)
                this.setState({
                    displayedComponent: (<div>
                        <Alert alertSymbol={cctvSymbol} alertText="Memuat koneksi ke server kamera sekuritas..." />
                        <ProgressBar now={this.state.progress} label={`${this.state.progress}%`} />
                    </div>)
                });
        }, 800);
    }

    componentWillUnmount = () => clearInterval(this.interval)

    render() {
        return (
            <div style={securityCameraFrameStyle}>
                {this.state.displayedComponent}
            </div>
        );
    }
}

const securityCameraFrameStyle = {
    padding: '5% 25%'
};

const warningTextStyle = {
    marginTop: '80px'
}

export default CCTV;
