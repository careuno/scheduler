export const getAppointmentsForDay = (state, dayName) => {
  const dayObj = state.days.find((oneDay) => {
    return oneDay.name === dayName;
  });

  if (!dayObj) {
    return [];
  }

  const result = dayObj.appointments.map((id) => state.appointments[id]);
  return result;
};

export const getInterviewersForDay = (state, dayName) => {
  const dayObj = state.days.find((oneDay) => {
    return oneDay.name === dayName;
  });

  if (!dayObj) {
    return [];
  }

  const result = dayObj.interviewers.map((id) => state.interviewers[id]);
  return result;
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    const interviewerID = interview.interviewer;
    const interviewObj = {
      ...interview,
      interviewer: state.interviewers[interviewerID],
    };
    return interviewObj;
  }
};
