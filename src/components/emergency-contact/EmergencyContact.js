import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Alert from '../alert/Alert';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import serviceNotAvailableSymbol from '../../assets/service-not-available.svg';
import './EmergencyContact.css'; 
import { connect } from 'react-redux';
import { fetchEmergencyContactList } from '../../redux/actions';
import { getEmergencyContactList } from '../../redux/selectors';

class EmergencyContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, isServiceAvailable: true };
    }

    componentDidMount = () => this.props.fetchEmergencyContactList(this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false })

    renderEmergencyContactCard = (contact, index) => {
        const avatar = require(`../../assets/${contact.emergencyContactAvatarSrc}`);

        return (
            <Card key={index} className="card-style">
                <Card.Img variant="top" src={avatar} style={emergencyContactAvatarStyle} />
                <Card.Body>
                    <Card.Title>{contact.emergencyContactEntity}</Card.Title>
                    <Card.Text>
                        {contact.emergencyContactWorkDay} <br />
                        {contact.emergencyContactWorkHour} WIB <br />
                        {contact.emergencyContactNumber}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Update terakhir {moment(contact.emergencyContactLastUpdate).format("DD/MM/YYYY")}</small>
                </Card.Footer>
            </Card>);
    }

    renderEmergencyContactList = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Memuat daftar kontak darurat..." />);

        else if (!this.state.isServiceAvailable)
            return (<Alert alertSymbol={serviceNotAvailableSymbol} alertText={`Mohon maaf, sistem sedang mengalami gangguan. Silahkan panggil nomor 031xxxxxxx untuk keadaan darurat.`} />);

        return (<CardDeck>
            {this.props.emergencyContacts.map((contact, index) => this.renderEmergencyContactCard(contact, index))}
        </CardDeck>);
    }

    render() {
        return (<div style={emergencyContactStyle}>{this.renderEmergencyContactList()}</div>);
    }
}

const emergencyContactStyle = {
    padding: '32px 5%'
};

const emergencyContactAvatarStyle = {
    width: '80px',
    margin: '24px auto 0'
};

function mapStateToProps(state) {
    const emergencyContacts = getEmergencyContactList(state);
    return { emergencyContacts };
}

export default connect(mapStateToProps, { fetchEmergencyContactList })(EmergencyContact);
