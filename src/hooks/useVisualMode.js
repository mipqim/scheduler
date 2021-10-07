import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(mode, replace=false) {
    setMode(mode);
    if (replace) {
      setHistory(prev => [mode, ...(prev.slice(1))]);
    } else {
      setHistory(prev => [mode, ...prev]);
    }
  }

  function back() {
    if (history.length > 1) {
      setMode(history[1]);
      setHistory((prev) => {
        prev.shift();        
        return prev;
      });
    }
  }

  // function back() {  
  //   setHistory((prev) => {
  //     if (history.length > 1) {
  //       prev.shift();
  //       setMode(history[0]);
  //     }
  //     return prev;
  //   });
  // }

  return { mode, transition, back };
}