import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots <= 0, 
  });


  //SEE BELOW TO REMOVE GLOBAL VARIABLE

  const formatSpots= (spots) => {
//see below if you want to see it as an if statement instead
    return spots > 1 ? `${spots} spots` 
        : spots === 1 ? "1 spot"
        : "no spots"
    
  };



  //QUESTION: IS IT BETTER TO DO SHORT CIRCUIT EVAL? or a ternary
  //if you have two conditions with two outcomes, use ternary, if 
  
  //if we deconstructed props above, can we writer setDay(name) below or do we need to do props.name, I'm guessing it's in the function/component scope so it's fine...
  //<li onClick={setDay}> using this still displays the click action in storybook
  return (
    <li className={dayListClass} onClick={() => {setDay(name)}}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}

//---------------------formatSpots function with if statement--------//

//Try to avoid global variables..

// const formatSpots= (spots) => {

//   if (spots > 1) {
//     //you need to use template literals because once you inject remainingSpots into the return statement, it doesn't continue to look for {spots} before rendering
//     return `${spots} spots remaining`
//   } else if (spots === 1 ){
//     return  "1 spot remaining"
//   } else {
//     return "no spots remaining"
//   }
// };

// //if we deconstructed props above, can we writer setDay(name) below or do we need to do props.name, I'm guessing it's in the function/component scope so it's fine...
// //<li onClick={setDay}> using this still displays the click action in storybook
// return (
//   <li className={dayListClass} onClick={() => {setDay(name)}}>
//     <h2 className="text--regular">{name}</h2> 
//     <h3 className="text--light">{formatSpots()}</h3>
//   </li>
// );