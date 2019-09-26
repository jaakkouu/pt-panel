import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import ReactTable from 'react-table';
import Typography from '@material-ui/core/Typography';
import 'react-table/react-table.css';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then((data) => {
            setLoading(false);
            setFilterable(true);
            setCustomers(data.content);
        })
    }

    return <div>
        <Typography variant="h4" component="h1" gutterBottom>
            Customers
            <Link style={{float:'right'}} onClick={() => setFilterable(!filterable)} component="button" underline="none">{filterable ? 'Unfilter' : 'Filter'}</Link>
        </Typography>
        <ReactTable
            columns={[
                {
                    Header: 'Name',
                    Cell: props => {
                        return props.original.firstname + ' ' + props.original.lastname;
                    }
                },  {
                    Header: 'Email',
                    accessor: 'email',
                },  {
                    Header: 'Phone',
                    accessor: 'phone',
                }
            ]}
            filterable={filterable}
            data={customers}
            loading={loading}
        />
    </div>
}

export default Customers