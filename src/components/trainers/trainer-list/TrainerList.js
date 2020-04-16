import React from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from '../../alert/Alert';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import { connect } from "react-redux";
import { fetchTrainerList } from "../../../redux/actions";
import { getTrainerList } from "../../../redux/selectors";

class TrainerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trainerName: '', isLoading: true, isServiceAvailable: true };
    }

    componentDidMount = () =>this.props.fetchTrainerList(this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, trainers: [...this.props.trainers] })

    updateTrainerName = trainerName => this.setState({ trainerName })

    filterTrainerList = () => {
        let trainers = [...this.props.trainers];
        if (this.state.trainerName !== '')
            trainers = trainers.filter(trainer => trainer.trainerName.toLowerCase().includes(this.state.trainerName.toLowerCase()));
        this.setState({ trainers });
    }

    renderTrainerList = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Memuat daftar trainer..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        return (<Table hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama Lengkap</th>
                    <th>Kontrak Sampai</th>
                    <th>Durasi Kerja/Minggu</th>
                    <th>Spesialisasi</th>
                </tr>
            </thead>
            <tbody>
                {this.state.trainers.length === 0 ? <tr><td colSpan="5"><h5>Hasil pencarian trainer tidak ditemukan.</h5></td></tr> : null}
                {this.state.trainers.map((trainer, index) => <tr key={index} style={tableRowStyle} onClick={() => this.props.history.push(trainer.trainerId)}>
                    <td>{++index}</td>
                    <td>{trainer.trainerName}</td>
                    <td>{trainer.trainerContractEnd}</td>
                    <td>{trainer.trainerContractHour} Jam</td>
                    <td>{trainer.trainerSpecialization}</td>
                </tr>)}
            </tbody>
        </Table>);
    }

    render() {
        return (
            <div style={trainerListStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan Nama Depan/Belakang Trainer" value={this.state.trainerName} onChange={input => this.updateTrainerName(input.target.value)} />
                    <InputGroup.Append>
                        <Button style={clearSearchButtonStyle} onClick={() => this.setState({ trainerName: '' })}>x</Button>
                        <Button variant="primary" onClick={this.filterTrainerList}>Filter Trainer</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.renderTrainerList()}
            </div>
        );
    }
}

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const trainerListStyle = {
    padding: '32px 25%'
};

const tableRowStyle = {
    cursor: 'pointer'
};

function mapStateToProps(state) {
    const trainers = getTrainerList(state);
    return { trainers };
}

export default connect(mapStateToProps, { fetchTrainerList })(TrainerList);
