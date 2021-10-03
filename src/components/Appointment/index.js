import React from "react";

import Header from "./Header";

import "components/Appointment/style.scss";


export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header
        time = {props.time}
      />
    </article>
  );
}