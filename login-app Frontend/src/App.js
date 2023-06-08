import React from "react";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/* <Route path="/dashboard/:data" element={<Dashboard />} /> */}

        <Route path="/home" element={<Home/>}></Route>

        <Route path="/Dashboard" element={<Dashboard/>}></Route>

        {/* <Route path="/dashboard">
          <Dashboard data={data} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
