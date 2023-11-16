import React from 'react';
import './app.css';
import Intro from './tabs/IntroTime';
import Main from './tabs/Main';
import Task from './tabs/TaskPg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/app" element={<Main />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </Router>
  );
}
