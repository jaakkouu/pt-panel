import React from 'react'
import { Modal } from 'react-bootstrap'
import { Container, Button, FormControl, Row, Form} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class TrainingModal extends React.Component {

    constructor(props) {
        super(props);
        this.parent = props.calledFrom;
        this.modalTitle = "";
        this.ref = React.createRef();
        this.state = {
            customers: [],
            customer: {},
            training: {
                activity: 'DEFAULT',
                duration: 30,
                date: new Date(),
            },
            modalState: false
        }
    }

    setValue = e => {
        if(e.constructor !== Date) {
            e.persist();
        }
        this.setState(prevState => {
            let training = Object.assign({}, prevState.training);
            training[e.constructor === Date ? 'date' : e.target.id] = e.constructor === Date ? e : e.target.value;   
            return {training};
        });
    }

    open = data => {
        if(data !== undefined) {
            if(this.parent === 'trainings') {
                this.setState({
                    training: { 
                        activity: data.activity,
                        date: data.date,
                        duration: data.duration,
                        customer: data.customer.id
                    }
                });
            } else {
                let arr = data.links[0].href.split("/"),
                    customerId = arr[arr.length - 1];
                this.setState({
                    customer: data, 
                    training: { 
                        activity: 'DEFAULT',
                        date: new Date(),
                        duration: 30,
                        customer: customerId
                    }, 
                    modalState: true
                });
            }
        }
        this.setState({
            training: {
                date: new Date(),
                duration: 30,
                activity: 'DEFAULT',
                customer: 'DEFAULT'
            },
            modalState: true                
        });
    }

    close = () => this.setState({training: {
        activity: 'DEFAULT',
        duration: 30,
        date: new Date(),
    }, modalState: false});

    render () {
        return <Modal ref={this.ref} show={this.state.modalState} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title>{this.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="mb-1 mt-1">
                        <Form.Label>Date</Form.Label>
                    </Row>
                    <Row>
                        <DatePicker
                            minDate={new Date()}
                            selected={this.state.training.date}
                            onChange={date => this.setValue(date)}
                            customInput={<FormControl onClick={this.onClick} />}
                        />
                    </Row>
                    <Row className="mb-1 mt-3">
                        <Form.Label>Activity</Form.Label>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Control as="select" id="activity" value={this.state.training.activity} onChange={this.setValue}>
                                <option disabled value="DEFAULT">Select an Activity...</option>
                                <option value="Spinning">Spinning</option>
                                <option value="Gym Training">Gym Training</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Zumba">Zumba</option>
                                <option value="Jogging">Jogging</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 mt-1"> 
                        <Form.Label>Duration: ({this.state.training.duration} min)</Form.Label>
                    </Row>
                    <Row>
                        <input type="range" id="duration" value={this.state.training.duration} step="15" min="15" max="90" onChange={this.setValue} />
                    </Row>
                    {this.parent === 'trainings' && 
                        <>
                            <Row className="mb-1 mt-3">
                                <Form.Label>Select Existing Customer</Form.Label>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Control as="select" id="customer" value={this.state.training.customer} onChange={this.setValue}>
                                        <option disabled value="DEFAULT">Select an Customer...</option>
                                        {
                                            this.state.customers.map((option, i) => {
                                                let arr = option.links[0].href.split("/"),
                                                    id = arr[arr.length - 1];
                                                return <option key={i} value={id}>{option.fullname}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                        </>
                    }
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>Close</Button>
                <Button variant="primary" onClick={this.confirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    } 
}

export default TrainingModal