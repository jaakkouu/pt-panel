import React, { useState } from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import NavBar from './components/NavBar'

import Home from './pages/Home/Home'
import Customers from './pages/Customers/Customers'
import Trainings from './pages/Trainings/Trainings'
import Container from 'react-bootstrap/Container'

import './App.css'

const history = createBrowserHistory();

const App = () => {
    return (
      <Router>
        <div className="App">
            <NavBar props={history.location}/>
            <Container>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/customers" component={Customers} />
                <Route path="/trainings" component={Trainings} />
              </Switch>
            </Container>
        </div>
    </Router>
    )
}

export default App;