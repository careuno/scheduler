// You do NOT need to do this b/c module import will pick index.js as a default if not specified
//import Appointment from "components/Appointment/index";
// https://web.compass.lighthouselabs.ca/activities/998

import React from "react";
//import Appointment from "components/Appointment";
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  // MODES :

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDITING";
  // const ERROR_SAVE = "Could not save appointment.";
  // const ERROR_DELETE= "Could not cancel appointment.";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  //const confirmDelete = "Are you sure you'd like to delete?";
  const confirmDelete = "confirmDelete";

  const {
    time,
    id,
    interview,
    onCancel,
    interviewers,
    bookInterview,
    cancelInterview,
  } = props;
  const { mode, transition, back, history } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  //console.log('interview prop-------', interview)
  // const interviewers = [];

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview) // because from application.js you return axio.put(promise), here when you invoke, it also is a promise, so you can do .then to change mode where you have transition in scope
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const deleteConfirm = () => transition(confirmDelete);

  const deleteApt = () => {
    // const interview = {
    //   student: student,
    //   interviewer
    // };
    //transition(confirmDelete)
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));

    //back();
  };

  const onEdit = () => transition(EDIT);

  return (
    <article className="appointment">
      <Header time={time} />
      {/* CAN'T USE THIS ANYMORE CAUSE WE NEED TO SUPPORT MORE THAN TWO VIEWS{interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={deleteConfirm}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}

      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          studentName={interview.student}
          interviewerID={interview.interviewer.id}
        />
      )}

      {mode === SAVING && <Status message={SAVING} />}

      {mode === DELETING && <Status message={DELETING} />}

      {mode === confirmDelete && (
        <Confirm
          message="Are you sure you'd like to delete?"
          onConfirm={deleteApt}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={back} />
      )}
    </article>
  );
}

/*     {time && `Appointment at ${time}`}
    {!time && 'No Appointments'} */

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

//So you don't need {} wrapped around this because it's evaluating directly with JSX

// time ? <article className="appointment">Appointment at {time}</article>
// : <article className="appointment">No Appointments</article>
