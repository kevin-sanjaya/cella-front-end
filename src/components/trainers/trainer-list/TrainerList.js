import React from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import { connect } from "react-redux";
import { fetchTrainerList } from "../../../redux/actions";
import { getTrainerList } from "../../../redux/selectors";

class TrainerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trainerName: '', isLoading: true, isServiceAvailable: true };
        this.props.fetchTrainerList(this.apiCallback);
    }

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, trainers: [...this.props.trainers] })

    updateTrainerName = trainerName => this.setState({ trainerName })

    filterTrainerList = () => this.setState({ trainers: this.state.trainerName === '' ? [...this.props.trainers] : [...this.props.trainers.filter(trainer => trainer.trainerName.toLowerCase().includes(this.state.trainerName))] })

    renderTrainerList = () => {
        if (this.state.isLoading)
            return <LoadingSpinner text="Memuat daftar trainer..." />;

        else if (!this.state.isServiceAvailable)
            return <h5 style={warningTextStyle}><img src={serviceNotAvailableSymbol} alt="service-not-available" style={warningSymbolStyle} />
                Mohon maaf, sistem sedang mengalami gangguan.</h5>;

        return <Table hover>
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
                {this.state.trainers.length === 0 ? <td colSpan="5"><h5>Hasil pencarian tidak ditemukan.</h5></td> : null}
                {this.state.trainers.map((trainer, index) => <tr key={index} style={tableRowStyle}>
                    <td>{++index}</td>
                    <td>{trainer.trainerName}</td>
                    <td>{trainer.trainerContractEnd}</td>
                    <td>{trainer.trainerContractHour} Jam</td>
                    <td>{trainer.trainerSpecialization}</td>
                </tr>)}
            </tbody>
        </Table>;
    }

    render() {
        return (
            <div style={trainerListStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan Nama Trainer" value={this.state.trainerName} onChange={input => this.updateTrainerName(input.target.value)} />
                    <InputGroup.Append>
                        <Button variant="primary" onClick={this.filterTrainerList}>Filter Trainer</Button>
                    </InputGroup.Append>
                </InputGroup>

                {this.renderTrainerList()}
            </div>
        );
    }
}

const warningSymbolStyle = {
    width: '32px',
    marginRight: '4px'
};

const trainerListStyle = {
    padding: '32px 25%'
};

const tableRowStyle = {
    cursor: 'pointer'
};

const warningTextStyle = {
    margin: '80px'
};

function mapStateToProps(state) {
    const trainers = getTrainerList(state);
    return { trainers };
}

export default connect(mapStateToProps, { fetchTrainerList })(TrainerList);
