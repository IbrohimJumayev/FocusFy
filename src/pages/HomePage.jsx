import React from "react";
import { useState, createContext } from "react";
import Navbar from "../components/navBar/Navbar";
import Timer from "../components/Timer/Timer";

export const timerContext = createContext();
const HomePage = () => {
  const [timer, setTimer] = useState(25 * 60 * 1000);
  const [breaktime, setBreakTime] = useState(5 * 60 * 1000);
  const [timerOn, setTimerOn] = useState(false);

  return (
    <>
      <div className="max-w-xl border-solid m-auto">
        <timerContext.Provider value={{ timer, setTimer, timerOn, setTimerOn, breaktime, setBreakTime }}>
          <Navbar />
          <Timer />
        </timerContext.Provider>
      </div>
    </>
  );
};

export default HomePage;
