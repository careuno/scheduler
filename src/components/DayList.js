import React from "react";
import DayListItem from './DayListItem.js';

export default function DayList(props) {
  //const { setDay, days, day } = props //changing the names from Application.js makes us change the names in this component
  const { onChange, days, value } = props
  console.log('days---->', days)

  // days = [
  //   {id: 1, name: 'Monday', spots: 2 },
  //   {id: 2, name: 'Tuesday', spots: 5 },
  //   {id: 3, name: 'Wednesday', spots: 0 }
  // ];
  //const listOfDays = days.map((oneDay)=> <Player key={oneDay.gamerTag} {...oneDay} />);
  const listOfDays = days.map((oneDay)=> {
    // if (day === oneDay.name) {
    //   return <DayListItem spots={oneDay.spots} name={oneDay.name} key={oneDay.id} setDay={setDay} selected/>
    // } else {
    //   return <DayListItem spots={oneDay.spots} name={oneDay.name} key={oneDay.id} setDay={setDay} />
    // }

    return <DayListItem 
      spots={oneDay.spots} 
      name={oneDay.name} 
      key={oneDay.id} 
/*       setDay={setDay} 
      selected={day===oneDay.name}/> */
      setDay={onChange} 
      selected={value===oneDay.name}/>

  });

// {/* <DayListItem key={} name={name} spots={spots} {selected} setDay={setDay} /> */}

  return (
    <ul>
      {listOfDays} 
    </ul>
  );
}

