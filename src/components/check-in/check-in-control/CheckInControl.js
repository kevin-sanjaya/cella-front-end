import React from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Alert from '../../alert/Alert';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import shoesRentalSymbol from '../../../assets/shoes.svg';
import towellRentalSymbol from '../../../assets/towel.svg';
import { connect } from "react-redux";
import { fetchCheckedInMemberList } from "../../../redux/actions";
import { getCheckedInMemberList } from "../../../redux/selectors";

class CheckInControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberName: '', isLoading: true, isServiceAvailable: true, timestamp: null };
    }

    componentDidMount = () => {
        this.props.fetchCheckedInMemberList(this.apiCallback);
        this.interval = setInterval(() => this.setState({ timestamp: new Date().getTime() }), 1000);
    }

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, members: [...this.props.checkedInMembers] })

    updateMemberName = memberName => this.setState({ memberName })

    componentWillUnmount = () => clearInterval(this.interval)

    filterMemberList = () => {
        let members = [...this.props.checkedInMembers];
        if (this.state.memberName !== '')
            members = members.filter(member => member.member.memberName.toLowerCase().includes(this.state.memberName.toLowerCase()));
        this.setState({ members });
    }

    renderCheckInTimestamp = timestamp => {
        const timestampDifference = Math.abs(this.state.timestamp - new Date(timestamp).getTime())/1000;
        let hour = Math.floor(timestampDifference/3600);
        let minute = Math.floor((timestampDifference%3600)/60);
        let second = Math.floor(timestampDifference%60);
        return `${hour}:${minute}:${second}`;
    }

    renderCheckedInMemberList = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Memuat data member yang telah cek-in..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        return (<Table hover style={tableStyle}>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama Member</th>
                    <th>Jam Cek-in</th>
                    <th>Durasi Cek-in</th>
                    <th>No. Loker</th>
                    <th>Rental</th>
                </tr>
            </thead>
            <tbody>
                {this.state.members.length === 0 ? <tr><td colSpan="5"><h5>Hasil pencarian trainer tidak ditemukan.</h5></td></tr> : null}
                {this.state.members.map((member, index) => <tr key={index} style={tableRowStyle}>
                    <td>{++index}</td>
                    <td>{member.member.memberName}</td>
                    <td>{new Date(member.checkInEventTimestamp).toLocaleTimeString()}</td>
                    <td>{this.renderCheckInTimestamp(member.checkInEventTimestamp)}</td>
                    <td>{member.checkInEventStorageNumber}</td>
                    <td>
                        {member.checkInEventProperty.length === 0 ? '-' : null}
                        {member.checkInEventProperty.includes('Shoes') ? (<img src={shoesRentalSymbol} style={rentalSymbolStyle} alt="shoes-rental" />) : null}
                        {member.checkInEventProperty.includes('Towel') ? (<img src={towellRentalSymbol} style={rentalSymbolStyle} alt="towell-rental" />) : null}
                    </td>
                </tr>)}
            </tbody>
        </Table>);
    }

    render() {
        return (
            <div style={checkInControlStyle}>
                <Tabs defaultActiveKey="Member">
                    <Tab eventKey="Member" title="Member" style={controlTabStyle}>
                        <InputGroup className="mb-3" size="md">
                            <FormControl placeholder="Masukan Nama Depan/Belakang Member" value={this.state.memberName} onChange={input => this.updateMemberName(input.target.value)} />
                            <InputGroup.Append>
                                <Button style={clearSearchButtonStyle} onClick={() => this.setState({ memberName: '' })}>x</Button>
                                <Button variant="primary" onClick={this.filterMemberList}>Filter Member</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {this.renderCheckedInMemberList()}
                    </Tab>
                    <Tab eventKey="Trainer" title="Trainer">

                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const checkInControlStyle = {
    padding: '32px 24%'
};

const controlTabStyle = {
    marginTop: '16px'
};

const rentalSymbolStyle = {
    width: '25px',
    marginRight: '8px'
};

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const tableRowStyle = {
    cursor: 'pointer',
    textAlign: 'left'
};

const tableStyle = {
    textAlign: 'left'
};

function mapStateToProps(state) {
    const checkedInMembers = getCheckedInMemberList(state);
    return { checkedInMembers };
}

export default connect(mapStateToProps, { fetchCheckedInMemberList })(CheckInControl);
