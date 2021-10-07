import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/style.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        console.log(error.response);
      });
  }

  function remove() {
    transition(DELETING,true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => {
        console.log(error.response);
      });
  }

  return (
    <article className="appointment">
      <Header
        time = {props.time}          
      />
      {/* {props.interview ?  <Show student = {props.interview.student} 
                                interviewer = {props.interview.interviewer} 
                                onEdit={()=>{console.log('onEdit from Appointment/index.js')}} 
                                onDelete={()=>{console.log('onDelete from Appointment.js')}}
                          />
                        : <Empty onAdd={()=>{console.log('onAdd from Appointment/index.js')}}/>} */}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={()=>{console.log('onEdit from Appointment/index.js')}} 
          onDelete={() => transition(CONFIRM)}          
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          // onSave={()=>{console.log('onSave from Appointment.js')}}          
        />
      )}

      {mode === SAVING && <Status message={"SAVING"} />}
      
      {mode === DELETING && <Status message={"DELETING"} />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={remove}
          message={"Are you sure you would like to delete?"}
        />
      )}      
    </article>
  );
}