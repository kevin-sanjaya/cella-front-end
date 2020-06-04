import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomAlert from '../../alert/Alert';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import resultNotFoundSymbol from '../../../assets/result-not-found.svg';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import { connect } from 'react-redux';
import { fetchTrainerById } from '../../../redux/actions';
import { getTrainerById } from '../../../redux/selectors';

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
            return (<Button variant="primary" onClick={() => this.setState({ isFormLocked: false })} >Ubah data</Button>);

        return (<div>
            <Button variant="danger" onClick={this.cancelFormEdit}>Batalkan</Button> &nbsp;
            <OverlayTrigger placement="right" overlay={<Tooltip>POST request interactions have been disabled in this demo environment.</Tooltip>}>
                <Button variant="primary" disabled={this.isFormNotValid()}>Simpan data</Button>
            </OverlayTrigger>
        </div>);
    }

    renderFormControl = element => {
        if (element.type === 'textarea')
            return (<Form.Control as={element.type} rows="2" disabled={this.state.isFormLocked}
                onChange={input => this.updateForm(input.target.value, element.field)} value={this.state.trainerData[element.field]} />);

        else if (element.type === 'select')
            return (<Form.Control as="select" disabled={this.state.isFormLocked} value={this.state.trainerData[element.field]}
                onChange={input => this.updateForm(input.target.value, element.field)}>
                {trainerSpecializationEnum.map((value, index) => (<option key={index} value={value}>{value}</option>))}
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
            return (<CustomAlert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        else if (Object.keys(this.props.trainer).length === 0)
            return (<CustomAlert alertSymbol={resultNotFoundSymbol} alertText="Data trainer tidak dapat ditemukan." />);

        return (<Card>
            <Card.Img variant="top" src={this.state.trainerAvatarSrc} style={trainerAvatarStyle} />
            <Card.Body>
                <Card.Title>Data personal trainer {this.props.trainer.trainerId}</Card.Title>
                <Form style={trainerDataFormStyle}>
                    {trainerDataField.map((element, index) => (
                        <Form.Group key={index} as={Row}>
                            <Form.Label column sm="4"><strong>{element.name}</strong></Form.Label>
                            <Col sm="8">{this.renderFormControl(element)}</Col>
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

const trainerSpecializationEnum = ['Angkat beban', 'Instruktur senam', 'Instruktur renang', 'Cardiovascular', 'Badminton'];

const trainerDataField = [
    { field: 'trainerName', name: 'Nama lengkap', type: 'text' },
    { field: 'trainerPlaceOfBirth', name: 'Tempat lahir', type: 'text' },
    { field: 'trainerDateOfBirth', name: 'Tanggal lahir', type: 'date' },
    { field: 'trainerAddress', name: 'Alamat', type: 'textarea' },
    { field: 'trainerMobileNumber', name: 'Nomor telepon', type: 'text' },
    { field: 'trainerEmergencyContact', name: 'Kontak darurat', type: 'textarea' },
    { field: 'trainerContractStart', name: 'Tgl. kontrak mulai', type: 'date' },
    { field: 'trainerContractEnd', name: 'Tgl. kontrak selesai', type: 'date' },
    { field: 'trainerContractHour', name: 'Kuota jam/minggu', type: 'number' },
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
