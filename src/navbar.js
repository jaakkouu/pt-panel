import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


function NavigationBar(props) {
    return <List component="nav">
         <ListItem component="div">
                <ListItemText>
                    <Typography color="inherit" variant="h6">
                        <Link exact="true" to="/">Home</Link>
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography color="inherit" variant="h6">
                        <Link to="/customers">Customers</Link>
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography color="inherit" variant="h6">
                        <Link to="/trainings">Trainings</Link>
                    </Typography>
                </ListItemText>
         </ListItem>
    </List>
}

export default NavigationBar;