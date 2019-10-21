import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import PageTitle from '../../components/PageTitle'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'

import '../../assets/css/fullCalendar.css'

import {getTrainings} from '../../Api'
import {Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { el } from 'date-fns/locale'

const Calendar = () => {
    
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainings().then((data) => {
            const events = [];
            data.forEach(training => {
                let startTime = new Date(training.date);
                events.push({
                    title: training.activity,
                    start: startTime,
                    customer: training.customer.fullname,
                    time: `${training.duration} min`,
                    end: moment(startTime).add(training.duration, 'minutes').toDate()
                });
            });
            setEvents(events);
        });
    }, []);

   
    const popover = (props) => <Popover id="popover-basic">
        <Popover.Title as="h3">Extra information</Popover.Title>
        <Popover.Content>
            <table>
                <tbody>
                    <tr>
                        <th>Customer:</th>
                        <td>{props.extendedProps.customer}</td>
                    </tr>
                    <tr>
                        <th>Duration:</th>
                        <td>{props.extendedProps.time}</td>
                    </tr>
                </tbody>
            </table>
        </Popover.Content>
    </Popover>

    return <>
        <PageTitle title='Calendar' />
        <FullCalendar 
            defaultView="timeGridWeek" 
            nowIndicator="true"
            eventRender={(info) => {
                const el = info.el;
                ReactDOM.render(<OverlayTrigger trigger="hover" placement="right" overlay={popover(info.event)}>
                    <span>{info.event.title}</span>
                </OverlayTrigger>, el);
                return el;
            }}
            plugins={[timeGridPlugin]}
            events={events}
        />
    </>
}

export default Calendar