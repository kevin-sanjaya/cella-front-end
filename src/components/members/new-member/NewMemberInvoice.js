import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import serviceNotAvailableSymbol from '../../../assets/service-not-available.svg';
import CustomAlert from '../../alert/Alert';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import { connect } from 'react-redux';
import { fetchInvoice } from '../../../redux/actions';
import { getInvoice } from '../../../redux/selectors';

class NewMemberInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, isServiceAvailable: true, invoiceData: {} };
    }

    componentDidMount = () => this.fetchInvoice()

    fetchInvoice = () => this.props.fetchInvoice(this.props.memberData.memberSubscriptionTier, this.apiCallback)

    apiCallback = isServiceAvailable => this.setState({ isServiceAvailable, isLoading: false })

    renderDiscountRow = () => {
        if (this.props.invoice.invoiceDiscount !== null && this.props.invoice.invoiceDiscountReason !== null)
            return `Rp. ${this.props.invoice.invoiceDiscount} (${this.props.invoice.invoiceDiscountReason})`;
        
        return '-';
    }

    renderInvoice = () => {
        if (this.state.isLoading)
            return (<LoadingSpinner text="Sedang memuat invoice..." />);

        else if (!this.state.isServiceAvailable)
            return (<CustomAlert alertSymbol={serviceNotAvailableSymbol} alertText="Mohon maaf, sistem sedang mengalami gangguan." />);

        return (<Card>
            <Card.Body>
                <Card.Title>Invoice pendaftaran member baru</Card.Title>
                <Form style={newMemberInvoiceStyle}>
                    <Table>
                        <tbody>
                            <tr>
                                <td><strong>Nomor transaksi</strong></td>
                                <td>{this.props.invoice.invoiceId}</td>
                            </tr>
                            <tr>
                                <td><strong>Tipe paket member</strong></td>
                                <td>{this.props.invoice.invoiceSubscriptionType}</td>
                            </tr>
                            <tr>
                                <td><strong>Biaya administrasi</strong></td>
                                <td>Rp. {this.props.invoice.invoiceAdministrationFee}</td>
                            </tr>
                            <tr>
                                <td><strong>Iuran bulanan member</strong></td>
                                <td>Rp. {this.props.invoice.invoiceSubscriptionMonthlyCost}</td>
                            </tr>
                            <tr>
                                <td><strong>Total iuran member (6 bulan)</strong></td>
                                <td>Rp. {this.props.invoice.invoiceSubscriptionTotalCost}</td>
                            </tr>
                            <tr>
                                <td><strong>Promo/diskon</strong></td>
                                <td>{this.renderDiscountRow()}</td>
                            </tr>
                            <tr>
                                <td><strong>Total yang harus dibayar</strong></td>
                                <td><u>Rp. {this.props.invoice.invoiceTotal}</u></td>
                            </tr>
                            <tr>
                                <td><strong>Resepsionis</strong></td>
                                <td>Dwi Ario Setiadi</td>
                            </tr>
                            <tr>
                                <td><strong>Invoice dibayar oleh</strong></td>
                                <td>{this.props.memberData.memberName}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Form>
                <Form.Group style={invoiceConsentStyle}>
                    <Form.Check checked={this.state.isInvoicePaid} onChange={event => this.setState({ isInvoicePaid: event.target.checked })}
                        inline type="checkbox" label="Invoice telah dibayar lunas oleh calon member." />
                </Form.Group>
                <OverlayTrigger placement="right" overlay={<Tooltip>POST request interactions have been disabled in this demo environment.</Tooltip>}>
                    <Button variant="primary" disabled={!this.state.isInvoicePaid}>Daftarkan member dan print invoice</Button>
                </OverlayTrigger>
            </Card.Body>
        </Card>);
    }

    render() {
        return (<div>
            {this.renderInvoice()}
        </div>);
    }
}

const newMemberInvoiceStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const invoiceConsentStyle = {
    textAlign: 'left'
}

function mapStateToProps(state) {
    const invoice = getInvoice(state);
    return { invoice };
}

export default connect(mapStateToProps, { fetchInvoice })(NewMemberInvoice);
