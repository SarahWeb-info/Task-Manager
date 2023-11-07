import { logDOM } from '@testing-library/react';
import React from 'react';
import {BsFillMoonFill ,BsBellFill , BsArrowBarLeft ,BsArrowBarRight ,BsListNested } from "react-icons/bs";


export default function Button(props) {
  
  let content ;
  if(props.content){
    if(props.content === "BsArrowBarLeft"){
      content = <BsArrowBarLeft />
    }else if(props.content === "BsListNested"){
      content = <BsListNested />
    }else if(props.content === "BsArrowBarRight"){
      content = <BsArrowBarRight />
    }else if(props.content === "BsFillMoonFill"){
      content = <BsFillMoonFill />
    }else if(props.content === "BsBellFill"){
      content = <BsBellFill />
    }else if(props.content === "logo"){
      content = "l"
    }
  }else{
    content = ""
  }  
  
  const eventCall = (e) =>{
    let eventBtn = e.target;
    while (eventBtn && !eventBtn.classList.contains('eventBtn'))  {
      eventBtn = eventBtn.parentElement;
    }
    
    if (props.event === 'close' || props.event === 'closeLeft' || props.event === 'closeRight') {
      // Find parent classes until the className matches props.toggleDiv
      while (eventBtn && !eventBtn.classList.contains(props.toggleDiv)) {
        eventBtn = eventBtn.parentElement;
      }
      if(props.event === 'closeLeft'){
        eventBtn.style.left = "-200%";
      }else if(props.event === 'closeRight'){
        eventBtn.style.right = "-100%";
      }else{
        eventBtn.style.display = 'none';
      }

    }else if (props.event === 'openLeft' || props.event === 'openRight') {
      // Find the nearest sibling element with the className matching props.toggleDiv
      while (eventBtn && !eventBtn.classList.contains(props.toggleDiv)) {
        eventBtn = eventBtn.nextElementSibling;
      }
      if(props.event === 'openLeft'){
        eventBtn.style.left = 0;
      }else{
        eventBtn.style.right = 0;
      }
    }else if (props.event === 'changeMode') {
      let nightMode = localStorage.getItem('nightMode');
      console.log(`at line 58 night mode is ${nightMode}`);
      if (!nightMode) {
        nightMode = false;
      }
      console.log(`at line 62 night mode is ${nightMode}`);
      
      if (nightMode === true) {
        localStorage.setItem('nightMode', 'true');
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--color', 'rgb(16, 16, 16)');
      console.log(`at line 68 night mode is ${nightMode}`);
    }else{
      localStorage.setItem('nightMode', 'false');
        document.documentElement.style.setProperty('--bg', 'rgb(16, 16, 16)');
        document.documentElement.style.setProperty('--color', '#ffffff');
      console.log(`at line 73 night mode is ${nightMode}`);
      }
    } 
  }

  return (
    <div className="eventBtn">
      <button onClick={eventCall} className={props.addClass} >{content}</button>
    </div>
  );
}
