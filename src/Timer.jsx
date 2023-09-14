/* eslint-disable react/prop-types */

import { useEffect } from "react";

function Timer({ dispatch, secondsRemining }) {
  const mins = Math.floor(secondsRemining / 60);
  const sec = secondsRemining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "interval" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins.toString().padStart(2, 0) + ":" + sec.toString().padStart(2, 0)}
    </div>
  );
}

export default Timer;
