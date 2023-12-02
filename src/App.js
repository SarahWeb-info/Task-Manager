import React from 'react';
import './app.css';
import Intro from './tabs/Intro';
import Main from './tabs/Main';
import Task from './tabs/TaskPg';
import { BrowserRouter , Routes , Route } from "react-router-dom";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/app" element={<Main />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}