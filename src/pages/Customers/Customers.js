import React, {useState, useEffect} from 'react'
import ReactTable from 'react-table'
import PageTitle from '../../components/PageTitle'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import 'react-table/react-table.css'
import { FaSearch } from "react-icons/fa"

const Customers = () => {

    const [table, setTable] = useState();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [filterable, setFilterable] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then((data) => {
            data.content.map((obj, i) => {
                return obj.fullname = obj.firstname + ' ' + obj.lastname;
            });
            setCustomers(data.content);
        }).then(() => setLoading(false))
    }

    const filterAll = ({target}) => {
        const filteredData = customers.filter(row => {
            return row.fullname.includes(target.value) || row.email.includes(target.value) || row.phone.includes(target.value);
        });
        setFiltered(filteredData);
    }

    const customFilter = (filter, row) => {
        let rowValue = row[filter.id];
        if(!rowValue) {
            return;
        }
        let filterValue = filter.value || "";
        return rowValue >= filterValue;
    }

    return <div>
        <PageTitle title='Customers' />
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
                }
            ]}
            filterable={filterable}
            data={customers}
            loading={loading}
            data={filtered.length ? filtered : customers}
        />
    </div>
}

export default Customers