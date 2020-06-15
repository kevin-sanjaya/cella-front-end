import React from 'react';
import ExtendMemberForm from './ExtendMemberForm';
import ExtendMemberInvoice from './ExtendMemberInvoice';

class ExtendMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = { displayedComponent: 'form' };
    }

    renderCardComponent = () => {
        if (this.state.displayedComponent === 'form')
            return (<ExtendMemberForm generateInvoice={this.switchComponent} />);
        
        return (<ExtendMemberInvoice />);
    }

    switchComponent = displayedComponent => this.setState({ displayedComponent })

    render() {
        return (<div style={extendMemberStyle}>{this.renderCardComponent()}</div>);
    }
}

const extendMemberStyle = {
    padding: '32px 30%'
};

export default ExtendMember;
