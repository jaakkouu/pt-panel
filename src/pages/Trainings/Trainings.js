import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';
import Link from '@material-ui/core/Link';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const Trainings = () => {

    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then((data) => {
            setTrainings(data);
            setLoading(false)
        })
    }

    return <div>
        <h1>Trainings</h1>
        <ReactTable
            columns={[
                {
                    Header: 'Activity',
                    accessor: 'activity'
                }, {
                    Header: 'Date',
                    accessor: 'date',
                    Cell: props => <Moment format="DD.MM.YYYY" date={props.original.date} />
                }, {
                    Header: 'Duration',
                    accessor: 'duration',
                    Cell: props => `${props.original.duration} min`
                }, {
                    Header: "Customer",
                    accessor: 'customer',
                    Cell: props => {
                        let c = props.original.customer;
                        return <Link>{c.firstname} {c.lastname}</Link>
                    }
                }
            ]}
            filterable={filterable}
            loading={loading}
            data={trainings}
        />
    </div>
}

export default Trainings