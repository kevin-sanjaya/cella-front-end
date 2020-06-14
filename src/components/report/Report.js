import React from 'react';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reportSelection: 'Kartu member', reportDescription: '', isPictureUploaded: false };
    }

    isFormNotValid = () => {
        return (!this.state.isPictureUploaded || this.state.reportDescription.length === 0);
    }

    render() {
        return (<div style={reportStyle}><Card>
            <Card.Body>
                <Card.Title>Form laporan kehilangan</Card.Title>
                <Form style={reportFormStyle}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4"><strong>Jenis barang</strong></Form.Label>
                        <Col sm="8">
                            <Form.Control as="select" value={this.state.reportSelection} onChange={input => this.setState({ reportSelection: input.target.value })}>
                                {reportTypeEnum.map((value, index) => (<option key={index} value={value}>{value}</option>))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4"><strong>Keterangan</strong></Form.Label>
                        <Col sm="8">
                            <Form.Control as="textarea" rows="4" value={this.state.reportDescription} onChange={input => this.setState({ reportDescription: input.target.value })}
                                placeholder="Cantumkan keterangan singkat mengenai: deskripsi barang, siapa pelapor, lokasi, dan waktu ditemukan" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4"><strong>Upload foto</strong></Form.Label>
                        <Col sm="8">
                            <Button variant="primary" onClick={() => this.setState({ isPictureUploaded: true })}>Upload foto barang</Button> &nbsp;
                            {this.state.isPictureUploaded ? 'dummy_picture.jpg' : null}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4"><strong>Penerima barang</strong></Form.Label>
                        <Col sm="8" style={reportDataRowStyle}>Dwi Ario Setiadi</Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4"><strong>Diterima tanggal</strong></Form.Label>
                        <Col sm="8" style={reportDataRowStyle}>{moment(Date.now()).format("DD/MM/YYYY")}</Col>
                    </Form.Group>
                </Form>
                <OverlayTrigger placement="right" overlay={<Tooltip>POST request interactions have been disabled in this demo environment.</Tooltip>}>
                    <Button variant="primary" disabled={this.isFormNotValid()}>Proses laporan kehilangan</Button>
                </OverlayTrigger>
            </Card.Body>
        </Card></div>);
    }
}

const reportTypeEnum = ['Kartu member', 'Kartu trainer', 'Barang pribadi', 'Peralatan gym', 'Kunci loker', 'Lainnya'];

const reportStyle = {
    padding: '32px 30%'
};

const reportFormStyle = {
    textAlign: 'left',
    marginTop: '24px'
};

const reportDataRowStyle = {
    display: 'flex',
    alignItems: 'center'
};

export default Report;
