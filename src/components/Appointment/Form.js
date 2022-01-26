import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";
//https://web.compass.lighthouselabs.ca/days/w07d3/activities/1209

/* 
The Form component should track the following state:

student:String
interviewer:Number
The Form component should have the following actions:

setStudent:Function
setInterviewer:Function
The Form component should take the following props:

student:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function 
*/

export default function Form(props) {
  const {studentName, interviewers, interviewerID, onSave, onCancel} = props;
  //console.log('studentName------>', studentName)
  const [student, setStudent] = useState(studentName || '')
  const [interviewer, setInterviewer] = useState(interviewerID || null)
  const [error, setError] = useState("")
  //console.log('student---->', student)
  //console.log('interviewer---->', interviewer)

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
          /* why is it not this ??? onChange={()=> setInterviewer} */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>

         {/*  <Button confirm onClick={(student,interviewer)=> onSave(student, interviewer)}>Save</Button> */}
        </section>
      </section>
    </main>
  );
};