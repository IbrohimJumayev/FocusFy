import React from "react";
import { useState, createContext } from "react";
import Navbar from "../components/navBar/Navbar";
import Timer from "../components/Timer/Timer";

export const timerContext = createContext();
const HomePage = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  return (
    <>
      <div className="max-w-xl border-solid m-auto">
        <timerContext.Provider value={{ time, setTime, timerOn, setTimerOn }}>
          <Navbar />
          <Timer />
        </timerContext.Provider>
      </div>
    </>
  );
};

export default HomePage;
