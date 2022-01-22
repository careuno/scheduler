import { useCallback, useState } from "react";

export const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter(oneDay => {
    return oneDay.name === day//returns an obj where the name matches so you can access the appointments array
  });
//console.log('filteredDays----------->',filteredDays)
//console.log('day----------->',day)
const resultArray =[];
if (filteredDays.length === 0) {
  return resultArray;
} else {
  const appointmentSlots = filteredDays[0]['appointments']
  for (const slot of appointmentSlots) {
      resultArray.push(state.appointments[slot]) //slot is a number type, and the keys on appointments are "1"  or "2" and it works here cause you are putting the number as a key, and it's coerced into a sting type to evaluate. BUT if you do if (slot === id) it will stop type coercion and evaluate to FALSE. 
  }
}

//appointmentSlots.map((x)=>state.appointments[x]); //x is referring to an element in the appointmentSlots array. YOU CAN DO MAP INSTEAD OF establishing an empty array but you'd have to rewrite your condition for empty strings. 


return resultArray;
};




//interview will be (appointment.interview)
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
      const interviewerID = interview.interviewer
      const interviewObj = {
        ...interview, interviewer: state.interviewers[interviewerID]
      }
    return interviewObj;
  }
};

/* 
The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null. The object it returns should look like this:
*/




//STATE looks like: 
// {
//   day: "Monday",
//   days: [],
//     // you may put the line below, but will have to remove/comment hardcoded appointments      variable
//   appointments: {
                // APPOINTMENTS look like: 
                //{
                  // 1: {
                  // id: 1,
                  // time: "12pm",
                  // interview: {
                  // student: "Archie Cohen",
                  // interviewer: 7
//                   }
//                 }
//                 }
// }
//   interviewers: {}
// }

// INTERVIEWERS looks like: 
// {
//   1: {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
//   },
//   2: {
//   id: 2,
//   name: "Tori Malcolm",
//   avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   },
//   3: {
//   id: 3,
//   name: "Mildred Nazir",
//   avatar: "https://i.imgur.com/T2WwVfS.png"
// }


  //getInterview should return interviewObj: 
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// 
