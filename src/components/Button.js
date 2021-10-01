import React from "react";
import classNames from "classnames";


import "./Button.scss";

export default function Button(props) {
  const  buttonClass = classNames('button', {'button--confirm' : props.confirm}, {'button--Base' : props.Base}, {'button--danger' : props.danger});

  return (
    <button      
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
