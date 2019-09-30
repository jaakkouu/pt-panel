import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import ReactTable from 'react-table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import moment from 'moment'
import PageTitle from '../../components/PageTitle'
import 'react-table/react-table.css'
import "react-datepicker/dist/react-datepicker.css"
import { FaSearch } from "react-icons/fa"

const Trainings = () => {

    const [table, setTable] = useState();
    const [trainings, setTrainings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then((data) => {
            data.map((obj, i) => {
                return obj.customer.fullname = obj.customer.firstname + ' ' + obj.customer.lastname;
            });
            setTrainings(data);
        }).then(() => {
            setLoading(false);
        })
    }

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

    const selectColumnFilter = props => {
        const options = trainings.filter((training, i) => {
            return i === trainings.findIndex(obj => {
                return training[props.column.id] === obj.activity;
            })
        });
        return <select onChange={(e) => props.onChange(e.target.value)}>
            <option value="">All</option>
            {options.map((option, i) => <option key={i} value={option[props.column.id]}>{option[props.column.id]}</option>)}
        </select>
    }

    const datepickerColumnFilter = props => {
        let min = Math.min.apply(Math, trainings.map(function(o) { return o[props.column.id]; })),
            max = Math.max.apply(Math, trainings.map(function(o) { return o[props.column.id]; })),
            selected = props.filter !== undefined ? new Date(props.filter.value) : new Date(min); 
        return <DatePicker
            selected={selected}
            minDate={new Date(min)}
            maxDate={new Date(max)} 
            onChange={(e) => {             
                props.onChange(e);
            }}
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

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity',
            Filter: selectColumnFilter
        }, {
            Header: 'Date',
            accessor: 'date',
            Cell: props => moment(props.original.date).format('MM/DD/YYYY'),
            Filter: datepickerColumnFilter,
            filterMethod: (filter, row) => customFilter(filter, row)
        }, {
            Header: 'Duration',
            accessor: 'duration',
            Cell: props => `${props.original.duration} min`,
            Filter: sliderColumnFilter,
            filterMethod: (filter, row) => customFilter(filter, row)
        }, {
            Header: "Customer",
            accessor: 'customer.fullname'               
        }
    ];

    return <div>
        <PageTitle title='Trainings' />
        <ButtonToolbar className='mb-2 justify-content-between'>
            <Button onClick={() => setFilterable(!filterable)} variant="light">{filterable ? 'Unfilter' : 'Filter'}</Button>
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
            filterable={filterable}
            loading={loading}
            data={filtered.length ? filtered : trainings}
        />
    </div>
}

export default Trainings