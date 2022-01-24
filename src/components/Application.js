import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from './DayList';
import Appointment from 'components/Appointment' 
import "components/Application.scss";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors'


export default function Application(props) {
  
  // const [days, setDays] = useState([]);//pass a list of days into DayList, from the api get request
  // const [day, setDay] = useState('Monday');

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}, 
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
 // IS THE SAME AS:
 // const setDay = day => setState({ ...state, day:day });

  const setDays = days => {
    //setState({ ...state, days })
    //WHY DO WE NEED TO USE PREV HERE?
    
    //We use prev here ... setState takes two forms, 1-of a value and 2- a callback function
    //The callback function returns the new setState call, the previous setState value (that may not have rendered on the page yet)
    //We need it here in setDays because when doing a get request inside useEffect, it depended on state when it was setState({ ...state, days }). 

    //SO BECAUSE WE HAVE A STATE VARIABLE INSIDE A USEEFFECT HOOK, IT NEEDS TO BE IN THE DEPENDENCY ARRAY BUT THEN EVERYTIME STATE CHANGES, IT RE-RENDERS AND THEN CONTINUES TO FETCH DATA (You may not see it but IT'S INFINITELY FETCHING AND PUTTING STRAIN ON THE APP)
    //SO SO writing this would resolve the dependency array, fetching loop. 
    //THIS IS JUST ONE USE CASE OF USING PREV, YOU CAN USE IT FOR OTHER REASONS TO ACCESS A STATE BEFORE RE-RENDER AND IN THE ORDER YOU'D EXPECT(B/C ASYNC) 

    setState(prev => ({ ...prev, days}));

  };
  // const dailyAppointments= getAppointmentsForDay(state, state.day);
  // //const listOfAppointments = appointments.map((appointment)=> <Appointment key={appointment.id} {...appointment} />
  // const listOfAppointments = dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />);

const bookInterview= (id, interview) => {
  console.log('id, interview----->', id, interview)
  //log for now, later update to change the local state when booking an interview
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  //console.log('appointments--->', appointments)

  setState({
    ...state,
    appointments
  });

} 

const appointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
    />
  );
});



//Andy's method of multiple axios.get at the same time (1:40)
// //https://us02web.zoom.us/rec/play/ZT-nxyXjyFbDZad6rN2H6QX66QvfK6pWI1vhhkOkowuRloIKP2SRNZLjGW1gyTLAAvi5l8a2nqfks4aj.n8XU_etHwrjufK25?startTime=1642702903000&_x_zm_rtaid=6boM7KahSAGaxnYqwPCSew.1642801497325.6d1ca97efaa05268f9710a05179f3fd9&_x_zm_rhtaid=726

//   const daysPromise = axios.get('/api/days')
//   const appointmentsPromise = axios.get('/api/appointments')
//   const promises = [daysPromise, appointmentsPromise]




    useEffect(() => {
     Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
        .then((responseArray)=>{
          console.log('responseArray', responseArray)
          console.log('responseArray[0]', responseArray[0])
          console.log('responseArray[1]', responseArray[1])
          //console.log('responseArray[2]', responseArray[2])

          //const [first, second] = responseArray;
          //console.log(first, second);

          //first element is the days promise, and the second element is the appt promise
          //setState(prev => [...prev, ...responseArray[0],...responseArray[1]])
          //setDays([...response.data])
         // setState(prev => ({...prev, first: responseArray[0], second: responseArray[1]}));
          setState(prev => ({...prev, days: responseArray[0].data, appointments: responseArray[1].data, interviewers: responseArray[2].data }));

          
        })
        .catch((error)=>{
          console.log(error.response.status);
        })
    },[]);
//any state variable inside a useEffect Hook needs to be in the dependency array.. 

  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            value={state.day} 
            onChange={setDay}
           /*  day={day} 
            setDay={setDay}  changed it to value and onChange as key names to make it explicit WHY we are passing the data down*/
          /* Mimics controlled form components, to make it clear that DayList comp. is receiving user input 
          https://web.compass.lighthouselabs.ca/activities/1208
          */
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
