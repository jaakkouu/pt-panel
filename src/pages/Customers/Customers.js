import React, {useState, useEffect} from 'react'
import ReactTable from 'react-table'
import PageTitle from '../../components/PageTitle'
import 'react-table/react-table.css'

const Customers = () => {

    const [customerTable, setReactTable] = useState();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then((data) => {
            setLoading(false);
            setCustomers(data.content);
        })
    }

    return <div>
        <PageTitle title="Customers" />
        <ReactTable
            ref={(r) => setReactTable(r)}
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