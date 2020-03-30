import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function MemberInfo(props) {
    let avatarSrc = require(`../../../assets/${props.member.memberAvatarSrc}`);

    return (
        <Card style={memberInfoStyle}>
            <Card.Img variant="top" src={avatarSrc} style={memberAvatarStyle} />
            <Card.Body>
                <Card.Title>{props.member.memberName}</Card.Title>
                <Table style={memberInfoTableStyle}>
                    <tbody>
                        <tr>
                            <td><strong>Nomor Identitas Member</strong></td>
                            <td>{props.member.memberId}</td>
                        </tr>
                        <tr>
                            <td><strong>Jenis Member</strong></td>
                            <td>{props.member.memberSubscriptionTier}</td>
                        </tr>
                        <tr>
                            <td><strong>Member Berlaku Sampai</strong></td>
                            <td>{props.member.memberExpiryDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Tanggal Lahir</strong></td>
                            <td>{props.member.memberDateOfBirth}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="primary" disabled={isMemberNotAllowedToCheckIn()}>Cek-in Member</Button>
                {/*<h5 style={warningTextStyle}>*Jam check-in untuk paket Bronze adalah 06:00 - 12:00</h5>*/}
                {/*<h5 style={warningTextStyle}>*Pastikan bahwa data diatas sama dengan data yang tertera di kartu member.</h5>*/}
            </Card.Body>
        </Card>
    );
}

const memberInfoStyle = {
    marginTop: '24px'
};

const memberInfoTableStyle = {
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

/* const warningTextStyle = {
    marginTop: '16px',
    color: 'red'
}; */

function isMemberNotAllowedToCheckIn() { // TODO: check if member allowed to checkin within this timebox
    return false;
}

export default MemberInfo;