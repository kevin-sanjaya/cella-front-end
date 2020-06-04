import React from 'react';
import NewMemberForm from './NewMemberForm';
import NewMemberConfirmation from './NewMemberConfirmation';
import NewMemberInvoice from './NewMemberInvoice';

class NewMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFormAlreadySubmitted: false, displayedComponent: 'form', memberData: null, isConfirmationAlreadyShowed: false };
    }

    submitRegistrationForm = memberData => this.setState({ isFormAlreadySubmitted: true, displayedComponent: 'confirmation', memberData })

    cancelRegistrationForm = () => this.setState({ displayedComponent: 'form', isConfirmationAlreadyShowed: true })

    showMemberInvoice = () => this.setState({ displayedComponent: 'invoice' })

    renderCardComponent = () => {
        if (this.state.displayedComponent === 'form')
            return (<NewMemberForm submitRegistrationForm={this.submitRegistrationForm} isFormAlreadySubmitted={this.state.isFormAlreadySubmitted}
                memberData={this.state.memberData} />);
        
        else if (this.state.displayedComponent === 'confirmation')
            return (<NewMemberConfirmation memberData={this.state.memberData} cancelRegistrationForm={this.cancelRegistrationForm}
                showMemberInvoice={this.showMemberInvoice} isConfirmationAlreadyShowed={this.state.isConfirmationAlreadyShowed} />)
        
        return (<NewMemberInvoice memberData={this.state.memberData} />)
    }

    render() {
        return (
            <div style={newMemberStyle}>
                {this.renderCardComponent()}
            </div>);
    }
}


const newMemberStyle = {
    padding: '32px 30%'
};

export default NewMember;
