
export function getAppointmentsForDay(state, day) {
  let resultArray = [];

  const days = state.days;
  const appointments = state.appointments;

  const selectedDay = selectObjectArray(days, 'name', day)[0];

  if (selectedDay) {
    for (const appointment of selectedDay['appointments']) {
      resultArray.push(appointments[appointment]);
    }
  }
  
  return resultArray;
}

function selectObjectArray(objArray, srcProperty, filterStr) {
  return objArray.filter(obj => obj[srcProperty] === filterStr);
}

export function getInterview(state, interview) {
  if(!interview || !state.interviewers[interview.interviewer]){
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer : {
      id : interview.interviewer,
      name : interviewer.name,
      avatar : interviewer.avatar
    }
   };       
};


export const getInterviewersForDay = (state, dayStr) => {
  let resultArray = [];
  if(state && dayStr) {
    const dayObj = state.days.find(dayInMap => dayInMap.name === dayStr);
    if(dayObj && dayObj.interviewers){
      for(const interviewerId of dayObj.interviewers){
        resultArray.push(state.interviewers[interviewerId]);
      }
    }
  }
  return resultArray;
};