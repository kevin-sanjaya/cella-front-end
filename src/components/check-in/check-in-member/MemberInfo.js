import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import goldSubscriptionSymbol from '../../../assets/gold-member.svg';
import silverSubscriptionSymbol from '../../../assets/silver-member.svg';
import bronzeSubscriptionSymbol from '../../../assets/bronze-member.svg';

class MemberInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberAvatarSrc: require(`../../../assets/${props.member.memberAvatarSrc}`), isFormShowed: false, storageNumber: '' };
    }

    updateStorageNumber = storageNumber => this.setState({ storageNumber })

    renderMemberSubscriptionSymbol = tier => {
        const src = tier === 'Gold' ? goldSubscriptionSymbol : tier === 'Silver' ? silverSubscriptionSymbol : bronzeSubscriptionSymbol;
        return (<img src={src} style={memberSubscriptionSymbolStyle} alt="member-subscription" />);
    }

    renderMemberDataOrCheckInForm = () => {
        if (this.state.isFormShowed)
            return (<Form style={checkInFormStyle}>
                <Form.Group>
                    <Form.Label><strong>Nomor Identitas Member</strong></Form.Label>
                    <Form.Control disabled={true} value={this.props.member.memberId} />
                </Form.Group>
                <Form.Group>
                    <Form.Label><strong>Nomor Loker</strong></Form.Label>
                    <Form.Control placeholder="Masukan Nomor Loker" value={this.state.storageNumber} onChange={input => this.updateStorageNumber(input.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Check inline type="checkbox" label="Rental Handuk" /> <Form.Check inline type="checkbox" label="Rental Sepatu" />
                </Form.Group>
            </Form>);

        return (<Table style={memberInfoTableStyle}>
            <tbody>
                <tr>
                    <td><strong>Nomor Identitas Member</strong></td>
                    <td>{this.props.member.memberId}</td>
                </tr>
                <tr>
                    <td><strong>Tanggal Lahir</strong></td>
                    <td>{this.props.member.memberDateOfBirth}</td>
                </tr>
                <tr>
                    <td style={centeredTableRowStyle}><strong>Jenis Member</strong></td>
                    <td>{this.props.member.memberSubscriptionTier}
                        {this.renderMemberSubscriptionSymbol(this.props.member.memberSubscriptionTier)}</td>
                </tr>
                <tr>
                    <td><strong>Member Berlaku Sampai</strong></td>
                    <td>{this.props.member.memberExpiryDate}</td>
                </tr>
            </tbody>
        </Table>);
    }

    renderCheckInFormButton = () => {
        if (this.state.isFormShowed)
            return (<div>
                <Button variant="danger" onClick={() => this.setState({ isFormShowed: false })}>Batalkan</Button> &nbsp;
                <Button variant="primary" disabled={this.state.storageNumber.length === 0} onClick={this.checkInMember} >Konfirmasi</Button>
            </div>);

        return (<Button variant="primary" onClick={() => this.setState({ isFormShowed: true })}>Cek-in Member</Button>);
    }

    checkInMember = () => {} // TODO: coming soon

    render() {
        return (
            <Card>
                <Card.Img variant="top" src={this.state.memberAvatarSrc} style={memberAvatarStyle} />
                <Card.Body>
                    <Card.Title>{this.props.member.memberName}</Card.Title>
                    {this.renderMemberDataOrCheckInForm()}
                    {this.renderCheckInFormButton()}
                    <h5 style={warningTextStyle}>*Pastikan bahwa data diatas sama dengan data yang tertera di kartu member.</h5>
                </Card.Body>
            </Card>);
    }
}

const centeredTableRowStyle = {
    verticalAlign: 'middle'
};

const memberSubscriptionSymbolStyle = {
    width: '32px',
    marginLeft: '4px'
};

const memberInfoTableStyle = {
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

const memberAvatarStyle = {
    width: '160px',
    margin: 'auto',
    marginTop: '24px'
};

const warningTextStyle = {
    marginTop: '16px',
    color: 'red'
};

export default MemberInfo;
