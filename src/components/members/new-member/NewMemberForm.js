import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';
import newMemberAvatar from '../../../assets/mock-avatar-new.svg';

class NewMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberFormData: {}, isWebcamActive: false, isMemberAvatarTaken: false, isFormConsentChecked: false };
    }

    UNSAFE_componentWillMount = () => {
        let memberFormData = {};
        newMemberFormFieldList.map(type => memberFormData[type.field] = this.props.memberData === null ? '' : this.props.memberData[type.field]);
        if (this.props.memberData !== null)
            this.setState({ isMemberAvatarTaken: true, isFormConsentChecked: true });
        this.setState({ memberFormData });
    }

    componentDidUpdate = () => {
        if (this.state.isWebcamActive) {
            setTimeout(function () {
                this.setState({
                    isWebcamActive: false, isMemberAvatarTaken: true,
                    memberFormData: { ...this.state.memberFormData, memberAvatarSrc: 'MOCK_FILE' }
                });
            }.bind(this), 3000)
        }
    }

    updateForm = (value, type) => this.setState({ memberFormData: { ...this.state.memberFormData, [type]: value } })

    renderAvatarFormControl = () => {
        if (this.state.isWebcamActive)
            return (<div><Spinner animation="grow" variant="primary" />&nbsp; Sedang mengambil foto...</div>);

        else if (this.state.isMemberAvatarTaken)
            return (<div><img src={newMemberAvatar} style={newMemberAvatarStyle} alt="new-member-avatar" /><Button variant="danger"
                onClick={() => this.setState({ isWebcamActive: true, memberFormData: { ...this.state.memberFormData, memberAvatarSrc: '' } })}>
                Ambil foto baru</Button></div>);

        return (<OverlayTrigger placement="right" overlay={<Tooltip>Webcam stream API has been disabled in this demo environment.</Tooltip>}>
            <Button variant="primary" onClick={() => this.setState({ isWebcamActive: true })}>Ambil foto melalui webcam</Button>
        </OverlayTrigger>);
    }

    renderFormControl = element => {
        if (element.type === 'textarea')
            return (<Form.Control as={element.type} value={this.state.memberFormData[element.field]}
                onChange={input => this.updateForm(input.target.value, element.field)} />);

        else if (element.type === 'select')
            return (<Form.Control as="select" onChange={input => this.updateForm(input.target.value, element.field)} value={this.state.memberFormData[element.field]}>
                {memberSubscriptionTierEnum.map((value, index) => (<option key={index} value={value}>{value}</option>))}
            </Form.Control>);

        else if (element.type === 'file')
            return this.renderAvatarFormControl();

        return (<Form.Control type={element.type} value={this.state.memberFormData[element.field]}
            onChange={input => this.updateForm(input.target.value, element.field)} />);
    }

    isFormNotValid = () => {
        for (const key of Object.keys(this.state.memberFormData)) {
            if (this.state.memberFormData[key] === '' || this.state.memberFormData[key] === 'Pilih tipe member')
                return true;
        }
        return !this.state.isFormConsentChecked;
    }

    render() {
        return (<Card>
            <Card.Body>
                <Card.Title>Form pendaftaran member baru</Card.Title>
                <Form style={newMemberFormStyle}>
                    {newMemberFormFieldList.map((element, index) => (<Form.Group key={index} as={Row}>
                        <Form.Label column sm="4"><strong>{element.name}</strong></Form.Label>
                        <Col sm="8">{this.renderFormControl(element)}</Col>
                    </Form.Group>))}
                    <Form.Group>
                        <Form.Check checked={this.state.isFormConsentChecked} onChange={event => this.setState({ isFormConsentChecked: event.target.checked })}
                            inline type="checkbox" label="Saya pastikan bahwa data member diatas benar apa adanya." />
                    </Form.Group>
                    {this.isFormNotValid() && this.props.isFormAlreadySubmitted ? (<Alert variant="danger">
                        Form member baru tidak valid! Pastikan semua data terisi dengan benar, foto member telah diambil dan pernyataan telah dicentang.
                    </Alert>) : null}
                </Form>
                <Button variant="primary" disabled={this.isFormNotValid()}
                    onClick={() => this.props.submitRegistrationForm(this.state.memberFormData)}>Proses pendaftaran member</Button>
            </Card.Body>
        </Card>);
    }
}

const memberSubscriptionTierEnum = ['Pilih tipe member', 'Bronze', 'Silver', 'Gold'];

const newMemberFormFieldList = [
    { field: 'memberName', name: 'Nama lengkap', type: 'text' },
    { field: 'memberPlaceOfBirth', name: 'Tempat lahir', type: 'text' },
    { field: 'memberDateOfBirth', name: 'Tanggal lahir', type: 'date' },
    { field: 'memberAddress', name: 'Alamat', type: 'textarea' },
    { field: 'memberMobileNumber', name: 'Nomor telepon', type: 'text' },
    { field: 'memberEmergencyContact', name: 'Kontak darurat', type: 'textarea' },
    { field: 'memberOccupation', name: 'Pekerjaan', type: 'text' },
    { field: 'memberStartDate', name: 'Tgl. member dimulai', type: 'date' },
    { field: 'memberSubscriptionTier', name: 'Jenis member', type: 'select' },
    { field: 'memberAvatarSrc', name: 'Foto member', type: 'file' }
];

const newMemberFormStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const newMemberAvatarStyle = {
    width: '80px',
    marginRight: '16px'
};

export default NewMemberForm;
