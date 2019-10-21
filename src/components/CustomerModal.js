import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button, InputGroup, FormControl, Row, Col} from 'react-bootstrap'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

class CustomerModal extends React.Component {

    constructor(props) {
        super(props);
        this.modalTitle = "";
        this.ref = React.createRef();
        this.state = {
            customer: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                streetaddress: '',
                postcode: '',
                city: ''
            },
            modalState: false
        }
    }

    open = customer => {
        if(customer !== undefined && customer.constructor === Object) {
            this.modalTitle = "Edit Customer";
            this.setState({customer: customer});
        } else {
            this.modalTitle = "Add Customer";
        }
        this.setState({modalState: true})
    };

    close = () => this.setState({customer: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    }, modalState: false});

    setValue = e => {
        let propertyName = e.target.id,
            propertyValue = e.target.value;
        this.setState(prevState => {
            let customer = Object.assign({}, prevState.customer);
            customer[propertyName] = propertyValue;                 
            return {customer};
        });
    }

    render () {
        return <Modal ref={this.ref} show={this.state.modalState} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title>{this.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="firstname"
                                value={this.state.customer.firstname}
                                onChange={this.setValue}
                                placeholder="Firstname"
                                aria-label="Firstname"/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="lastname"
                                placeholder="Lastname"
                                value={this.state.customer.lastname}
                                onChange={this.setValue}
                                aria-label="Lastname"/>
                        </InputGroup>
                    </Col>
                </Row>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><FaEnvelope /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        id="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        value={this.state.customer.email}
                        onChange={this.setValue}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><FaPhone /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        id="phone"
                        placeholder="Phone number"
                        aria-label="Phone number"
                        value={this.state.customer.phone}
                        onChange={this.setValue}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        id="streetaddress"
                        placeholder="Street Address"
                        aria-label="Street Address"
                        value={this.state.customer.streetaddress}
                        onChange={this.setValue}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="postcode"
                                value={this.state.customer.postcode}
                                onChange={this.setValue}
                                placeholder="Post Code"
                                aria-label="Post Code"/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="city"
                                value={this.state.customer.city}
                                onChange={this.setValue}
                                placeholder="City"
                                aria-label="City"/>
                        </InputGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.confirm}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    } 
        
}

export default CustomerModal