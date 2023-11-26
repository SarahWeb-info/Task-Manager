import React, { useState } from 'react';
import '../css/navbar.css';
import { BsFillMoonFill, BsArrowUpShort, BsListNested } from 'react-icons/bs';
import { handleMode } from '../handleMode';

export default function Navbar() {
  const [topDrop, setTopDrop] = useState('-100vh');
  const [dropDownOpacity , setDropDownOpacity] = useState('0');

  const openTopDropdown = () => {
    setTopDrop('0');
    setDropDownOpacity('1');
  };
  const closeTopDropdown = () => {
    setTopDrop('-100vh');
    setDropDownOpacity('0');
  };

  const changeMode = () => {
    handleMode();
  };

  return (
    <>
      <div className="flexInline navbar-Container">

        <button onClick={openTopDropdown} className="noBtn" >
          <BsListNested />
        </button>

        <div className="myDropmenu dropdownLeft" style={{top : `${topDrop}`,opacity : `${dropDownOpacity}`}}>
          <button onClick={closeTopDropdown} className="noBtn">
            <BsArrowUpShort />
          </button>

          <a href="http://" target="_blank" rel="noopener noreferrer">
            New Task
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Missed Tasks
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Finished Tasks
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            To do Tasks
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            More Apps
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            About Us
          </a>
        </div>

        <button onClick={changeMode} className="icon">
          <BsFillMoonFill />
        </button>
      </div>
      <div className ="navbarGhost" ></div>
    </>
  )
}
