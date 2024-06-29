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
    <div>
      <Router>
        <div>
          <NavLink to="/">Pomdoro</NavLink>
          <NavLink to={"/break"}>Break</NavLink>
        </div>

        <Routes>
          <Route path="/" element={<StartTimer />} />
          <Route path="/break" element={<Break />} />
        </Routes>
        <div>topto</div>
      </Router>
    </div>
  );
};

export default Timer;
