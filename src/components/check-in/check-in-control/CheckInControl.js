import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CheckInControlTrainer from './CheckInControlTrainer';
import CheckInControlMember from './check-in-control-member/CheckInControlMember';
import { connect } from 'react-redux';
import { fetchCheckedInMemberList } from '../../../redux/actions';
import { getCheckedInMemberList } from '../../../redux/selectors';

class CheckInControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checkedInMembers: [], isLoading: true, isServiceAvailable: true };
    }

    componentDidMount = () => this.props.fetchCheckedInMemberList(this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false, checkedInMembers: [...this.props.checkedInMembers] })

    filterMemberList = memberName => {
        let checkedInMembers = [...this.props.checkedInMembers];
        if (memberName !== '')
            checkedInMembers = checkedInMembers.filter(member => member.member.memberName.toLowerCase().includes(memberName.toLowerCase()));
        this.setState({ checkedInMembers });
    }

    render() {
        return (
            <div style={checkInControlStyle}>
                <Tabs defaultActiveKey="Member">
                    <Tab eventKey="Member" title="Member" style={controlTabStyle}>
                        <CheckInControlMember checkedInMembers={this.state.checkedInMembers} isLoading={this.state.isLoading}
                            isServiceAvailable={this.state.isServiceAvailable} filterMemberList={this.filterMemberList} />
                    </Tab>
                    <Tab eventKey="Trainer" title="Trainer" style={controlTabStyle}>
                        <CheckInControlTrainer />
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

function mapStateToProps(state) {
    const checkedInMembers = getCheckedInMemberList(state);
    return { checkedInMembers };
}

export default connect(mapStateToProps, { fetchCheckedInMemberList })(CheckInControl);
