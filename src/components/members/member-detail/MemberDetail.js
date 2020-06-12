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
import { fetchMemberById } from '../../../redux/actions';
import { getMemberById } from '../../../redux/selectors';

class MemberDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, isServiceAvailable: true, memberAvatarSrc: null, isFormLocked: true, memberData: {} };
    }

    componentDidMount = () => this.findMemberById()

    findMemberById = () => this.props.fetchMemberById(this.props.memberId, this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({
        isServiceAvailable, isLoading: false, memberData: { ...this.props.member },
        memberAvatarSrc: Object.keys(this.props.member).length !== 0 ? require(`../../../assets/${this.props.member.memberAvatarSrc}`) : null
    })

    cancelFormEdit = () => this.setState({ isFormLocked: true, memberData: { ...this.props.member } })

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
            return (<Form.Control as={element.type} rows="2" disabled={element.editable ? this.state.isFormLocked : true}
                onChange={input => this.updateForm(input.target.value, element.field)} value={this.state.memberData[element.field]} />);

        else if (element.type === 'select')
            return (<Form.Control as="select" disabled={element.editable ? this.state.isFormLocked : true} value={this.state.memberData[element.field]}
                onChange={input => this.updateForm(input.target.value, element.field)}>
                {memberSubscriptionTierEnum.map((value, index) => (<option key={index} value={value}>{value}</option>))}
            </Form.Control>);

        else
            return (<Form.Control type={element.type} disabled={element.editable ? this.state.isFormLocked : true}
                onChange={input => this.updateForm(input.target.value, element.field)} value={this.state.memberData[element.field]} />);
    }

    updateForm = (value, type) => this.setState({ memberData: { ...this.props.member, [type]: value } })

    isFormNotValid = () => {
        for (const key of Object.keys(this.state.memberData)) {
            if (this.state.memberData[key] === '')
                return true;
        }
        return false;
    }

    renderMemberDetail = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Memuat data member..." />);

        else if (!this.state.isServiceAvailable)
            return (<CustomAlert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        else if (Object.keys(this.props.member).length === 0)
            return (<CustomAlert alertSymbol={resultNotFoundSymbol} alertText="Data member tidak dapat ditemukan." />);

        return (<Card>
            <Card.Img variant="top" src={this.state.memberAvatarSrc} style={memberAvatarStyle} />
            <Card.Body>
                <Card.Title>Data member {this.props.member.memberId}</Card.Title>
                <Form style={memberDataFormStyle}>
                    {trainerDataField.map((element, index) => (
                        <Form.Group key={index} as={Row}>
                            <Form.Label column sm="4"><strong>{element.name}</strong></Form.Label>
                            <Col sm="8" style={memberDataRowStyle}>{this.renderFormControl(element)}</Col>
                        </Form.Group>))}
                    {this.isFormNotValid() ? (<Alert variant="danger">
                        Form data member tidak valid! Pastikan semua data terisi dengan benar.
                        </Alert>) : null}
                </Form>
                {this.renderFormButton()}
            </Card.Body>
        </Card>);
    }

    render() {
        return (
            <div style={memberDetailStyle}>
                {this.renderMemberDetail()}
            </div>
        );
    }
}

const memberSubscriptionTierEnum = ['Bronze', 'Silver', 'Gold'];

const trainerDataField = [
    { field: 'memberName', name: 'Nama lengkap', type: 'text', editable: false },
    { field: 'memberPlaceOfBirth', name: 'Tempat lahir', type: 'text', editable: false },
    { field: 'memberDateOfBirth', name: 'Tanggal lahir', type: 'date', editable: false },
    { field: 'memberAddress', name: 'Alamat', type: 'textarea', editable: true },
    { field: 'memberMobileNumber', name: 'Nomor telepon', type: 'text', editable: true },
    { field: 'memberEmergencyContact', name: 'Kontak darurat', type: 'textarea', editable: true },
    { field: 'memberOccupation', name: 'Pekerjaan', type: 'text', editable: true },
    { field: 'memberSubscriptionTier', name: 'Jenis member', type: 'select', editable: false },
    { field: 'memberStartDate', name: 'Tgl. member terdaftar', type: 'date', editable: false },
    { field: 'memberExpiryDate', name: 'Tgl. member berakhir', type: 'date', editable: false }
];

const memberDetailStyle = {
    padding: '32px 30%',
};

const memberDataFormStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const memberDataRowStyle = {
    display: 'flex',
    alignItems: 'center'
}

const memberAvatarStyle = {
    width: '160px',
    margin: 'auto',
    marginTop: '24px'
};

function mapStateToProps(state) {
    const member = getMemberById(state);
    return { member };
}

export default connect(mapStateToProps, { fetchMemberById })(MemberDetail);
