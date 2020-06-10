import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import shoesRentalSymbol from '../../../assets/shoes.svg';
import towellRentalSymbol from '../../../assets/towel.svg';

class TrainerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trainerAvatarSrc: require(`../../../assets/${props.trainer.trainerAvatarSrc}`), isFormShowed: false, storageNumber: '' };
    }

    updateStorageNumber = storageNumber => this.setState({ storageNumber })

    renderTrainerDataOrCheckInForm = () => {
        if (this.state.isFormShowed)
            return (<Form style={checkInFormStyle}>
                <Form.Group>
                    <Form.Label><strong>Nomor identitas trainer</strong></Form.Label>
                    <Form.Control disabled={true} value={this.props.trainer.trainerId} />
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Nomor loker</strong></Form.Label>
                    <Form.Control placeholder="Masukan nomor loker" value={this.state.storageNumber} onChange={input => this.updateStorageNumber(input.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Check inline type="checkbox" label={<img src={towellRentalSymbol} alt="towell-rental" style={towellRentalSymbolStyle} />} />
                    <Form.Check inline type="checkbox" label={<img src={shoesRentalSymbol} alt="shoes-rental" style={shoesRentalSymbolStyle} />} />
                </Form.Group>
            </Form>);

        return (<Table style={trainerInfoTableStyle}>
            <tbody>
                <tr>
                    <td><strong>Nomor identitas trainer</strong></td>
                    <td>{this.props.trainer.trainerId}</td>
                </tr>
                <tr>
                    <td><strong>Tanggal lahir</strong></td>
                    <td>{moment(this.props.trainer.trainerDateOfBirth).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                    <td style={centeredTableRowStyle}><strong>Spesialisasi</strong></td>
                    <td>{this.props.trainer.trainerSpecialization}</td>
                </tr>
                <tr>
                    <td><strong>Kontrak berlaku sampai</strong></td>
                    <td>{moment(this.props.trainer.trainerContractEnd).format("DD/MM/YYYY")}</td>
                </tr>
            </tbody>
        </Table>);
    }

    renderCheckInFormButton = () => {
        if (this.state.isFormShowed)
            return (<div>
                <Button variant="danger" onClick={() => this.setState({ isFormShowed: false })}>Batalkan</Button> &nbsp;
                <OverlayTrigger placement="right" overlay={<Tooltip>POST request interactions have been disabled in this demo environment.</Tooltip>}>
                    <Button variant="primary" disabled={this.state.storageNumber.length === 0} onClick={this.checkInTrainer}>Konfirmasi cek-in</Button>
                </OverlayTrigger>
            </div>);

        return (<Button variant="primary" onClick={() => this.setState({ isFormShowed: true })}>Cek-in trainer</Button>);
    }

    checkInTrainer = () => {} // TODO: coming soon

    render() {
        return (
            <Card>
                <Card.Img variant="top" src={this.state.trainerAvatarSrc} style={trainerAvatarStyle} />
                <Card.Body>
                    <Card.Title>{this.props.trainer.trainerName}</Card.Title>
                    {this.renderTrainerDataOrCheckInForm()}
                    {this.renderCheckInFormButton()}
                    <h5 style={warningTextStyle}>*Pastikan bahwa data diatas sama dengan data yang tertera di kartu trainer.</h5>
                </Card.Body>
            </Card>);
    }
}

const centeredTableRowStyle = {
    verticalAlign: 'middle'
};

const towellRentalSymbolStyle = {
    width: '32px',
    marginRight: '8px'
};

const shoesRentalSymbolStyle = {
    width: '32px',
    marginLeft: '3px',
    marginRight: '8px'
};

const trainerInfoTableStyle = {
    width: '55%',
    margin: 'auto',
    textAlign: 'left',
    marginBottom: '24px',
    height: '205px'
};

const checkInFormStyle = {
    width: '55%',
    margin: 'auto',
    textAlign: 'left',
    marginBottom: '24px',
    height: '205px'
};

const trainerAvatarStyle = {
    width: '160px',
    margin: 'auto',
    marginTop: '24px'
};

const warningTextStyle = {
    marginTop: '16px',
    fontSize: '18px',
    color: 'red'
};

export default TrainerInfo;
