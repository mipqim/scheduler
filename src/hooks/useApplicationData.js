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
    const daysUrl = `http://localhost:8001/api/days`;
    const appointmentsUrl = 'http://localhost:8001/api/appointments';
    const interviewersUrl = 'http://localhost:8001/api/interviewers';

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
  useEffect(() =>{ 
    const currentDay = selectObjectArray(state.days, 'name', state.day)[0];
    if (currentDay) {
      let spots = 0;
  
      for (let appointmentId of currentDay.appointments){
        if (state.appointments[appointmentId].interview === null) spots++;
      }
  
      const tmpDays = state.days.map((day) => {
        return (day.name === state.day) ? { ...day, spots: spots } :  day;
      });

      setState({ ...state, days: tmpDays});
    }
  },[state.appointments]);

  function bookInterview(id, interview) {
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
          setState({ ...state, appointments});
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
          setState({ ...state, appointments });
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