import React from "react";
//import DayListItem from './DayListItem.js';
//import "components/InterviewerList.scss";
// import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem.js';


// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

export default function InterviewerList(props) {
  const {interviewers, onChange, value} = props
  //Before we changed the naming of props to make it more explicit when storing interviewer obj in state
  // const {interviewers, setInterviewer, interviewer} = props

  const listOfInterviewers = interviewers.map((oneInterviewer)=> {
    return <InterviewerListItem 
      key={oneInterviewer.id} 
      name={oneInterviewer.name} 
      avatar={oneInterviewer.avatar} 
      /* the next two lines are preparing for when we want to store interviewer obj in state so INTERVIEWER is now VALUE, and setInterviewer is now onChange */
      selected={value===oneInterviewer.id}
      setInterviewer={()=>onChange(oneInterviewer.id)} 
      />
   /* selected={interviewer===oneInterviewer.id} 
      setInterviewer={()=>setInterviewer(oneInterviewer.id)}/> before we change when we need to consider storing interviewer obj in state */
  });






// //props for InterviewerListIem
//   const { id, name, avatar, selected, setInterviewer } = props;
//   const interviewerListClass = classNames("interviewers__item", {
//     "interviewers__item--selected": selected
//   });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
        </ul>
    </section>
  );
}
