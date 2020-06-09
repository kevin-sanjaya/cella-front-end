import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CheckInControlTrainer from './check-in-control-trainer/CheckInControlTrainer';
import CheckInControlMember from './check-in-control-member/CheckInControlMember';
import { connect } from 'react-redux';
import { fetchCheckedInMemberList, fetchCheckedInTrainerList } from '../../../redux/actions';
import { getCheckedInMemberList, getCheckedInTrainerList } from '../../../redux/selectors';

class CheckInControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checkedInMembers: [], checkedInTrainers: [], isMemberListLoading: true, isTrainerListLoading: true, isServiceAvailable: true };
    }

    componentDidMount = () => {
        this.props.fetchCheckedInMemberList(this.memberListApiCallback);
        this.props.fetchCheckedInTrainerList(this.trainerListApiCallback);
    }

    trainerListApiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isTrainerListLoading: false, checkedInTrainers: [...this.props.checkedInTrainers] })

    memberListApiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isMemberListLoading: false, checkedInMembers: [...this.props.checkedInMembers] })

    filterMemberList = memberName => {
        let checkedInMembers = [...this.props.checkedInMembers];
        if (memberName !== '')
            checkedInMembers = checkedInMembers.filter(member => member.member.memberName.toLowerCase().includes(memberName.toLowerCase()));
        this.setState({ checkedInMembers });
    }

    filterTrainerList = trainerName => {
        let checkedInTrainers = [...this.props.checkedInTrainers];
        if (trainerName !== '')
            checkedInTrainers = checkedInTrainers.filter(trainer => trainer.trainer.trainerName.toLowerCase().includes(trainerName.toLowerCase()));
        this.setState({ checkedInTrainers });
    }

    render() {
        return (
            <div style={checkInControlStyle}>
                <Tabs defaultActiveKey="Member">
                    <Tab eventKey="Member" title="Member" style={controlTabStyle}>
                        <CheckInControlMember checkedInMembers={this.state.checkedInMembers} isLoading={this.state.isMemberListLoading}
                            isServiceAvailable={this.state.isServiceAvailable} filterMemberList={this.filterMemberList} />
                    </Tab>
                    <Tab eventKey="Trainer" title="Trainer" style={controlTabStyle}>
                        <CheckInControlTrainer checkedInTrainers={this.state.checkedInTrainers} isLoading={this.state.isTrainerListLoading}
                            isServiceAvailable={this.state.isServiceAvailable} filterTrainerList={this.filterTrainerList} />
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
    const checkedInTrainers = getCheckedInTrainerList(state);
    return { checkedInMembers, checkedInTrainers };
}

export default connect(mapStateToProps, { fetchCheckedInMemberList, fetchCheckedInTrainerList })(CheckInControl);
