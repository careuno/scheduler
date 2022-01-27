import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem.js';
import PropTypes from 'prop-types';



export default function InterviewerList(props) {
  const {interviewers, onChange, value} = props
  const listOfInterviewers = interviewers.map((oneInterviewer)=> {
    return <InterviewerListItem 
      key={oneInterviewer.id} 
      name={oneInterviewer.name} 
      avatar={oneInterviewer.avatar} 
      selected={value===oneInterviewer.id}
      setInterviewer={()=>onChange(oneInterviewer.id)} 
      />

  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
        </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
