import React from 'react';
import './css/sketch.css';
import Button from './components/Button';

export default function main() {
  let appWidth = "786px";
  let navHeight = "8vh";
  let statusHeight = "15vh";
  return (
    <div className="sketch" style={{width : `${appWidth}` , position: 'relative', margin : '0 auto' }}>
    <div className="navbar-Container" style={{ backgroundColor : 'olive', height : `${navHeight}`, width : `${appWidth}`,position:'fixed' , display : 'inline-flex' , justifyContent: 'space-between',alignItems: 'center' , padding : '0 0.5vw' , zIndex : '100'}} >
        <button>m</button>  
  {/* dropdown div */}
    <div className="myDropmenu" style={{position: 'absolute' , top : '0', left : '0',zIndex : '101' , backgroundColor : 'skyblue' ,  width : `${appWidth}`,height:'100vh' , display : 'flex' , flexDirection : 'column', alignItems : 'flex-start' , padding : '3vh 2vw' , color : 'black' , display : 'none'}}>  
        {/* <button style={{textAlign : 'left'}}>X</button> */}
        <Button content="BsArrowBarLeft" event="close" addClass="noBtn btnNavigator"  toggleDiv="dropMenu" />
        <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 1</a>
        <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 2</a>
        <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 3</a>
        <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 4</a>
    </div>
      <div style={{display : 'inline-flex'}}>
        <button style={{margin : '0 1vw'}}>m</button>  
        <button style={{margin : '0 1vw'}}>m</button>  
        <button style={{margin : '0 1vw'}}>m</button>  
        <div className="myDropmenu" style={{position: 'absolute' , top : '0', right : '0',zIndex : '101' , backgroundColor : 'skyblue' ,  width : `30vw`,height:'100vh' , display : 'flex' , flexDirection : 'column', justifyContent : 'flex-start' , padding : '3vh 2vw' , color : 'black', display : 'none' }}>  
        {/* <button style={{textAlign : 'right'}}>X</button> */}
        <Button content="BsArrowBarLeft" event="close" addClass="noBtn btnNavigator"  toggleDiv="dropMenu" />
          <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 1</a>
          <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 2</a>
          <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 3</a>
          <a href="http://" target="_blank" rel="noopener noreferrer" style={{margin : '1vh 0'}}>Link 4</a>
        </div>
      </div>
     
    </div>
    <div className="navbar-Container" style={{ backgroundColor : 'transparent', height : '8vh', width : `${appWidth}`}} >nav margins</div>
    <div className="status-Container" style={{ backgroundColor : 'red',padding : '0 0.5vw', height : `${statusHeight}`,position:'fixed',top:`${statusHeight}`, width : `${appWidth}`,position:'fixed' }}>
        <div style={{display:'inline-flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1>Status</h1>
          <form action="">
            <input type="datetime-local" name="" id="" />
            <input id='searchTask' type="text" />
            <label htmlFor="searchTask">0</label>
          </form>
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <b>August 28</b>
            <sm>Next Task: 20 min later</sm>
          </div>
        </div>
    </div>
    <div className="status-Container" style={{ backgroundColor : 'transparent', height : `${statusHeight}`,top:`${statusHeight}` , width : `${appWidth}` }}>status margins</div>
    <div className="body-Container" style={{ backgroundColor : 'blue', height : 'auto' , minHeight : '82vh'}}>body scroll</div>
  </div>
  )
}
