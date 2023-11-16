import React, { useState, useEffect } from 'react';
import { handleMode } from '../handleMode';
import Intro from './Intro';
import Main from './Main';

export default function IntroTime() {
  const [showIntro, setShowIntro] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false);
    }, 5000); 
    handleMode();
  }, []);

  
  return (
    <div>
      {showIntro ? <Intro /> : <Main />}
    </div>
  );
}
