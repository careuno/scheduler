import React from "react";
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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const confirmDelete = "confirmDelete";

  const { time, id, interview, interviewers, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    //EXTRA STEP to prevent crashing until future implementation of error when interviewer not selected in form
    if (!interviewer) {
      return;
    }

    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const deleteConfirm = () => transition(confirmDelete);

  const deleteApt = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const onEdit = () => transition(EDIT);

  return (
    <article className="appointment">
      
      <Header time={time} />
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
        <Form 
          interviewers={interviewers} 
          onCancel={back} 
          onSave={save} />
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
          onCancel={back}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment." 
          onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment." 
          onClose={back} />
      )}
    </article>
  );
}
