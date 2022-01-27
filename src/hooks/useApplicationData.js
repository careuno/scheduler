import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = (initial) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const days = updateSpots(state, appointments, id);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`).then((res) => {
      const days = updateSpots(state, appointments, id);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const updateSpots = function (state, appointments, id) {

    //Finds the dayObj inside the state that was passed, that includes the appointment id that was also passed, returns dayObj
    const dayObj = state.days.find((day) => day.appointments.includes(id));
    const aptIDArray = dayObj.appointments; // eg. [1,2,3], are the appointment ID's for the specified day

    //Creates/Returns a new array where the appointments that match the id's in aptIDArray DO NOT have an interview
    const arrayOfNullAptForDay = aptIDArray.filter((aptID) => !appointments[aptID].interview);

    //Since arrayofNullAptForDay is a list of available appointments/null, find length
    const numberOfSpots = arrayOfNullAptForDay.length;

    const resultDay = {
      ...dayObj,
      spots: numberOfSpots,
    };

    //Updating the day objects inside of days array only if it matches the new dayObj with updated spots
    const days = state.days.map((day) =>
      day.id === dayObj.id ? resultDay : day
    );

    return days;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((responseArray) => {
        setState((prev) => ({
          ...prev,
          days: responseArray[0].data,
          appointments: responseArray[1].data,
          interviewers: responseArray[2].data,
        }));
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
