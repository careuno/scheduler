import React from "react";
import DayListItem from './DayListItem.js';

export default function DayList(props) {
  const { onChange, days, value } = props
  const listOfDays = days.map((oneDay)=> {

    return <DayListItem 
      spots={oneDay.spots} 
      name={oneDay.name} 
      key={oneDay.id} 
      setDay={onChange} 
      selected={value===oneDay.name}/>

  });

  return (
    <ul>
      {listOfDays} 
    </ul>
  );
}

