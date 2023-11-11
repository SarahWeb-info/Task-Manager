import React, { useState } from 'react';
import '../css/navbar.css';
import { BsFillMoonFill, BsBellFill, BsArrowBarLeft, BsArrowBarRight, BsListNested } from 'react-icons/bs';
import Icon from '../imgs/icon.png';
import { handleMode } from '../handleMode';

export default function Navbar() {
  const [leftDrop, setLeftDrop] = useState('-100vw');
  const [rightDrop, setRightDrop] = useState('-100vw');

  const openLeftDropdown = () => {
    setLeftDrop('0');
  };
  const openRightDropdown = () => {
    setRightDrop('0');
  };
  const closeLeftDropdown = () => {
    setLeftDrop('-100vw');
  };
  const closeRightDropdown = () => {
    setRightDrop('-100vw');
  };

  const changeMode = () => {
    handleMode();
  };

  return (
    <>
      <div className="navbar-Container inlineFlexStatus">

        <button onClick={openLeftDropdown} className="noBtn">
          <BsListNested />
        </button>

        <div className="myDropmenu dropdownLeft" style={{left : `${leftDrop}`}}>
          <button onClick={closeLeftDropdown} className="noBtn">
            <BsArrowBarLeft />
          </button>

          <a href="http://" target="_blank" rel="noopener noreferrer">
            Link 1
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Link 2
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Link 3
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Link 4
          </a>
        </div>

        <div className="statusChild2">

          <button onClick={changeMode} className="icon">
            <BsFillMoonFill />
          </button>

          <button className="noBtn">
            <BsBellFill />
          </button>

          <button onClick={openRightDropdown} className="icon">
            <img src={Icon} alt="" />
          </button>

          <div className="myDropmenu dropdownRight" style={{ right: `${rightDrop}` }}>

            <button className="noBtn" onClick={closeRightDropdown}>
              <BsArrowBarRight />
            </button>

            <a href="http://" target="_blank" rel="noopener noreferrer">
              Link 1
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              Link 2
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              Link 3
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              Link 4
            </a>
          
          </div>
        
        </div>
      </div>
      <div className ="navbarGhost" ></div>
    </>
  )
}
