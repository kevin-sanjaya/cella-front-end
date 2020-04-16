import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import resultNotFoundSymbol from '../../../assets/result-not-found.svg';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import { connect } from "react-redux";
import { fetchTrainerById } from "../../../redux/actions";
import { getTrainerById } from "../../../redux/selectors";

class TrainerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, isServiceAvailable: true, trainerAvatarSrc: null, isFormLocked: true, trainerData: {} };
    }

    componentDidMount = () => this.findTrainerById()

    findTrainerById = () => this.props.fetchTrainerById(this.props.trainerId, this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({
        isServiceAvailable, isLoading: false, trainerData: { ...this.props.trainer },
        trainerAvatarSrc: Object.keys(this.props.trainer).length !== 0 ? require(`../../../assets/${this.props.trainer.trainerAvatarSrc}`) : null
    })

    cancelFormEdit = () => this.setState({ isFormLocked: true, trainerData: { ...this.props.trainer } })

    renderFormButton = () => {
        if (this.state.isFormLocked)
            return (<Button variant="primary" onClick={() => this.setState({ isFormLocked: false })} >Ubah Data</Button>);

        return (<div>
            <Button variant="danger" onClick={this.cancelFormEdit}>Batalkan</Button> &nbsp;
            <Button variant="primary" disabled={this.isFormNotValid()}>Simpan Data</Button>
        </div>);
    }

    renderFormControl = element => {
        if (element.type === 'textarea')
            return (<Form.Control as={element.type} rows="2" disabled={this.state.isFormLocked}
                onChange={input => this.updateForm(input.target.value, element.field)} value={this.state.trainerData[element.field]} />);

        else if (element.type === 'select')
            return (<Form.Control as="select" disabled={this.state.isFormLocked} value={this.state.trainerData[element.field]} >
                <option value="Angkat Beban">Angkat Beban</option>
                <option value="Instruktur Senam">Instruktur Senam</option>
                <option value="Instruktur Renang">Instruktur Renang</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Badminton">Badminton</option>
            </Form.Control>);

        else
            return (<Form.Control type={element.type} disabled={this.state.isFormLocked}
                onChange={input => this.updateForm(input.target.value, element.field)} value={this.state.trainerData[element.field]} />);
    }

    updateForm = (value, type) => this.setState({ trainerData: { ...this.props.trainer, [type]: value } })

    isFormNotValid = () => {
        for (const key of Object.keys(this.state.trainerData)) {
            if (this.state.trainerData[key] === '')
                return true;
        }
        return false;
    }

    renderTrainerDetail = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Memuat data trainer..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        else if (Object.keys(this.props.trainer).length === 0)
            return (<Alert alertSymbol={resultNotFoundSymbol} alertText="Data trainer tidak ditemukan." />);

        return (<Card>
            <Card.Img variant="top" src={this.state.trainerAvatarSrc} style={trainerAvatarStyle} />
            <Card.Body>
                <Card.Title>Data Trainer {this.props.trainer.trainerId}</Card.Title>
                <Form style={trainerDataFormStyle}>
                    {trainerDataField.map((element, index) => (
                        <Form.Group key={index} as={Row}>
                            <Form.Label column sm="4">{element.name}</Form.Label>
                            <Col sm="8">{this.renderFormControl(element)}
                            </Col>
                        </Form.Group>))}
                        {this.isFormNotValid() ? (<Alert variant="danger">
                            Form data trainer tidak valid! Pastikan semua data terisi dengan benar.
                        </Alert>) : null}
                </Form>
                {this.renderFormButton()}
            </Card.Body>
        </Card>);
    }

    render() {
        return (
            <div style={trainerDetailStyle}>
                {this.renderTrainerDetail()}
            </div>
        );
    }
}

const trainerDataField = [
    { field: 'trainerName', name: 'Nama Lengkap', type: 'text' },
    { field: 'trainerPlaceOfBirth', name: 'Tempat Lahir', type: 'text' },
    { field: 'trainerDateOfBirth', name: 'Tanggal Lahir', type: 'date' },
    { field: 'trainerAddress', name: 'Alamat', type: 'textarea' },
    { field: 'trainerMobileNumber', name: 'Nomor Telepon', type: 'text' },
    { field: 'trainerEmergencyContact', name: 'Kontak Darurat', type: 'textarea' },
    { field: 'trainerContractStart', name: 'Kontrak Mulai', type: 'date' },
    { field: 'trainerContractEnd', name: 'Kontrak Selesai', type: 'date' },
    { field: 'trainerContractHour', name: 'Durasi Jam/Minggu', type: 'number' },
    { field: 'trainerManager', name: 'Manager', type: 'textarea' },
    { field: 'trainerSpecialization', name: 'Spesialisasi', type: 'select' },
];

const trainerDetailStyle = {
    padding: '32px 30%',
};

const trainerDataFormStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const trainerAvatarStyle = {
    width: '160px',
    margin: 'auto',
    marginTop: '24px'
};

function mapStateToProps(state) {
    const trainer = getTrainerById(state);
    return { trainer };
}

export default connect(mapStateToProps, { fetchTrainerById })(TrainerDetail);
