import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import memberAvatar from '../../assets/mock-avatar.svg';

import { connect } from "react-redux";
import { findMemberByIdMiddleware } from "../../redux/actions";
import { getMemberById } from "../../redux/selectors";

class CheckInMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberId: '' };
    }

    updateMemberId = memberId => this.setState({ memberId });

    findMemberById = () => this.props.findMemberByIdMiddleware(this.state.memberId);

    render() {
        console.log(this.props.member)
        let memberCard = <Card style={memberCardStyle}>
            <Card.Img variant="top" src={memberAvatar} style={memberAvatarStyle} />
            <Card.Body>
                <Card.Title>Gusmana Bakti</Card.Title>
                <Table style={memberInfoStyle} bordered>
                    <tbody>
                        <tr>
                            <td><strong>Nomor Identitas Member</strong></td>
                            <td>501332212102</td>
                        </tr>
                        <tr>
                            <td><strong>Jenis Member</strong></td>
                            <td>Bronze</td>
                        </tr>
                        <tr>
                            <td><strong>Masa Berlaku Member</strong></td>
                            <td>22/12/2020</td>
                        </tr>
                        <tr>
                            <td><strong>Tanggal Lahir</strong></td>
                            <td>15/02/1995</td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="primary" disabled={isMemberNotAllowedToCheckIn()}>Cek-in Member</Button>
                <h5 style={warningTextStyle}>*Jam check-in untuk paket Bronze adalah 06:00 - 12:00</h5>
            </Card.Body>
        </Card>;
        return (
            <div style={bodyStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan Nomor Identitas Member" onChange={input => this.updateMemberId(input.target.value)} />
                    <InputGroup.Append>
                        <Button variant="primary" onClick={this.findMemberById}>Cari Member</Button>
                    </InputGroup.Append>
                </InputGroup>

                {this.props.member !== null && this.props.member !== undefined ? memberCard : ''}
            </div>
        );
    }
}

function isMemberNotAllowedToCheckIn() {
    return true;
}

const warningTextStyle = {
    marginTop: '16px',
    color: 'red'
};

const bodyStyle = {
    padding: '32px 25%'
};

const memberCardStyle = {
    marginTop: '24px'
};

const memberInfoStyle = {
    width: '55%',
    margin: 'auto',
    textAlign: 'left',
    marginBottom: '24px'
};

const memberAvatarStyle = {
    width: '160px',
    margin: 'auto',
    marginTop: '24px'
};

const mapStateToProps = state => {
    const member = getMemberById(state);
    return { member };
};

export default connect(mapStateToProps, { findMemberByIdMiddleware })(CheckInMember);
