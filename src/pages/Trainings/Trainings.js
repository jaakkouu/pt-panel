import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import ReactTable from 'react-table'
import TrainingModal from '../../components/TrainingModal'
import ConfirmationModal from '../../components/ConfirmationModal'
import { Button, ButtonGroup, InputGroup, FormControl, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap'
import moment from 'moment'
import PageTitle from '../../components/PageTitle'
import '../../App.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'
import { FaSearch, FaCog, FaBan, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

// Using functions from API to get data
import {getCustomers, getTrainings, saveTraining, deleteTraining} from '../../Api'


const Trainings = () => {

    const [table, setTable] = useState();
    const [confirmationModal, setConfirmationModal] = useState();
    const [trainingModal, setTrainingModal] = useState();
    const [editing, setEditing] = useState(null);
    const [editable, setEditable] = useState(false);
    const [sortable, setSortable] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => setData(), []);

    const setData = () => {
        getCustomers().then((data) => setCustomers(data.content));
        getTrainings().then((data) => setTrainings(data));
    };

    const filterAll = ({target}) => {
        const filteredData = trainings.filter(row => {
            return row.activity.includes(target.value) || row.customer.fullname.includes(target.value);
        });
        setFiltered(filteredData);
    }

    const sliderColumnFilter = props => {
        let min = Math.min.apply(Math, trainings.map(function(o) { return o[props.column.id]; })),
            max = Math.max.apply(Math, trainings.map(function(o) { return o[props.column.id]; }));
        return <div>
            <span style={{textAlign: 'center'}}>&lt; {props.filter !== undefined ? props.filter.value : min} min</span>
            <div>
                <input type="range" defaultValue={min} onChange={(e) => props.onChange(e.target.value)} min={min} max={max} />
            </div>
        </div>
    }

    const selectColumnCell = props => {
        const options = trainings.filter((training, i) => {
            return i === trainings.findIndex(obj => {
                return training[props.column.id] === obj[props.column.id];
            })
        });
        return <select onChange={(e) => props.onChange(e.target.value)}>
            <option value="">All</option>
            {options.map((option, i) => <option key={i} value={option[props.column.id]}>{option[props.column.id]}</option>)}
        </select>
    }

    const datePickerCell = props => {
        let min = Math.min.apply(Math, trainings.map(function(o) { return o[props.column.id]; })),
            max = Math.max.apply(Math, trainings.map(function(o) { return o[props.column.id]; })),
            selected = props.filter !== undefined ? new Date(props.filter.value) : new Date(); 
        return <DatePicker
            selected={selected}
            minDate={new Date(min)}
            maxDate={new Date(max)} 
            onChange={(e) => props.onChange(e)}
            withPortal 
        />
    }

    const customFilter = (filter, row) => {
        let rowValue = row[filter.id];
        if(!rowValue) {
            return;
        }
        let filterValue = filter.value || "";
        if(filter.id === 'date'){
            // Need to set times to 0 so that dates can match
            rowValue = moment(rowValue).utcOffset(0);
            rowValue.set({hour:0, minute:0, second:0, millisecond:0})
            rowValue.toISOString();
            rowValue.format();
            filterValue = moment(filterValue);
            return rowValue.isSame(filterValue, 'date');
        } 
        return rowValue >= filterValue;
    }

    const buttonCell = row => {
        return <DropdownButton id="tableDropdown" drop="left" title={<FaCog size="0.8em" />}>
            {/*<Dropdown.Item variant="secondary" onClick={() => editTraining(row)}><FaEdit /> Edit Training</Dropdown.Item>*/}
            <Dropdown.Item variant="danger" onClick={() => removeTraining(row)}><FaTrash /> Delete Training</Dropdown.Item>
        </DropdownButton>
    }

    const addTraining = () => {
        trainingModal.modalTitle = 'Adding Training';    
        trainingModal.setState({customers: customers}); 
        trainingModal.confirm = () => {
            let training = Object.assign({}, trainingModal.state.training);
            training.date = moment(training.date).format('YYYY-M-D');
            saveTraining(training).then(() => {
                trainingModal.close();
                setData();
            });
        };
        trainingModal.open();
    }

    /*
    const editTraining = row => {
        trainingModal.modalTitle = 'Editing Training';
        trainingModal.setState({customers: customers}); 
        trainingModal.confirm = () => {
            let training = Object.assign({}, trainingModal.state.training);            
            training.date = moment(training.date).format('YYYY-M-D');
            saveTraining(training).then(() => {
                trainingModal.close();
                setData();
            });
        };
        trainingModal.open(row.original);
    };
    */

    const removeTraining = row => {
        confirmationModal.modalTitle = 'Training'; 
        confirmationModal.confirm = () => {
            deleteTraining(row.original).then(() => {
                confirmationModal.close();
                setData();
            });
        };
        confirmationModal.open();
    }

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity',
            Filter: selectColumnCell
        }, {
            Header: 'Date',
            accessor: 'date',
            Filter: datePickerCell,
            Cell: row => moment(row.original.date).format('DD/MM/YYYY'),
            filterMethod: (filter, row) => customFilter(filter, row)
        }, {
            Header: 'Duration',
            accessor: 'duration',
            Cell: row => `${row.original.duration} min`,
            Filter: sliderColumnFilter,
            filterMethod: (filter, row) => customFilter(filter, row)
        }, {
            Header: "Customer",
            accessor: 'customer.fullname'       
        }, {
            Header: "Action",
            width: 80,
            filterable: false,
            Cell: buttonCell,
            sortable: false,
            show: editable ? true : false
        }
    ];

    return <div>
        <PageTitle title='Trainings' />
        <ButtonToolbar style={{'visibility': loading ? 'hidden': 'visible'}} className='mb-2 justify-content-between'>
            <ButtonGroup>
                <Button onClick={addTraining} variant="primary" style={{paddingTop: '1px'}}><FaPlus /></Button>                            
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
                    placeholder="Search for trainings..."
                    aria-label="Search for trainings..."
                    aria-describedby="btnGroupSearch1"
                />
            </InputGroup>
        </ButtonToolbar>
        <ReactTable
            ref={(r) => setTable(r)}
            columns={columns}
            sortable={sortable}
            pageSize={filtered.length > 5 || trainings.length > 5 ? 10 : 5}
            filterable={filterable}
            loading={loading}
            data={filtered.length ? filtered : trainings}
            className="-striped -highlight"
        />
        <ConfirmationModal ref={r => setConfirmationModal(r)} />
        <TrainingModal calledFrom="trainings" ref={r => setTrainingModal(r)} />
    </div>
    
}

export default Trainings