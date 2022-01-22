import React from "react";
//import DayListItem from './DayListItem.js';
import "components/InterviewerListItem.scss";
import classNames from "classnames";


// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setInterviewer } = props;
  const interviewerListClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });
// ERROR: setInterviewer is not a function because its not passed as a prop in the stories for the first two stories, if you have setInterviewer inside an anon arrow fn in your onClick, it won't run on first render and cause that error, (REMEMBER onClick needs reference to function not call the function) if your function doesn't have params then just pass the name of the function, if your func needs an argument/parameter then wrap it in an arrow func for onClick
  return (
    <li className={interviewerListClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
} 

// {winner && <h2>{winner} is the winner by {scoreDifference}!</h2>}
// {!winner && <h2>No winners yet!</h2>}