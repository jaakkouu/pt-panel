import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import ReactTable from 'react-table'
import moment from 'moment'
import PageTitle from '../../components/PageTitle'
import 'react-table/react-table.css'
import "react-datepicker/dist/react-datepicker.css"

const Trainings = () => {

    const [trainings, setTrainings] = useState([]);
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
        withPortal />
    }

    const greaterOrEqual = (filter, row) => {
        const rowValue = row[filter.id];
        if(!rowValue) {
            return;
        }
        const filterValue = filter.value || "";
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
            filterMethod: (filter, row) => greaterOrEqual(filter, row)
        }, {
            Header: 'Duration',
            accessor: 'duration',
            Cell: props => `${props.original.duration} min`,
            Filter: sliderColumnFilter,
            filterMethod: (filter, row) => greaterOrEqual(filter, row)
        }, {
            Header: "Customer",
            accessor: 'customer.fullname'               
        }
    ];

    return <div>
        <PageTitle title="Trainings" />
        <ReactTable
            columns={columns}
            filterable={filterable}
            loading={loading}
            data={trainings}
        />
    </div>
}

export default Trainings