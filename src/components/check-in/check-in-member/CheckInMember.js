import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import MemberInfo from './MemberInfo';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import Alert from '../../alert/Alert';
import resultNotFoundSymbol from '../../../assets/result-not-found.svg';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import { connect } from "react-redux";
import { fetchMemberById } from "../../../redux/actions";
import { getMemberById } from "../../../redux/selectors";

class CheckInMember extends React.Component {
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

    renderSearchResult = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Sedang mencari..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        else if (Object.keys(this.props.member).length === 0)
            return this.state.isSearchDirty ? (<Alert alertSymbol={resultNotFoundSymbol} alertText="Hasil pencarian tidak ditemukan." />) : null;

        return (<MemberInfo member={this.props.member} />);
    }

    render() {
        return (
            <div style={checkInMemberStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan 12-Digit Nomor Identitas Member" value={this.state.memberId} onChange={input => this.updateMemberId(input.target.value)} />
                    <InputGroup.Append>
                        <Button style={clearSearchButtonStyle} onClick={() => this.setState({ memberId: '' })}>x</Button>
                        <Button variant="primary" onClick={this.findMemberById} disabled={this.state.memberId.length === 0}>Cari Member</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.renderSearchResult()}
            </div>
        );
    }
}

const clearSearchButtonStyle = {
    background: 'none',
    border: '1px solid #ced4da',
    color: 'black'
};

const checkInMemberStyle = {
    padding: '32px 25%'
};

function mapStateToProps(state) {
    const member = getMemberById(state);
    return { member };
}

export default connect(mapStateToProps, { fetchMemberById })(CheckInMember);
