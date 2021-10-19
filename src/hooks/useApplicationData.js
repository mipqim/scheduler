import { useState, useEffect } from "react";
import axios from "axios";
import { selectObjectArray } from "helpers/selectors";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });  

  const setDay = day => setState(prev =>({ ...prev, day }));

  useEffect(() =>{ 
    const daysUrl = `/api/days`;
    const appointmentsUrl = '/api/appointments';
    const interviewersUrl = '/api/interviewers';

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch(error => {
      console.log(error.response);
    });
  },[]);


  //Update spots
  const makeDaysForSpots = (changedSpot = 0) => {
    const currentDay = selectObjectArray(state.days, 'name', state.day)[0];
    let spots = 0;

    for (let appointmentId of currentDay.appointments){
      if (state.appointments[appointmentId].interview === null) spots++;        
    }
    spots += changedSpot;

    const tmpDays = state.days.map((day) => {
      return (day.name === state.day) ? { ...day, spots: spots } : day;
    });
    return tmpDays;
  }

  function bookInterview(id, interview, changeSpot) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //Appointment/index.js function save -> const interview = {student: name, interviewer}      
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };    

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((data) => {
        if (data.status === 204) {   
          const days = makeDaysForSpots(changeSpot ? -1 : 0);
          setState({ ...state, days, appointments });
        }
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        if (response.status === 204) {
          const days = makeDaysForSpots(1);
          setState({ ...state, days, appointments });
        }
      });
  }; 

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}