import React from "react";

import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const selected  = props.selected ? '--selected' : '';

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={'interviewers__item' + selected}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}


