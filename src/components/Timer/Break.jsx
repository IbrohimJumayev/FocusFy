import React, { useContext, useEffect, useRef } from "react";
import { timerContext } from "../../pages/HomePage";

const Break = () => {
  const { timer, setTimer, timerOn, setTimerOn, breaktime, setBreakTime } =
    useContext(timerContext);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (timerOn) {
      intervalRef.current = setInterval(() => {
        setBreakTime((prevTimer) => {
          if (prevTimer <= 1000) {
            clearInterval(intervalRef.current);
            return 0;
          } else {
            return prevTimer - 1000;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [timerOn, setBreakTime]);

  const formatBreak = (breaktime) => {
    const totalSecond = Math.floor(breaktime / 1000);
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;

    const formatedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formatedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formatedMinutes} : ${formatedSeconds} `;
  };

  return (
    <div>
      <div className="flex justify-center text-7xl mt-6 font-black">
        {formatBreak(breaktime)}
      </div>
      <div className="flex justify-between px-10 mt-12 flex-wrap gap-3">
        {!timerOn && breaktime === 5 * 60 * 1000 && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-6 py-2 flex-1"
            onClick={() => setTimerOn(true)}
          >
            Start
          </button>
        )}

        {timerOn && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-5 py-2 flex-1"
            onClick={() => setTimerOn(false)}
          >
            Pause
          </button>
        )}

        {!timerOn && breaktime !== 5 * 60 * 1000 && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-5 py-2 flex-1"
            onClick={() => setTimerOn(true)}
          >
            Resume
          </button>
        )}

        {!timerOn && breaktime < 5 * 60 * 1000 && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-7 py-2 flex-1"
            onClick={() => setBreakTime(5 * 60 * 1000)}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Break;

