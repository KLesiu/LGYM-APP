import React from "react";
import Preload from "./Components/Preload";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import './index.css'
import Register from "./Components/Register";

const App:React.FC=()=>{
  return(
    <div id="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Preload/>
        }></Route>
        <Route path="/login" element={
          <Login/>
        }></Route>
        <Route path="/register" element={
          <Register />
        }></Route>
        <Route path="/home" element={
          <Home />
        }></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App