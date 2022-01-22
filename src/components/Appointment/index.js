// You do NOT need to do this b/c module import will pick index.js as a default if not specified
//import Appointment from "components/Appointment/index";
// https://web.compass.lighthouselabs.ca/activities/998

import React from 'react'
//import Appointment from "components/Appointment";
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";


export default function Appointment(props) {
const {time, id, interview} = props

// Option 2: works
// const appointmentMsg = <article className="appointment">Appointment at {time}</article>
// const noAppointmentMsg = <article className="appointment">No Appointments</article>

/* // OPTION 2: works
  // <>
  //   {time ? appointmentMsg : noAppointmentMsg}  
  // </>

  //OPTION 3: works
  //You always need one parent tag, react doesn't like the potential of two
  // <>
  // {time && <article className="appointment">Appointment a t {time}</article>}
  // {!time && <article className="appointment">No Appointments</article>}  
  // </> */ 

 /* If you want to do short circuit evaluation  
     {interview && <Show/>}
    {!interview && <Empty/>} */

  return (
  
  <article className="appointment">
    <Header time={time}/>
    {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/>}
{/*     {time && `Appointment at ${time}`}
    {!time && 'No Appointments'} */}
  </article> 
  
  
//So you don't need {} wrapped around this because it's evaluating directly with JSX
  
  // time ? <article className="appointment">Appointment at {time}</article>
  // : <article className="appointment">No Appointments</article>

  );

};