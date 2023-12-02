import React, { useState } from 'react';
import '../css/navbar.css';
import { BsFillMoonFill, BsArrowUpShort, BsListNested } from 'react-icons/bs';
import { handleMode } from '../handleMode';
import DialogForm from '../components/DialogForm.js';

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

  const [showDialogForm , setShowDialogForm] = useState(false);
    const openDialogForm=()=>{
        setShowDialogForm(true);
    }
    
    const closeDialogForm=()=>{
        setShowDialogForm(false);
    }

  return (
    <>
      <div className="flexInline navbar-Container">

        <button onClick={openTopDropdown} className="noBtn" >
          <BsListNested />
        </button>

        <div className="myDropmenu dropdownLeft" style={{top : `${topDrop}`,opacity : `${dropDownOpacity}`}}>
          <button onClick={closeTopDropdown} className="btnUp">
            <BsArrowUpShort />
          </button>

          <button onClick={openDialogForm} className='noBtn'>
            New Task
          </button>
          <a href="/app?filter=to do" >
            To do Tasks
          </a>
          <a href="/app?filter=missed" >
            Missed Tasks
          </a>
          <a href="/app?filter=done" >
            Completed Tasks
          </a>
          <a className='text-muted' >
            More Apps
          </a>
          <a className='text-muted'>
            About Us
          </a>
        </div>

        <button onClick={changeMode} className="icon">
          <BsFillMoonFill />
        </button>
      </div>
      <div className ="navbarGhost" ></div>
      {showDialogForm && <DialogForm onClose={closeDialogForm} formType = 'add' />}
    </>
  )
}
