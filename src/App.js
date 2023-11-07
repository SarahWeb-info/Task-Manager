import React, { useEffect } from 'react';
import './App.css';
// import Intro from './tabs/Intro';
// import Main from './tabs/Main';
import Sketch from './Sketch';


export default function App() {
  let appWidth = "786px";
  useEffect(() => {
    setRootCssVariables();
  }, []);

  function setRootCssVariables() {
    let nightMode = localStorage.getItem('nightMode');
    // by default nightMode = true , means night mode is on
    console.log(`at line 15 night mode is ${nightMode}`);

    if(nightMode){// false means nightmode is off
      if (nightMode === false) {
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--color', 'rgb(16, 16, 16)');
      }
    }else{
      console.log(`at line 23 night mode is ${nightMode}`);

    }
  }

  return (
      <div className='app' style={{width : `${appWidth}` }}>
        {/* <Main appWidth = {appWidth} /> */}
        {/* <Intro /> */}
        <Sketch />
      </div>
  );
}

