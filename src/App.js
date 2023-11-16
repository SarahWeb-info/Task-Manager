import React, { useState, useEffect } from 'react';
import { handleMode } from './handleMode';
import './App.css';
import Intro from './tabs/Intro';
import Main from './tabs/Main';

export default function App() {
  const [showIntro, setShowIntro] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false);
    }, 3000); 
    handleMode();
  }, []);

  
  return (
    <div className='app'>
      {showIntro ? <Intro /> : <Main />}
    </div>
  );
}
