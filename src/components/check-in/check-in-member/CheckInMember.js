import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import MemberInfo from './MemberInfo';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import { connect } from "react-redux";
import { fetchMemberByIdService } from "../../../redux/actions";
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
        this.props.fetchMemberByIdService(this.state.memberId, this.apiCallback);
    }

    renderMemberInfo = () => {
        if (this.state.isLoading)
            return <LoadingSpinner />;

        else if (!this.state.isServiceAvailable)
            return <h5 style={warningTextStyle}>Mohon maaf, sistem sedang mengalami gangguan.</h5>;

        else if (Object.keys(this.props.member).length === 0)
            return this.state.isSearchDirty ? <h5 style={warningTextStyle}>Hasil pencarian tidak ditemukan.</h5> : null;

        return <MemberInfo member={this.props.member} />;
    }

    render() {
        return (
            <div style={bodyStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan Nomor Identitas Member (ex. 123456789012)" value={this.state.memberId} onChange={input => this.updateMemberId(input.target.value)} />
                    <InputGroup.Append>
                        <Button variant="primary" onClick={this.findMemberById} disabled={this.state.memberId.length === 0}>Cari Member</Button>
                    </InputGroup.Append>
                </InputGroup>

                {this.renderMemberInfo()}
            </div>
        );
    }
}

const bodyStyle = {
    padding: '32px 25%'
};

const warningTextStyle = {
    margin: '80px'
};

function mapStateToProps(state) {
    const member = getMemberById(state);
    return { member };
}

export default connect(mapStateToProps, { fetchMemberByIdService })(CheckInMember);
