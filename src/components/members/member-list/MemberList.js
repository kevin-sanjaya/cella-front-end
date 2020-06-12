import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from '../../alert/Alert';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import goldSubscriptionSymbol from '../../../assets/gold-member.svg';
import silverSubscriptionSymbol from '../../../assets/silver-member.svg';
import bronzeSubscriptionSymbol from '../../../assets/bronze-member.svg';
import { connect } from 'react-redux';
import { fetchMemberList } from '../../../redux/actions';
import { getMemberList } from '../../../redux/selectors';

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberName: '', isLoading: true, isServiceAvailable: true };
    }

    componentDidMount = () => this.props.fetchMemberList(this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, members: [...this.props.members] })

    updateMemberName = memberName => this.setState({ memberName })

    filterMemberList = () => {
        let members = [...this.props.members];
        if (this.state.memberName !== '')
            members = members.filter(member => member.memberName.toLowerCase().includes(this.state.memberName.toLowerCase()));
        this.setState({ members });
    }

    renderMemberSubscriptionSymbol = tier => {
        const src = tier === 'Gold' ? goldSubscriptionSymbol : tier === 'Silver' ? silverSubscriptionSymbol : bronzeSubscriptionSymbol;
        return (<img src={src} style={memberSubscriptionSymbolStyle} alt="member-subscription" />);
    }

    renderMemberList = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Memuat daftar member..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        return (<Table hover style={tableStyle}>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama lengkap</th>
                    <th>Jenis member</th>
                    <th>Tgl. member terdaftar</th>
                    <th>Tgl. member berakhir</th>
                </tr>
            </thead>
            <tbody>
                {this.state.members.length === 0 ? (<tr><td colSpan="6"><h5 style={memberNotFoundStyle}>Hasil pencarian member tidak ditemukan.</h5></td></tr>) : null}
                {this.state.members.map((member, index) => (<tr key={index} style={tableRowStyle} onClick={() => this.props.history.push(member.memberId)}>
                    <td>{++index}</td>
                    <td>{member.memberName}</td>
                    <td>{member.memberSubscriptionTier} {this.renderMemberSubscriptionSymbol(member.memberSubscriptionTier)}</td>
                    <td>{moment(member.memberStartDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(member.memberExpiryDate).format("DD/MM/YYYY")} {member.memberExpiryWarning ? (<OverlayTrigger placement="right" overlay={<Tooltip>
                        Masa berlaku member akan segera berakhir. Mohon segera tawarkan member untuk memperpanjang.</Tooltip>}>
                        <span role="img" aria-label="warning"> &#10071;</span>
                    </OverlayTrigger>) : null}</td>
                </tr>))}
            </tbody>
        </Table>);
    }

    render() {
        return (
            <div style={memberListStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan nama depan/belakang member" value={this.state.memberName} onChange={input => this.updateMemberName(input.target.value)} />
                    <InputGroup.Append>
                        <Button style={clearSearchButtonStyle} onClick={() => this.setState({ memberName: '' })}>x</Button>
                        <Button variant="primary" onClick={this.filterMemberList}>Filter member</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.renderMemberList()}
            </div>
        );
    }
}

const memberListStyle = {
    padding: '32px 20%'
};

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const memberNotFoundStyle = {
    textAlign: 'center'
};

const tableStyle = {
    textAlign: 'left'
};

const tableRowStyle = {
    cursor: 'pointer'
};

const memberSubscriptionSymbolStyle = {
    width: '24px',
    marginLeft: '4px'
};

function mapStateToProps(state) {
    const members = getMemberList(state);
    return { members };
}

export default connect(mapStateToProps, { fetchMemberList })(MemberList);
