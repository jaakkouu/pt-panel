import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import Customers from './pages/Customers/Customers';
import Trainings from './pages/Trainings/Trainings';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/customers">Customers</Link></li>
                <li><Link to="/trainings">Trainings</Link></li>
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/customers" component={Customers} />
            <Route path="/trainings" component={Trainings} />
        </div> 
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
