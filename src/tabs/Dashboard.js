import React , {useState } from 'react'
import {BsCalendar2Week, BsSearch } from "react-icons/bs";
import '../css/dashboard.css';
import MainImg from '../imgs/intro6.jpg';
import TaskCards from '../components/TaskCards';
import AddTask from '../components/AddTask';
import { getTasksData } from '../getData';

export default function Dashboard() {
    const { data ,upcomingTasks, latestUpcomingDate, nextTask } = getTasksData();
    const [showDateSearch, setShowDateSearch] = useState(false);
    const [showTaskSearch, setShowTaskSearch] = useState(false);
    const [ addTaskDiv , setAddTaskDiv] = useState(false);

    const handleShowDateSearch =()=>{
        setShowDateSearch(!showDateSearch);
    }
    const handleShowTaskSearch =()=>{
        setShowTaskSearch(!showTaskSearch);
    }
    const handleAddTask =()=>{
        setAddTaskDiv(true);
        if (document.getElementsByClassName('addTaskForm')[0]) {
            document.getElementsByClassName('addTaskForm')[0].style.display = 'block';
        }
    }

    return ( 
    <>
     <div className='inlineFlexStatus'>
        <h1>Status heading</h1>
        <div className='statusChild2'>
            {showDateSearch && <input type="datetime" name="" id="dateSearch" style={{display : `${showDateSearch}`}} />}          
            <label htmlFor="dateSearch" onClick={handleShowDateSearch}><BsCalendar2Week/></label>
            
            {showTaskSearch && <input type="text" name="" id="taskSearch" style={{display : `${showTaskSearch}`}}  />}                   
            <label htmlFor="taskSearch" onClick={handleShowTaskSearch}><BsSearch/></label>
        </div>
    </div> 

    <div className = "inlineFlexStatus dayCard" > 
        <img src= {MainImg} alt="..." />
        <div>
            <h3>August'22</h3>
            <p>13 days left</p>
        </div>
    </div>
    <div>
    {/* {upcomingTasks.map((date) => (
          <TaskCards
            key={date}
            title={data[date].Title}
            task={data[date].Task}
            alarm={data[date].Alarm}
            time={data[date].Time}
          />
        ))} */}
    </div>
    <div className='addTaskIcon-container'>
        <div className='addTaskIcon' onClick={handleAddTask}>
            +
        </div>
    </div>
    {addTaskDiv ? <AddTask /> : null }    
    </>
    )
}

