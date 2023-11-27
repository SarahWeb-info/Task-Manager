import React, { useState  , useEffect } from 'react'
import dateFormat ,{ data , getData ,arrayFilter,strFilter,dateFilter} from '../GetData.js';
import TaskCard from '../components/TaskCards.js';
import DialogForm from '../components/DialogForm.js';
import "../css/dashboard.css";
import { BsFunnel } from "react-icons/bs";
import Img from '../imgs/intro3.jpg';

export default function Dashboard() {
    // console.clear();
    const [ currDate , setCurrDate ] = useState(dateFormat(new Date()));
    
    const [arr , setArr] = useState(data);
    const [filterHeading , setFilterHeading ] = useState("To Do's");

    // const [ timeLeftStr , setTimeLeftStr ] = useState("");
    
    const calculateDate = (time) => {
        let currentTime = new Date();
        currentTime = currentTime.getTime();
        
        let x = time - currentTime ;
        
        if ( x > 0 ) {
            console.log("caluclate the time left");
        }else{
            console.log("keep the timeLeftStr empty");
        }
    }
    
    if (arr.length > 0) {
        let timeLeft  = new Date(arr[0][1].Time);
        calculateDate(timeLeft.getTime());
    }

    useEffect(() => {
      return () => {
        setInterval(() => {
            setCurrDate(dateFormat(new Date()));
        }, 60000);
      };
    }, []);

    const [showDialogForm , setShowDialogForm] = useState(false);
    
    const openDialogForm=()=>{
        setShowDialogForm(true);
    }
    
    const closeDialogForm=()=>{
        setShowDialogForm(false);
    }

    //for highlighting the active filter
    const [selectedFilter, setSelectedFilter] = useState("to do");
    const buttonStyle = {
        color: 'var(--color)',
    };
    
    const highlightedButtonStyle = {
        color: 'var(--highlighter)', // Set the highlighted color
    };

    const displayArrays=(x)=>{
        if (x === "M") {
            setFilterHeading("Tasks Missed");
            setSelectedFilter("missed");
            setArr(arrayFilter("missed"));
        }else if (x === "D"){
            setFilterHeading("Tasks Done");
            setSelectedFilter("done");
            setArr(arrayFilter("done"));
        }else if (x === "T"){
            setFilterHeading("To Do's");
            setSelectedFilter("to do");
            setArr(arrayFilter("to do"));
        }else {
            setFilterHeading("All Tasks");
            setSelectedFilter("all");
            setArr(data);
        }
    }

    const displayString=(str)=>{
        setArr(strFilter(str));
        setFilterHeading(`Search Results for ${str}`);
    }

    const displayDate=(d)=>{
        setArr(dateFilter(d));
        setFilterHeading(`Search Results for ${d}`);
    }

  let prevDate;
  return (
    <div>
        <div className='flexInline dayCard'>
            <img src={Img} alt=""/>
            <div className='flex-column justify-content-center align-items-end'>
                <h2>{currDate.time} {currDate.monthLong} ' {currDate.date}</h2>
                <p>22 minutes left</p>
            </div>
        </div>

        <div className='flexInline filterBar my-2'>
            <div>
                <BsFunnel />
                <button onClick={()=>displayArrays("T")} style={selectedFilter === "to do" ? highlightedButtonStyle : buttonStyle} >To Do's</button>
                <button onClick={()=>displayArrays("M")} style={selectedFilter === "missed" ? highlightedButtonStyle : buttonStyle} >Missed Tasks</button>
                <button onClick={()=>displayArrays("D")} style={selectedFilter === "done" ? highlightedButtonStyle : buttonStyle} >Done Tasks</button>
                <button onClick={()=>displayArrays("")} style={selectedFilter === "all" ? highlightedButtonStyle : buttonStyle} >All </button>
            </div>
            <div className = 'flexInline' >
                <span>
                    <input type="text" placeholder='Search for Task' onInput={(e) => displayString(e.target.value)}/>
                </span>
                <span>
                    <input type="date" onInput={(e) => displayDate(e.target.value)}/>
                </span>
            </div>
        </div>

        <h1>{filterHeading} : </h1>
        {arr.map((task, itemKey) => {
            const formatedTime = dateFormat(task[1].Time);
            const showGrayLine = formatedTime.date !== prevDate;
            prevDate = formatedTime.date; // Set the value of prevDate here
            return(
                <div key={itemKey} className='py-1'>
                    {showGrayLine && (
                        <>
                        <div className='grayLine'>
                        <div></div>
                        <div></div>
                        </div>
                        </>
                    )}
                    
                    <div className='flexInline'>

                        <div className='taskCard-Dates'>
                        {showGrayLine && (
                            <>
                                <p>{formatedTime.date}</p>
                                <p>
                                    <b>{formatedTime.month}</b><br/>
                                    <small>{formatedTime.day}</small>
                                </p>
                            </>
                        )}    
                        </div>
                    
                        <div className='taskCard-Details'>
                            <TaskCard 
                                itemKey = {task[0]}
                                title= {task[1].Title}
                                task = {task[1].Task}
                                time = {formatedTime.time}
                                date = {formatedTime.date}
                                day = {formatedTime.day}
                                month = {formatedTime.month}
                                alarm = {task[1].Alarm}
                                cats = {task[1].Category}
                                collab ={task[1].Collaborates}
                                status ={task[1].Status}
                                /> 
                        </div>

                    </div>
                </div>        
            );
        })}
        <div className='addTaskIcon-container'>
          <div className='addTaskIcon' onClick={openDialogForm}>
              +
          </div>
        </div>
    
        {showDialogForm && <DialogForm onClose={closeDialogForm} formType = 'add' />}
        { arr.length<=0 && <p>No Task found . </p> }

    </div>
  )
}
