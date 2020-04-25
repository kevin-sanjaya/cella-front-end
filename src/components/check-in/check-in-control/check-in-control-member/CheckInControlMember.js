import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CheckInControlMemberModal from './CheckInControlMemberModal';
import Alert from '../../../alert/Alert';
import LoadingSpinner from '../../../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../../../assets/service-not-available.svg';
import shoesRentalSymbol from '../../../../assets/shoes.svg';
import towellRentalSymbol from '../../../../assets/towel.svg';

class CheckInControlMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberName: '', timestamp: null, isModalShowed: false, modalData: null };
    }

    componentDidMount = () => this.interval = setInterval(() => this.setState({ timestamp: new Date().getTime() }), 1000)

    componentWillUnmount = () => clearInterval(this.interval)

    updateMemberName = memberName => this.setState({ memberName })

    renderCheckInTimestamp = timestamp => { //TODO: change to moment.js
        const timestampDifference = Math.abs(this.state.timestamp - new Date(timestamp).getTime()) / 1000;
        const hour = Math.floor(timestampDifference / 3600);
        const minute = Math.floor((timestampDifference % 3600) / 60);
        const second = Math.floor(timestampDifference % 60);
        return `${hour}:${minute}:${second}`;
    }

    renderCheckedInMemberList = () => {
        if (this.props.isLoading)
            return (<LoadingSpinner text="Memuat data member yang telah cek-in..." />);

        else if (!this.props.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        return (<Table hover style={tableStyle}>
            <thead>
                <tr>{['No.', 'Nama member', 'Jam cek-in', 'Durasi cek-in', 'No. loker', 'Rental'].map((value, index) => (<th key={index}>{value}</th>))}</tr>
            </thead>
            <tbody>
                {this.props.checkedInMembers.length === 0 ? (<tr><td colSpan="6"><h5 style={memberNotFoundStyle}>Hasil pencarian member tidak ditemukan.</h5></td></tr>) : null}
                {this.props.checkedInMembers.map((member, index) => (<tr key={index} style={tableRowStyle} onClick={() => this.setState({ isModalShowed: true, modalData: member })}>
                    <td>{++index}</td>
                    <td>{member.member.memberName}</td>
                    <td>{moment(member.checkInEventTimestamp).format("DD/MM/YYYY")}</td>
                    <td>{this.renderCheckInTimestamp(member.checkInEventTimestamp)}</td>
                    <td>{member.checkInEventStorageNumber}</td>
                    <td>{member.checkInEventProperty.length !== 0 ? member.checkInEventProperty.map((property, index) => (
                        <img src={property === 'Shoes' ? shoesRentalSymbol : towellRentalSymbol} key={index} style={rentalSymbolStyle} alt="rental-property" />)) : '-'}
                    </td>
                </tr>))}
            </tbody>
        </Table>);
    }

    render() {
        return (<div>
            <InputGroup className="mb-3" size="md">
                <FormControl placeholder="Masukan nama depan/belakang member" value={this.state.memberName} onChange={input => this.updateMemberName(input.target.value)} />
                <InputGroup.Append>
                    <Button style={clearSearchButtonStyle} onClick={() => this.setState({ memberName: '' })}>x</Button>
                    <Button variant="primary" onClick={() => this.props.filterMemberList(this.state.memberName)}>Filter member</Button>
                </InputGroup.Append>
            </InputGroup>
            {this.renderCheckedInMemberList()}
            {this.state.modalData !== null ? (<CheckInControlMemberModal modalData={this.state.modalData} isModalShowed={this.state.isModalShowed}
                renderCheckInTimestamp={this.renderCheckInTimestamp} hideModal={() => this.setState({ isModalShowed: false })} />) : null}
        </div>);
    }
}

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const rentalSymbolStyle = {
    width: '25px',
    marginRight: '8px'
};

const tableStyle = {
    textAlign: 'left'
};

const tableRowStyle = {
    cursor: 'pointer',
    textAlign: 'left'
};

const memberNotFoundStyle = {
    textAlign: 'center'
};

export default CheckInControlMember;
