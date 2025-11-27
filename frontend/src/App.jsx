import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin"
import Todos from "../components/Todos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/landing" element={<Landing/>}/> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/todos" element={<Todos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

