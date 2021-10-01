import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {

  const  dayClass = classNames('day-list__item ', {'day-list__item--selected' : props.selected}, {'day-list__item--full' : props.spots===0});

  const formatSpots = (spots) => {
    let spotStr = (spots === 0) ? 'no' : spots;
    spotStr += (spots === 1) ? ' spot' : ' spots';
    spotStr +=  ' remaining';    
    return spotStr;
  }

  return (
    <li>
      <div className={dayClass}>
        <h2>{props.name}</h2> 
        {/* <h3>{(props.spots === 0) ? 'no': props.spots} spots remaining</h3> */}
        <h3>{formatSpots(props.spots)}</h3>
      </div>
    </li>
  );
}