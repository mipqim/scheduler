
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