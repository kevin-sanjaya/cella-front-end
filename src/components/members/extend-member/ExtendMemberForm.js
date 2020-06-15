import React from 'react';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import Alert from '../../alert/Alert';
import resultNotFoundSymbol from '../../../assets/result-not-found.svg';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import goldSubscriptionSymbol from '../../../assets/gold-member.svg';
import silverSubscriptionSymbol from '../../../assets/silver-member.svg';
import bronzeSubscriptionSymbol from '../../../assets/bronze-member.svg';
import { connect } from 'react-redux';
import { fetchMemberById } from '../../../redux/actions';
import { getMemberById } from '../../../redux/selectors';

class ExtendMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberId: '', isLoading: false, isServiceAvailable: true, isSearchDirty: false };
    }

    updateMemberId = memberId => this.setState({ memberId })

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, isSearchDirty: true })

    findMemberById = () => {
        this.setState({ isLoading: true });
        this.props.fetchMemberById(this.state.memberId, this.apiCallback);
    }

    renderMemberInfo = () => {
        if (this.state.isLoading)
            return (<div style={loadingStyle}><LoadingSpinner text="Sedang mencari member..." /></div>);

        else if (!this.state.isServiceAvailable)
            return (<div style={loadingStyle}><Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." /></div>);

        else if (Object.keys(this.props.member).length === 0)
            return this.state.isSearchDirty ? (<div style={loadingStyle}><Alert alertSymbol={resultNotFoundSymbol} alertText="Hasil pencarian member tidak ditemukan." /></div>) : null;

        return (
            <div style={memberInfoStyle}>
                <Form.Group as={Row}>
                    <Form.Label column sm="4"><strong>Nama member</strong></Form.Label>
                    <Col sm="8" style={memberDataRowStyle}>{this.props.member.memberName}</Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4"><strong>Jenis member</strong></Form.Label>
                    <Col sm="8" style={memberDataRowStyle}>{this.props.member.memberSubscriptionTier} {this.renderMemberSubscriptionSymbol(this.props.member.memberSubscriptionTier)}</Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4"><strong>Tanggal lahir</strong></Form.Label>
                    <Col sm="8" style={memberDataRowStyle}>{moment(this.props.member.memberDateOfBirth).format("DD/MM/YYYY")}</Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4"><strong>Tgl. member berakhir</strong></Form.Label>
                    <Col sm="8" style={memberDataRowStyle}>{moment(this.props.member.memberExpiryDate).format("DD/MM/YYYY")}</Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4"><strong>Tgl. berakhir baru</strong></Form.Label>
                    <Col sm="8" style={memberDataRowStyle}>{moment(this.props.member.memberExpiryDate).add(6, "months").format("DD/MM/YYYY")}</Col>
                </Form.Group>
                <h5 style={warningTextStyle}>*Pastikan bahwa data diatas sama dengan data yang tertera di kartu member.</h5>
            </div>);
    }

    renderMemberSubscriptionSymbol = tier => {
        const src = tier === 'Gold' ? goldSubscriptionSymbol : tier === 'Silver' ? silverSubscriptionSymbol : bronzeSubscriptionSymbol;
        return (<img src={src} style={memberSubscriptionSymbolStyle} alt="member-subscription" />);
    }

    isFormNotValid = () => {
        return Object.keys(this.props.member).length === 0;
    }

    render() {
        return (<Card>
            <Card.Body>
                <Card.Title>Form perpanjangan member</Card.Title>
                <Form style={extendMemberFormStyle}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4"><strong>Nmr. identitas member</strong></Form.Label>
                        <Col sm="8">
                            <InputGroup size="md">
                                <FormControl placeholder="Nomor identitas member" value={this.state.memberId} onChange={input => this.updateMemberId(input.target.value)} />
                                <InputGroup.Append>
                                    <Button variant="primary" onClick={this.findMemberById} disabled={this.state.memberId.length === 0}>Cari member</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <div>
                        {this.renderMemberInfo()}
                    </div>
                </Form>
                <Button variant="primary" disabled={this.isFormNotValid()} onClick={() => this.props.generateInvoice('invoice')}>Konfirmasi dan proses invoice</Button>
            </Card.Body>
        </Card>);
    }
}

const warningTextStyle = {
    margin: '16px 0',
    fontSize: '18px',
    color: 'red'
};

const extendMemberFormStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const memberInfoStyle = {
    textAlign: 'left'
};

const loadingStyle = {
    margin: '-48px 0 16px 0',
    textAlign: 'center'
};

const memberDataRowStyle = {
    display: 'flex',
    alignItems: 'center'
};

const memberSubscriptionSymbolStyle = {
    width: '32px',
    marginLeft: '4px'
};

function mapStateToProps(state) {
    const member = getMemberById(state);
    return { member };
}

export default connect(mapStateToProps, { fetchMemberById })(ExtendMemberForm);
