import React, {useState, useEffect} from 'react'
import ReactTable from 'react-table'

import CustomerModal from '../../components/CustomerModal'
import ConfirmationModal from '../../components/ConfirmationModal'
import TrainingModal from '../../components/TrainingModal'
import PageTitle from '../../components/PageTitle'

import { Button, ButtonGroup, InputGroup, FormControl, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap'
import moment from 'moment'
import '../../App.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'
import { FaSearch, FaCog, FaBan, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

// Using functions from API to get data
import {getCustomers, getTrainings, deleteCustomer, saveCustomer, saveTraining} from '../../Api'

const Customers = () => {

    const [table, setTable] = useState();
    const [customerModal, setCustomerModal] = useState();
    const [confirmationModal, setConfirmationModal] = useState();
    const [trainingModal, setTrainingModal] = useState();
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => setData(), []);

    const setData = () => {
        getCustomers().then((data) => setCustomers(data.content));
        getTrainings().then((data) => setTrainings(data));
    };

    const filterAll = ({target}) => {
        const filteredData = customers.filter(row => {
            return row.fullname.includes(target.value) || row.email.includes(target.value) || row.phone.includes(target.value);
        });
        setFiltered(filteredData);
    }

    const buttonCell = row => {
        return <DropdownButton id="tableDropdown" drop="left" title={<FaCog size="0.8em" />}>
            <Dropdown.Item variant="primary" onClick={() => addTraining(row)}><FaPlus /> Add Training</Dropdown.Item>
            <Dropdown.Item variant="secondary" onClick={() => editCustomer(row)}><FaEdit /> Edit Customer</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item variant="danger" onClick={() => removeCustomer(row)}><FaTrash /> Delete Customer</Dropdown.Item>
        </DropdownButton>
    }

    const editCustomer = row => {
        customerModal.confirm = () => {
            let customer = customerModal.state.customer;
            saveCustomer(customer).then(() => {
                setData();
                customerModal.close();
            });
        }
        customerModal.open(row.original);
    };

    const addCustomer = () => customerModal.open();

    const addTraining = row => {
        trainingModal.modalTitle = `Adding Training For ${row.original.fullname}`;
        trainingModal.confirm = () => {
            let training = Object.assign({}, trainingModal.state.training);
            training.date = moment(training.date).format('YYYY-M-D');
            saveTraining(training).then(() => {
                setData();
                trainingModal.close();
            });
        };
        trainingModal.open(row.original);
    }

    const removeCustomer = row => {
        confirmationModal.modalTitle = row.original.fullname;
        confirmationModal.confirm = () => {
            deleteCustomer(row.original).then(() => {
                setData();
                confirmationModal.close();
            });
        };
        confirmationModal.open();
    };

    return <>
        <PageTitle title='Customers' />
        <ButtonToolbar className='mb-2 justify-content-between'>
            <ButtonGroup>
                <Button onClick={addCustomer} variant="primary" style={{paddingTop: '1px'}}><FaPlus /></Button>                            
                <Button variant={editable ? 'danger' : 'secondary'} onClick={() => setEditable(!editable)} style={{paddingTop: '1px'}}>{editable ? <FaBan /> : <FaCog />}</Button>
                <Button onClick={() => setFilterable(!filterable)} variant="light">{filterable ? 'Unfilter' : 'Filter'}</Button>            
            </ButtonGroup>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="btnGroupSearch1"><FaSearch /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={filterAll}
                    type="text"
                    placeholder="Search for customer..."
                    aria-label="Search for customer..."
                    aria-describedby="btnGroupSearch1"
                />
            </InputGroup>
        </ButtonToolbar>
        <ReactTable
            ref={(r) => setTable(r)}
            columns={[
                {
                    Header: 'Name',
                    accessor: 'fullname'               
                },  {
                    Header: 'Email',
                    accessor: 'email',
                },  {
                    Header: 'Phone',
                    accessor: 'phone',
                }, {
                    filterable: false,
                    Cell: buttonCell,
                    sortable: false,
                    width: 80,
                    show: editable ? true : false
                }
            ]}
            filterable={filterable}
            data={customers}
            loading={loading}
            pageSize={filtered.length >= 5 || customers.length >= 5 ? 10 : 5}
            data={filtered.length ? filtered : customers}
        />
        <CustomerModal ref={r => setCustomerModal(r) }/>
        <ConfirmationModal ref={r => setConfirmationModal(r)} />
        <TrainingModal calledFrom="customers" ref={r => setTrainingModal(r)} />
    </>
}

export default Customers