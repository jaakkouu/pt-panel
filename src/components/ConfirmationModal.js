import React from 'react'
import { Modal, Button } from 'react-bootstrap'

class ConfirmationModal extends React.Component {

    constructor(props) {
        super(props);
        this.modalTitle = "";
        this.ref = React.createRef();
        this.state = {
            modalState: false
        }
    }

    open = () => this.setState({modalState: true});

    close = () => this.setState({modalState: false});

    render () {
        return <Modal ref={this.ref} show={this.state.modalState} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title>Removing {this.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>
                    No, I Changed My Mind
                </Button>
                <Button variant="primary" onClick={this.confirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    } 
        
}

export default ConfirmationModal