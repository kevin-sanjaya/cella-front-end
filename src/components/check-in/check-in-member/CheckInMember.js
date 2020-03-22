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
        this.state = { memberId: '', isLoading: false, isServiceAvailable: true };
    }

    updateMemberId = memberId => this.setState({ memberId })

    apiCallIsFinished = isServiceAvailable => this.setState({ isLoading: false, isServiceAvailable })

    findMemberById = () => {
        this.setState({ isLoading: true });
        this.props.fetchMemberByIdService(this.state.memberId, this.apiCallIsFinished);
    }

    renderNoResultView = () => <h5 style={notFoundTextStyle}>Hasil pencarian tidak ditemukan.</h5>

    renderNoServiceView = () => <h5 style={notFoundTextStyle}>Mohon maaf, sistem sedang mengalami gangguan.</h5>

    render() {
        return (
            <div style={bodyStyle}>
                <InputGroup className="mb-3" size="md">
                    <FormControl placeholder="Masukan Nomor Identitas Member" value={this.state.memberId} onChange={input => this.updateMemberId(input.target.value)} />
                    <InputGroup.Append>
                        <Button variant="primary" onClick={this.findMemberById} disabled={this.state.memberId.length === 0}>Cari Member</Button>
                    </InputGroup.Append>
                </InputGroup>

                {this.state.isLoading ? <LoadingSpinner /> : null}
                
                {this.props.member === null ? null : this.props.member === undefined ? this.state.isLoading ? null : this.state.isServiceAvailable ? this.renderNoResultView() : this.renderNoServiceView() : this.state.isLoading ? null : <MemberInfo member={this.props.member} />}
            </div>
        );
    }
}

const bodyStyle = {
    padding: '32px 25%'
};

const notFoundTextStyle = {
    margin: '80px'
};

function mapStateToProps (state) {
    const member = getMemberById(state);
    return { member };
};

export default connect(mapStateToProps, { fetchMemberByIdService })(CheckInMember);
