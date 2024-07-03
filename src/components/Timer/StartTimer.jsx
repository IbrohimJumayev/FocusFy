import React, { useEffect, useContext, useState, useRef } from "react";
import { timerContext } from "../../pages/HomePage";
import resetSound from "../../assets/reset.mp3";
import resumeSound from "../../assets/resume.mp3";
import startSound from "../../assets/start.mp3";
import pauseSound from "../../assets/pause.mp3";
import Swal from "sweetalert2";

function playSound(props) {
  new Audio(props).play();
}

const StartTimer = () => {
  const [coundPomodor, setCountPomodoros] = useState(0);
  const {
    timer,
    setTimer,
    timerOn,
    setTimerOn,
    breaktime,
    setBreakTime,
    isDisabled,
    setIsDisabled,
  } = useContext(timerContext);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerOn) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1000) {
            clearInterval(intervalRef.current);
            playSound(pauseSound);
            setCountPomodoros(coundPomodor + 1);

            Swal.fire({
              title: "You focused 25 minutes, great!",
              text: "Let's take some break",
              icon: "success",
              confirmButtonText: "OK",
            });
            return 0;
          } else {
            return prevTimer - 1000;
          }
        });
      }, 1000);
      setIsDisabled(true);
    } else {
      clearInterval(intervalRef.current);
      setIsDisabled(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerOn, setTimer, setIsDisabled]);

  useEffect(() => {
    const totalSeconds = Math.floor(timer / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    document.title =
      timer < 25 * 60 * 1000
        ? `${formattedMinutes}:${formattedSeconds}`
        : "FocusFy";
  }, [timer]);

  const formatTime = (timer) => {
    const totalSecond = Math.floor(timer / 1000);
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedMinutes} : ${formattedSeconds}`;
  };

  return (
    <div>
      <div className="flex justify-center text-7xl mt-6 font-black">
        {formatTime(timer)}
      </div>

      <div className="flex justify-between px-10 mt-12 flex-wrap gap-3">
        {!timerOn && timer === 25 * 60 * 1000 && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-6 py-2 flex-1"
            onClick={() => {
              setTimerOn(true);
              playSound(startSound);
            }}
          >
            Start
          </button>
        )}

        {timerOn && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-5 py-2 flex-1"
            onClick={() => {
              setTimerOn(false);
              playSound(pauseSound);
            }}
          >
            Pause
          </button>
        )}

        {!timerOn && timer !== 25 * 60 * 1000 && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-5 py-2 flex-1"
            onClick={() => {
              setTimerOn(true);
              playSound(resumeSound);
            }}
          >
            Resume
          </button>
        )}

        {!timerOn && timer < 25 * 60 * 1000 && (
          <button
            className="text-3xl font-medium bg-slate-900 rounded-md px-7 py-2 flex-1"
            onClick={() => {
              setTimer(25 * 60 * 1000);
              playSound(resetSound);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <span className="text-2xl font-bold"># {coundPomodor}</span>
      </div>
    </div>
  );
};

export default StartTimer;
