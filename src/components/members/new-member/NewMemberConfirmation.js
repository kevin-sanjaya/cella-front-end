import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';
import goldSubscriptionSymbol from '../../../assets/gold-member.svg';
import silverSubscriptionSymbol from '../../../assets/silver-member.svg';
import bronzeSubscriptionSymbol from '../../../assets/bronze-member.svg';
import newMemberAvatar from '../../../assets/mock-avatar-new.svg';
import moment from 'moment';

class NewMemberConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isContractUploaded: false, isIdentityDocumentUploaded: false };
    }

    renderMemberSubscriptionSymbol = tier => {
        const src = tier === 'Gold' ? goldSubscriptionSymbol : tier === 'Silver' ? silverSubscriptionSymbol : bronzeSubscriptionSymbol;
        return (<img src={src} style={memberSubscriptionSymbolStyle} alt="member-subscription" />);
    }

    renderMemberData = element => {
        if (element.type === 'date')
            return moment(this.props.memberData[element.field]).format("DD/MM/YYYY");

        else if (element.type === 'file')
            return (<img src={newMemberAvatar} style={newMemberAvatarStyle} alt="new-member-avatar" />);

        return this.props.memberData[element.field];
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Konfirmasi pendaftaran member baru </Card.Title>
                    <Form style={newMemberConfirmationStyle}>
                        <Table bordered striped>
                            <tbody>
                                {memberDataField.map((element, index) => (<tr key={index}>
                                    <td style={columnLabelStyle}><strong>{element.name}</strong></td>
                                    <td>{this.renderMemberData(element)}
                                        {element.field === 'memberSubscriptionTier' ? this.renderMemberSubscriptionSymbol(this.props.memberData[element.field]) : null}</td>
                                </tr>))}
                                <tr>
                                    <td><strong>Kontrak perjanjian member</strong></td>
                                    <td><OverlayTrigger placement="left" overlay={<Tooltip>Upload function has been disabled in this demo environment.</Tooltip>}>
                                        <Button variant="primary" onClick={() => this.setState({ isContractUploaded: true })}>Upload</Button>
                                    </OverlayTrigger>&nbsp; {this.state.isContractUploaded ? 'dummy_contract.jpg' : null}</td>
                                </tr>
                                <tr>
                                    <td><strong>Dokumen identitas member</strong></td>
                                    <td><OverlayTrigger placement="left" overlay={<Tooltip>Upload function has been disabled in this demo environment.</Tooltip>}>
                                        <Button variant="primary" onClick={() => this.setState({ isIdentityDocumentUploaded: true })}>Upload</Button>
                                    </OverlayTrigger>&nbsp; {this.state.isIdentityDocumentUploaded ? 'dummy_identity.jpg' : null}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                    <Button variant="danger" onClick={() => this.props.cancelRegistrationForm()}>Batalkan</Button> &nbsp;
                    <Button variant="primary" onClick={() => this.props.showMemberInvoice()}
                        disabled={!this.state.isContractUploaded || !this.state.isIdentityDocumentUploaded}>Konfirmasi dan proses invoice</Button>
                </Card.Body>
            </Card>);
    }
}

const memberDataField = [
    { field: 'memberName', name: 'Nama lengkap', type: 'text' },
    { field: 'memberPlaceOfBirth', name: 'Tempat lahir', type: 'text' },
    { field: 'memberDateOfBirth', name: 'Tanggal lahir', type: 'date' },
    { field: 'memberAddress', name: 'Alamat', type: 'textarea' },
    { field: 'memberMobileNumber', name: 'Nomor telepon', type: 'text' },
    { field: 'memberEmergencyContact', name: 'Kontak darurat', type: 'textarea' },
    { field: 'memberOccupation', name: 'Pekerjaan', type: 'text' },
    { field: 'memberStartDate', name: 'Tgl. member terdaftar', type: 'date' },
    { field: 'memberSubscriptionTier', name: 'Jenis member', type: 'select' },
    { field: 'memberAvatarSrc', name: 'Foto member', type: 'file' }
];

const columnLabelStyle = {
    width: '220px'
}

const newMemberConfirmationStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const newMemberAvatarStyle = {
    width: '80px',
    marginRight: '16px'
};

const memberSubscriptionSymbolStyle = {
    width: '24px',
    marginLeft: '4px'
};

export default NewMemberConfirmation;
