import React, { useState } from 'react'
import TaskCards from '../components/TaskCards';
import '../css/dashboard.css';
import {BsSearch , BsBellFill} from "react-icons/bs";

export default function Dashboard() {
  const [showStringInput, setShowStringInput] = useState(false);

    let dataObj = JSON.parse(localStorage.getItem('tasks')) || {};
    //converting data object in array of keys and values
    const data = Object.entries(dataObj);
    data.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //descending

    let dataPresent = false;
    if (data.length>0) {
      dataPresent = true;
    }else{
      dataPresent = false;
    }

    //get the date format
    const dateFormat = (paramDate) => {
      let dateObject;
    
      // Check if paramDate is a string, then convert to Date object
      if (typeof paramDate === 'string') {
        dateObject = new Date(paramDate);
      } else if (paramDate instanceof Date) {
        dateObject = paramDate;
      } else {
        throw new Error('Error .There is no date or a string to calculate.');
      }
    
      // Extract individual components
      const year = dateObject.getFullYear();
      const monthLong = dateObject.toLocaleDateString('en-US', { month: 'long' })
      const month = dateObject.toLocaleDateString('en-US', { month: 'short' });
      const date = dateObject.getDate();
      const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
    
      // Return an object with the extracted components
      return {
        year,
        monthLong,
        month,
        date,
        day,
        hours,
        minutes,
      };
    };
  
    const [ showArr , setShowArr ] = useState(data);

    const arrayFilter=(input)=>{
      let arr = [];
      let searchFor = "to do";

      if (input === 3) {
        searchFor = "missed";
      }else if (input === 2) {
        searchFor = "done";
      }else if (input === 1) {
        searchFor = "to do";
      }else if (input === 0) {
        arr = data;
      }

      for (let i in data) {
        let sortTask = data[i]; //the whole tasks
        
        if (data[i][1].Status === searchFor) {
          arr.push(sortTask);
        }  
      }
      
      setShowArr(arr);
    }
    
    const strFilter =(inputValue)=>{
      let arr = [];
      let searchFor = inputValue.toLowerCase();
      
      for (let i in data) {
        let sortTask = data[i]; //the whole tasks
        
        let searchIn = data[i][1].Title + data[i][1].Task + data[i][1].Category + data[i][1].Collaborates;
        searchIn = searchIn.toLowerCase();

        // console.log(searchIn);
        if (searchIn.includes(searchFor) ) {
          arr.push(sortTask);
          console.log("got it ");
        }  
      }
      setShowArr(arr);
    }

    const dateFilter =(inputValue)=>{
      let arr = [];
      let inputDate = dateFormat(inputValue);

      for (let i in data) {
        let sortTask = data[i]; //the whole tasks
        let taskDate = dateFormat(data[i][1].Time);
        // here we have to compare the dates (not time) -taskDate and inputDate
        if( taskDate.year === inputDate.year && taskDate.month === inputDate.month && taskDate.date === inputDate.date ){
          arr.push(sortTask);
          console.log("got it ");
        }
      }
      setShowArr(arr);
    }

    let prevDate;
    return (
      <>
      <div className = 'inlineFlexStatus'>
        <div className = 'statusChild2'>
          
          <button onClick={()=>arrayFilter(0)} className='noBtn'>ALL</button>
          <button onClick={()=>arrayFilter(3)} className='noBtn'>Missed</button>
          <button onClick={()=>arrayFilter(2)} className='noBtn'>Done's</button>
          <button onClick={()=>arrayFilter(1)} className='noBtn'>To Do's</button>
        </div>
        <div className = 'statusChild2' >
          <input
          type="text"
          id="inputSearch"
          onInput = {(e) => strFilter(e.target.value)}
          style={{color : 'black'}}
        />
  
          <label htmlFor = "inputSearch">
            <BsSearch />
          </label>
              
          <input
          type="date"
          onInput = {(e) => dateFilter(e.target.value)}
          style={{color : 'black'}}
        />

        </div> 
      </div> 

      {
        dataPresent && showArr.map(([key, task]) => {
          const formatedTime = dateFormat(task.Time);
          const showGrayLine = formatedTime.date !== prevDate;
          let taskTime = formatedTime.hours +":" + formatedTime.minutes ;
          prevDate = formatedTime.date; // Set the value of prevDate here

          return (
            <React.Fragment key={key}>
              {showGrayLine && (
                <div className='grayLine'>
                  <div></div>
                  <div></div>
                </div>
              )}
              <TaskCards
                key={key}
                title={task.Title}
                task={task.Task}
                alarm={task.Alarm}
                time={taskTime}
                date ={formatedTime.date}
                month= {formatedTime.month}
                day= {formatedTime.day}
                cats={task.Category}
                collab={task.Collaborates}
              />
            </React.Fragment>
          );
        })}

        {!dataPresent && <p>Data is not present</p>}
      </>
    );
  }
