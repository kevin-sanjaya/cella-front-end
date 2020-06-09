import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CheckInControlTrainerModal from './CheckInControlTrainerModal';
import Alert from '../../../alert/Alert';
import LoadingSpinner from '../../../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../../../assets/service-not-available.svg';
import shoesRentalSymbol from '../../../../assets/shoes.svg';
import towellRentalSymbol from '../../../../assets/towel.svg';

class CheckInControlTrainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trainerName: '', timestamp: null, isModalShowed: false, modalData: null };
    }

    componentDidMount = () => this.interval = setInterval(() => this.setState({ timestamp: new Date().getTime() }), 1000)

    componentWillUnmount = () => clearInterval(this.interval)

    updateTrainerName = trainerName => this.setState({ trainerName })

    renderCheckInTimestamp = timestamp => { //TODO: change to moment.js
        const timestampDifference = Math.abs(this.state.timestamp - new Date(timestamp).getTime()) / 1000;
        const hour = Math.floor(timestampDifference / 3600);
        const minute = Math.floor((timestampDifference % 3600) / 60);
        const second = Math.floor(timestampDifference % 60);
        return `${hour}:${minute}:${second}`;
    }

    renderCheckedInMemberList = () => {
        if (this.props.isLoading)
            return (<LoadingSpinner text="Memuat data trainer yang telah cek-in..." />);

        else if (!this.props.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        return (<Table hover style={tableStyle}>
            <thead>
                <tr>{['No.', 'Nama trainer', 'Tgl. cek-in', 'Durasi cek-in', 'No. loker', 'Rental'].map((value, index) => (<th key={index}>{value}</th>))}</tr>
            </thead>
            <tbody>
                {this.props.checkedInTrainers.length === 0 ? (<tr><td colSpan="6"><h5 style={trainerNotFoundStyle}>Hasil pencarian trainer tidak ditemukan.</h5></td></tr>) : null}
                {this.props.checkedInTrainers.map((trainer, index) => (<tr key={index} style={tableRowStyle} onClick={() => this.setState({ isModalShowed: true, modalData: trainer })}>
                    <td>{++index}</td>
                    <td>{trainer.trainer.trainerName}</td>
                    <td>{moment(trainer.checkInEventTimestamp).format("DD/MM/YYYY")}</td>
                    <td>{this.renderCheckInTimestamp(trainer.checkInEventTimestamp)}</td>
                    <td>{trainer.checkInEventStorageNumber}</td>
                    <td>{trainer.checkInEventProperty.length !== 0 ? trainer.checkInEventProperty.map((property, index) => (
                        <img src={property === 'Shoes' ? shoesRentalSymbol : towellRentalSymbol} key={index} style={rentalSymbolStyle} alt="rental-property" />)) : '-'}
                    </td>
                </tr>))}
            </tbody>
        </Table>);
    }

    render() {
        return (<div>
            <InputGroup className="mb-3" size="md">
                <FormControl placeholder="Masukan nama depan/belakang trainer" value={this.state.trainerName} onChange={input => this.updateTrainerName(input.target.value)} />
                <InputGroup.Append>
                    <Button style={clearSearchButtonStyle} onClick={() => this.setState({ trainerName: '' })}>x</Button>
                    <Button variant="primary" onClick={() => this.props.filterTrainerList(this.state.trainerName)}>Filter trainer</Button>
                </InputGroup.Append>
            </InputGroup>
            {this.renderCheckedInMemberList()}
            {this.state.modalData !== null ? (<CheckInControlTrainerModal modalData={this.state.modalData} isModalShowed={this.state.isModalShowed}
                renderCheckInTimestamp={this.renderCheckInTimestamp} hideModal={() => this.setState({ isModalShowed: false })} />) : null}
        </div>);
    }
}

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const rentalSymbolStyle = {
    width: '25px',
    marginRight: '8px'
};

const tableStyle = {
    textAlign: 'left'
};

const tableRowStyle = {
    cursor: 'pointer',
    textAlign: 'left'
};

const trainerNotFoundStyle = {
    textAlign: 'center'
};

export default CheckInControlTrainer;
