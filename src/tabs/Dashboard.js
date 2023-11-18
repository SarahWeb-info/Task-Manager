import React, {useEffect, useState} from 'react';
import {BsSearch , BsBellFill} from "react-icons/bs";
import '../css/dashboard.css';
import MainImg from '../imgs/intro6.jpg';
import TaskCards from '../components/TaskCards';
import AddTask from '../components/AddTask';

export default function Dashboard() {
  const [showStringInput, setShowStringInput] = useState(false);

  const handleShowStringInput = () => {
    setShowStringInput(!showStringInput);
  }

  const [addTaskDiv,setAddTaskDiv] = useState(false);
  const handleAddTask = () => {
    setAddTaskDiv(true);
    if (document.getElementsByClassName('addTaskForm')[0]) {
        document.getElementsByClassName('addTaskForm')[0].style.display = 'block';
    }
  }

  const [currTime, setCurrTime] = useState(new Date());
  const [displayDate, setDisplayDate] = useState({
    year : "",
    monthLong : "", 
    month : "",
    date : "",
    day : "",
    hours : "",
    minutes : "",
  });
  const [displayTimeLeft, setDisplayTimeLeft] = useState("");

  // 2 - get the data from local storage
  let dataObj = JSON.parse(localStorage.getItem('task')) || {};
  //converting data object in array of keys and values
  const data = Object.entries(dataObj);
  
  let todoArray = [];
  let doneArray = [];
  let missedArray = [];
  
  const sortedArrays = () =>{
    todoArray = [];
    doneArray = [];
    missedArray = [];

    for (let i in data) {
      let sortTask = data[i]; //the whole tasks
      let taskDate = data[i][1].Time;
      
      let secLeft = Date.parse(taskDate) - Date.parse(currTime);
      if (secLeft < 0) {
        
        if (data[i][1].Status !== 'done') {
            data[i][1].Status = "missed";
            missedArray.push(sortTask);
        }else{
            doneArray.push(sortTask);
        }

      }else if (secLeft === 0) {
            console.log('it is time to do the task');
      }else if (secLeft > 0) {
            todoArray.push(sortTask);
      }  
    }      
    //sort arrays according to the dates
    todoArray.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); //ascending
    doneArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //descending
    missedArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //ascending
  }
  sortedArrays();
  
  let nextTask = todoArray[0];
  let nextTaskTime = nextTask[1].Time;
  let alarmDisplay = false;
  if (nextTask[1].Alarm) {
    alarmDisplay = true;
  }else{
    alarmDisplay = false;
  }
  
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime(new Date());
      setDisplayDate(dateFormat(currTime));

      let millisecondsLeft = Date.parse(nextTaskTime) - Date.parse(currTime);
      let secondsLeft = Math.floor(millisecondsLeft / 1000);
  
      if (secondsLeft < 60) {
        // Display seconds
        setDisplayTimeLeft(`${secondsLeft} seconds`);
      } else {
        let minutesLeft = Math.floor(secondsLeft / 60);
        if (minutesLeft < 100) {
          // Display minutes
          setDisplayTimeLeft(`${minutesLeft} minutes`);
        } else {
          let hoursLeft = Math.floor(minutesLeft / 60);
          if (hoursLeft < 24) {
            // Display hours
            setDisplayTimeLeft(`${minutesLeft} hours`);
          } else {
            let daysLeft = Math.floor(hoursLeft / 24);
            if (daysLeft < 300) {
              // Display days
              setDisplayTimeLeft(`${daysLeft} days`);
            } else {
              let monthsLeft = Math.floor(daysLeft / 30.44); // Assuming an average month
              // Display months
              setDisplayTimeLeft(`${monthsLeft} months`);
            }
          }
        }
      }
    }, 1000);
  
    // Clean up the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);
  
  const [displayArray , setDisplayArray] = useState(todoArray);
  const [displayArrayName , setDisplayArrayName] = useState("The To Do's");

  const handleArrayDisplays =(x)=>{
    if (x===3) {
      setDisplayArrayName("Missed Tasks");
      setDisplayArray(missedArray);
    }else if (x===2) {
      setDisplayArrayName("Done");
      setDisplayArray(doneArray);
    }else {
      setDisplayArrayName("To Do's");
      setDisplayArray(todoArray);
    }
  }
  let prevDate ;
  return ( 
    <> 
      <div className="inlineFlexStatus dayCard">
          <img src={MainImg} alt="Get status of upcoming Task"/>
          <div>
              <h3>{displayDate.hours}:{displayDate.minutes} {displayDate.month} '{displayDate.date} {displayDate.day}</h3>
              <span>{alarmDisplay && <span className='highlighter'><BsBellFill /> </span> }<i>Next Task in {displayTimeLeft}</i></span>
          </div>
      </div> 

      <div className = 'inlineFlexStatus'>
        <div>
          <button onClick={() => handleArrayDisplays(3)} className='noBtn'>Missed</button>
          <button onClick={() => handleArrayDisplays(2)} className='noBtn'>Done's</button>
          <button onClick={() => handleArrayDisplays(1)} className='noBtn'>To Do's</button>
        </div>
        <div className = 'statusChild2' >
          {showStringInput && <input type="text" id="inputSearch"/>}
          <label htmlFor = "inputSearch" onClick = {handleShowStringInput}>
            <BsSearch/>
          </label>
              
          <input type="date" style={{width:'1.8vw' , fontSize:'1.8vw' , color : 'white',userSelect:'none' , border: '0px' , outline: '0px'}}  />
        </div> 
      </div> 
    
      <div>
      <h1>{displayArrayName}</h1>
      <div className='grayLine'>
          <div></div>
          <div></div>
        </div>
        {displayArray.map(([key, task]) => {
          const formatedTime = dateFormat(task.Time);
          const showGrayLine = formatedTime.date !== prevDate;
          let taskTime = formatedTime.hours +":" + formatedTime.minutes ;
          prevDate = formatedTime.date; // Set the value of prevDate here
          return (
            <React.Fragment key={key}>
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
              {showGrayLine && (
                <div className='grayLine'>
                  <div></div>
                  <div></div>
                </div>
              )}
            </React.Fragment>
          );
        })}

    </div>
   
    <div className='addTaskIcon-container'>
          <div className='addTaskIcon' onClick={handleAddTask}>
              +
          </div > </div>
      {addTaskDiv? <AddTask/> : null} 
      </>
   );
  }
