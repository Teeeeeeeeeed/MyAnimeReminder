import React from "react";
import {format, startOfWeek, addDays, startOfMonth,
endOfMonth, endOfWeek, isSameDay, isSameMonth, parseISO,
addMonths, subMonths, getHours, getMinutes} from "date-fns";
import { Container,Row,Col, Collapse } from 'react-bootstrap';
import TrendingCards from '../Components/TrendingCards';
import differenceInCalendarISOWeekYears from "date-fns/esm/fp/differenceInCalendarISOWeekYears/index.js";


class CalendarApp extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  user_anime=[
    {
      animeName:'Attack on Titan',
      broadcastDate:[
        new Date('2021-04-02T12:00-12:30'),
        new Date('2021-04-09T12:00-12:30'),
        new Date('2021-04-16T12:00-12:30'),
        new Date('2021-04-23T12:00-12:30'),
      ],
      color:{backgroundColor: 'rgba(244,194,249,0.95)'}
    },
    {
      animeName:'Haikyuu!! To the top!',
      broadcastDate:[
        new Date('2021-04-03T12:00-12:30'),
        new Date('2021-04-10T12:00-12:30'),
        new Date('2021-04-17T12:00-12:30'),
        new Date('2021-04-24T12:00-12:30'),
      ],
      color:{backgroundColor: 'rgba(252,211,211,0.95)'}
    },
    {
      animeName:'Jujutsu Kaisen',
      broadcastDate:[
        new Date('2021-04-03T13:00-13:30'),
        new Date('2021-04-010T13:00-13:30'),
        new Date('2021-04-017T13:00-12:30'),
        new Date('2021-04-24T13:00-13:30'),
    ],
    color:{backgroundColor: 'rgba(211,228,252,0.95)'}
    }
  ]

  renderHeader(){
    const dateFormat = "MMMM yyyy";

    return (
      <Row className='days'>
        <Col>
          <div className="icon" onClick={this.prevMonth}>chevron_left
          </div>
        </Col>
        <Col>
          <span>
            <h4>{format(this.state.currentMonth, dateFormat)}</h4>
          </span>
        </Col>
        <Col onClick={this.nextMonth}>
          <div className="icon">
            chevron_right
          </div>
        </Col>
      </Row>
    );
  }
  
  renderDays(){
    const dateFormat = "iiii";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i =0; i < 7; i++){
      days.push(
        <Col className="days" key ={i}>
          <h5>{format(addDays(startDate, i), dateFormat)}</h5>
        </Col>
      )
    }
    return <Row>{days}</Row>
  }

  renderCells(){
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const dateFormat = "dd";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const events = [];
        /* looping through the anime object to find if there is broadcast on this current day*/
        this.user_anime.forEach(object=>{
          for(let j=0; j<object.broadcastDate.length;j++){
            if (isSameDay(object.broadcastDate[j],day)){
              events.push([object.animeName,object.broadcastDate[j],object.color])
            }
          }
        })
        /*   sorting broadcast shows in order of release time  */
        if (events.length>1){
          events.sort(function(a,b){
            return a[1] - b[1];
          })
        }
        const eventsDay = events.map( anime =>
          <Row className='events' style={anime[2]}>
            {anime[1].getHours()+':'+anime[1].getMinutes()+'  '}
            {anime[0]}
          </Row>
        )
        if (eventsDay.length==0){
          eventsDay.push(<div className='noEvent'></div>)
        }
        days.push(
          <Col
            className='calenderCol'
            key={day}
            onClick={() => this.onDateClick(cloneDay)}>
            <span 
            className="number">{formattedDate}
            </span>
            <div>
              {eventsDay}
            </div>
          </Col>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Row className="calenderRow" key={day}>
          {days}
        </Row>
      );
      days = [];
    }
    return <div>{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    }, console.log(this.state.currentMonth));
  };

  render() {
    return (
      <div className="container text">
        <div className='tableShadow'>
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

export default CalendarApp;