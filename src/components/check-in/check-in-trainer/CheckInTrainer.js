import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import TrainerInfo from './TrainerInfo';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import Alert from '../../alert/Alert';
import resultNotFoundSymbol from '../../../assets/result-not-found.svg';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import { connect } from 'react-redux';
import { fetchTrainerById } from '../../../redux/actions';
import { getTrainerById } from '../../../redux/selectors';

class CheckInTrainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trainerId: '', isLoading: false, isServiceAvailable: true, isSearchDirty: false };
    }

    updateTrainerId = trainerId => this.setState({ trainerId })

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, isSearchDirty: true })

    findTrainerById = () => {
        this.setState({ isLoading: true });
        this.props.fetchTrainerById(this.state.trainerId, this.apiCallback);
    }

    renderSearchResult = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Sedang mencari trainer..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        else if (Object.keys(this.props.trainer).length === 0)
            return this.state.isSearchDirty ? (<Alert alertSymbol={resultNotFoundSymbol} alertText="Hasil pencarian trainer tidak ditemukan." />) : null;

        return (<TrainerInfo trainer={this.props.trainer} />);
    }

    render() {
        return (
            <div style={checkInMemberStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan 12-digit nomor identitas trainer" value={this.state.trainerId} onChange={input => this.updateTrainerId(input.target.value)} />
                    <InputGroup.Append>
                        <Button style={clearSearchButtonStyle} onClick={() => this.setState({ trainerId: '' })}>x</Button>
                        <Button variant="primary" onClick={this.findTrainerById} disabled={this.state.trainerId.length === 0}>Cari trainer</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.renderSearchResult()}
            </div>
        );
    }
}

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const checkInMemberStyle = {
    padding: '32px 25%'
};

function mapStateToProps(state) {
    const trainer = getTrainerById(state);
    return { trainer };
}

export default connect(mapStateToProps, { fetchTrainerById })(CheckInTrainer);
