import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import StartTimer from "./StartTimer";
import Break from "./Break";

const Timer = () => {
  return (
    <div className="bg-slate-600 mt-7 rounded-lg text-white font-bold max-w-lg m-auto mx-3">
      <Router>
        <div className="flex text-xl pt-5 px-3">
          <NavLink className="flex-1 text-center py-3" to="/">
            Pomodoro
          </NavLink>
          <NavLink className="flex-1 text-center py-3" to={"/break"}>
            Break
          </NavLink>
        </div>

        <Routes>
          <Route path="/" element={<StartTimer />} />
          <Route path="/break" element={<Break />} />
        </Routes>
        <br />
      </Router>
    </div>
  );
};

export default Timer;
