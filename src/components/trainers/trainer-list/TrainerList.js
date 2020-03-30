import React from 'react';
import Table from 'react-bootstrap/Table';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import { connect } from "react-redux";
import { fetchTrainerList } from "../../../redux/actions";
import { getTrainerList } from "../../../redux/selectors";

class TrainerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, isServiceAvailable: true };
        this.props.fetchTrainerList(this.apiCallback);
    }

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false })

    renderTrainerList = () => {
        if (this.state.isLoading)
            return <LoadingSpinner text="Memuat daftar trainer..." />;

        else if (!this.state.isServiceAvailable)
            return <h5 style={warningTextStyle}>Mohon maaf, sistem sedang mengalami gangguan.</h5>;

        return <Table bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama Lengkap</th>
                    <th>Kontrak Jam/Minggu</th>
                    <th>Lokasi Bertugas</th>
                    <th>Spesialisasi</th>
                </tr>
            </thead>
            <tbody>
                {this.props.trainers.map((trainer, index) => <tr style={tableRowStyle}>
                    <td>{++index}</td>
                    <td>{trainer.trainerName}</td>
                    <td>{trainer.trainerContractHour} Jam</td>
                    <td>{trainer.trainerLocationCode}</td>
                    <td>{trainer.trainerSpecialization}</td>
                </tr>)}
            </tbody>
        </Table>;
    }

    render() {
        return (
            <div style={trainerListStyle}>
                {this.renderTrainerList()}
            </div>
        );
    }
}

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
