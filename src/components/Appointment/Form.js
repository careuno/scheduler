import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";


export default function Form(props) {
  const {studentName, interviewers, interviewerID, onSave, onCancel} = props;
  const [student, setStudent] = useState(studentName || '')
  const [interviewer, setInterviewer] = useState(interviewerID || null)
  const [error, setError] = useState("")


  const reset= () => {
    setStudent('');
    setInterviewer(null)
    return
  };

  const cancel= () => {
    reset();
    onCancel();
    setError("")
    return
  };

 const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

   
    //STRETCH: For future implementation, must update JEST test
    // if (!interviewer) {
    //   setError("Must select interviewer.");
    //   return;
    // }


    onSave(student, interviewer);
    setError("")
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"  onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student} 
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer} 
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>


        </section>
      </section>
    </main>
  );
};