import React from 'react';
import Button from './Button';

export default function Navbar(props) {
    const {navHeight , appWidth } = props;
    // if page is main , imp status 1 else status to
    return ( 
        <> 
        <div className="navbar-Container" style={{height: `${navHeight}`,width: `${appWidth}`}}>
            <Button content="BsListNested" event="openLeft" toggleDiv="myDropmenu" addClass="noBtn "/>
            <div className="myDropmenu" style={{top: '0',left: '-200%',width: `${appWidth}`,height: '100vh'}}>
                <Button content="BsArrowBarLeft" event="closeLeft"  toggleDiv="myDropmenu" />
                <a href="http://" target="_blank" rel="noopener noreferrer">Link 1</a>
                <a href="http://" target="_blank" rel="noopener noreferrer">Link 2</a>
                <a href="http://" target="_blank" rel="noopener noreferrer">Link 3</a>
                <a href="http://" target="_blank" rel="noopener noreferrer">Link 4</a>
            </div>
            
            <div className="nav_sec2">
                <Button content="BsFillMoonFill" event="changeMode" addClass="icon" />
                <Button content="BsBellFill" event="tothink" addClass="noBtn" />
                <Button content="logo" event="openRight" toggleDiv="myDropmenu" addClass="icon" />
                <div className="myDropmenu" style={{top: '0',right: '-100%',width: `30vw`,height: '100vh'}}>
                    <Button content="BsArrowBarRight" event="closeRight"  toggleDiv="myDropmenu" addClass="closeBtn" />
                    <a href="http://" target="_blank" rel="noopener noreferrer">Link 1</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Link 2</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Link 3</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">Link 4</a>
                </div>
            </div>
        </div>
        <div style = {{ backgroundColor : 'transparent', height: `${navHeight}`, width : `${appWidth}`}} ></div>
        </>
    )
}
