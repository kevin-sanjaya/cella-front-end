import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import shoesRentalSymbol from '../../../../assets/shoes.svg';
import towellRentalSymbol from '../../../../assets/towel.svg';

class CheckInControlTrainerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainerAvatarSrc: require(`../../../../assets/${this.props.modalData.trainer.trainerAvatarSrc}`),
            checkOutCondition1: false, checkOutCondition2: false, isCheckOutConfirmed: false
        }
    }

    renderCheckOutFormButton = () => {
        if (this.state.isCheckOutConfirmed)
            return (<div>
                <Button variant="danger" onClick={() => this.setState({ isCheckOutConfirmed: false })} style={checkOutModalBodyStyle}>Batalkan</Button> &nbsp;
                <OverlayTrigger placement="right" overlay={<Tooltip>POST request interactions have been disabled in this demo environment.</Tooltip>}>
                    <Button variant="primary" style={checkOutModalBodyStyle}>Konfirmasi cek-out</Button>
                </OverlayTrigger>
            </div>);

        return (<Button variant="primary" style={checkOutModalBodyStyle} onClick={() => this.setState({ isCheckOutConfirmed: true })}
            disabled={!this.state.checkOutCondition1 || !this.state.checkOutCondition2}>Cek-out trainer</Button>);
    }

    render() {
        return (
            <Modal show={this.props.isModalShowed} style={checkOutModalStyle} onHide={() => this.props.hideModal()}>
                <Modal.Header closeButton>
                    <Modal.Title style={checkOutModalTitleStyle}>
                        Detail cek-in {this.props.modalData.trainer.trainerId}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={checkOutModalBodyStyle}>
                    <img src={this.state.trainerAvatarSrc} alt="member-avatar" style={trainerAvatarStyle} />
                    <Table borderless style={tableStyle}>
                        <tbody>
                            <tr>
                                <td><strong>Nomor cek-in</strong></td>
                                <td>{this.props.modalData.checkInEventId}</td>
                            </tr>
                            <tr>
                                <td><strong>Nama trainer</strong></td>
                                <td>{this.props.modalData.trainer.trainerName}</td>
                            </tr>
                            <tr>
                                <td><strong>Spesialisasi</strong></td>
                                <td>{this.props.modalData.trainer.trainerSpecialization}</td>
                            </tr>
                            <tr>
                                <td><strong>Tgl. cek-in</strong></td>
                                <td>{moment(this.props.modalData.checkInEventTimestamp).format("DD/MM/YYYY")}</td>
                            </tr>
                            <tr>
                                <td><strong>Durasi cek-in</strong></td>
                                <td>{this.props.renderCheckInTimestamp(this.props.modalData.checkInEventTimestamp)}</td>
                            </tr>
                            <tr>
                                <td><strong>Nomor loker</strong></td>
                                <td>{this.props.modalData.checkInEventStorageNumber}</td>
                            </tr>
                            <tr>
                                <td><strong>Rental</strong></td>
                                <td>{this.props.modalData.checkInEventProperty.length !== 0 ? this.props.modalData.checkInEventProperty.map((property, index) => (
                                    <img src={property === 'Shoes' ? shoesRentalSymbol : towellRentalSymbol} key={index} style={rentalSymbolStyle} alt="rental-property" />)) : '-'}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <Form.Check inline onChange={checkOutCondition1 => this.setState({ checkOutCondition1 })}
                                        label={`Kunci loker ${this.props.modalData.checkInEventStorageNumber} sudah dikembalikan tanpa kerusakan.`} type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <Form.Check inline onChange={checkOutCondition2 => this.setState({ checkOutCondition2 })}
                                        label="Perlengkapan rental telah dikembalikan tanpa kerusakan." type="checkbox" />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>{this.renderCheckOutFormButton()}</Modal.Footer>
            </Modal>);
    }
}

const checkOutModalStyle = {
    fontFamily: 'Verdana',
    textAlign: 'center'
};

const checkOutModalTitleStyle = {
    fontSize: '18px'
};

const checkOutModalBodyStyle = {
    fontSize: '14px',
};

const trainerAvatarStyle = {
    width: '160px',
    marginBottom: '16px'
};

const rentalSymbolStyle = {
    width: '25px',
    marginRight: '8px'
};

const tableStyle = {
    textAlign: 'left'
};

export default CheckInControlTrainerModal;
