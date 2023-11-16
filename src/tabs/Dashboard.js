import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {BsSearch , BsBellFill} from "react-icons/bs";
import '../css/dashboard.css';
import MainImg from '../imgs/intro6.jpg';
import TaskCards from '../components/TaskCards';
import AddTask from '../components/AddTask';

export default function Dashboard() {
    const [showStringInput,
        setShowStringInput] = useState(false);
    const [addTaskDiv,
        setAddTaskDiv] = useState(false);
    //1- get the current time moving in useEffect per sec
    const [currentTime,
        setCurrentTime] = useState();
    const [showNextTime,
        setShowNextTime] = useState();

        // 3- sort the data in arrays - todo (ascending) - done (descending) - missed
        // (descending) . do this in dataSort function
        let todoArray = [];
        let doneArray = [];
        let missedArray = [];
        // states for display    
        const [displayArray , setDisplayArray] = useState(todoArray);
        const [displayArrayName , setDisplayArrayName] = useState("The To Do's");
        
        // 2 - get the data from local storage
        let dataObj = JSON.parse(localStorage.getItem('tasks')) || {};
        //converting data object in array of keys and values
        const data = Object.entries(dataObj);

    const dataSort = () => {
        for (let i in data) {
            // console.log(data[i]); //the whole task
            let sortTask = data[i];
            let status = data[i][1].Status;
            if (status === "missed") {
                missedArray.push(sortTask);
            } else if (status === "to do") {
                todoArray.push(sortTask);
            } else if (status === "done") {
                doneArray.push(sortTask);
            }
        }
        //sort arrays according to the dates
        todoArray.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); //ascending
        doneArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //descending
        missedArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //ascending
        //4 - get nextTask from array todo[0]
    }
    dataSort();

    let nextTask = todoArray[0];
    let nextTaskTime = nextTask[1].Time;
    let alarmDisplay = false;
    if (nextTask[1].Alarm) {
      alarmDisplay = true;
    }else{
      alarmDisplay = false;
    }

    useEffect(() => {
        // This will run once when the component mounts
        const intervalId = setInterval(() => {
            // This will update the current date every second
            setCurrentTime(moment().format('Do MMM YY, h:mm:ss a'));
            setShowNextTime(moment(nextTaskTime, "YYYYMMDD").fromNow());
            //   6 - if nextTask.time === currentTime , give notification and nextTask.alarm
            // if true . also call dataSort function for sorting the task to the other
            // array
            if (moment(currentTime).isSame(nextTaskTime)) {
                const result = window.confirm('Are you doing your task now?');
                if (result) {
                    nextTask[1].Status = "done";
                } else {
                    nextTask[1].Status = "missed";
                }
                dataSort();
                // 7 - if nextTask.time < currentTime , set nextTask.alarm to false and
                // nextTask.status to "missed" if not "done" . also call dataSort function for
                // sorting the task to the other array
            } else if (moment(nextTaskTime).isBefore(currentTime)) {
                if (nextTask[1].Status !== "done") {
                    nextTask[1].Status = "done";
                }
                dataSort();
            }
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const handleShowStringInput = () => {
        setShowStringInput(!showStringInput);
    }
    const handleAddTask = () => {
        setAddTaskDiv(true);
        if (document.getElementsByClassName('addTaskForm')[0]) {
            document.getElementsByClassName('addTaskForm')[0].style.display = 'block';
        }
    }

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
    return ( 
      <> 
    <div className="inlineFlexStatus dayCard">
        <img src={MainImg} alt="..."/>
        <div>
            <h3>{currentTime}</h3>
            <span>{alarmDisplay && <span className='highlighter'><BsBellFill /> </span> }<i>Next Task in {showNextTime}</i></span>
        </div>
    </div> 
  
    <div className = 'inlineFlexStatus'>
      <div>
        <button onClick={() => handleArrayDisplays(3)} className='noBtn'>Missed</button>
        <button onClick={() => handleArrayDisplays(2)} className='noBtn'>Done's</button>
        <button onClick={() => handleArrayDisplays(1)} className='noBtn'>To Do's</button>
      </div>
      < div className = 'statusChild2' >
        {showStringInput && <input type="text" id="inputSearch"/>}
        <label htmlFor = "inputSearch" onClick = {handleShowStringInput}>
           <BsSearch/>
        </label>
            
      <input type="date" style={{width:'1.8vw' , fontSize:'1.8vw' , color : 'white',userSelect:'none' , border: '0px' , outline: '0px'}}  / > </div> < /div> 
    <div>
    <h1>{displayArrayName}</h1>
    {displayArray.map(([key, task]) => (
      <React.Fragment key={key}>
        <div className='grayLine'>
          <div></div>
          <div></div>
        </div>
        <TaskCards
          key={key}
          title={task.Title}
          task={task.Task}
          alarm={task.Alarm}
          time={task.Time}
          cats={task.Category}
          collab={task.Collaborates}
        />
      </React.Fragment>
    ))}
   </div>
   
   <div className='addTaskIcon-container'>
        <div className='addTaskIcon' onClick={handleAddTask}>
            +
        </div > </div>
    {addTaskDiv? <AddTask/> : null} 
    </>
    )
  }