import React, { useState  , useEffect } from 'react'
import { arrayFilter, dateObj ,calculateTimeLeft, getData ,strFilter,dateFilter} from '../GetData.js';
import TaskCard from '../components/TaskCards.js';
import DialogForm from '../components/DialogForm.js';
import "../css/dashboard.css";
import { BsFunnel } from "react-icons/bs";
import Img from '../imgs/intro3.jpg';

export default function Dashboard() {
    // console.clear();
    const [ currDate , setCurrDate ] = useState(dateObj(new Date()));
    let data = getData();
    const [arr , setArr] = useState(arrayFilter('to do'));
    const [searchTitle , setSearchTitle] = useState("To Do's");

    const [ timeLeft , setTimeLeft ] = useState(calculateTimeLeft());

    useEffect(() => {
        setInterval(() => {
            setCurrDate(dateObj(new Date()));
            setTimeLeft(calculateTimeLeft());
            data = getData();
        }, 60000);
    
      return () => {
      }
    }, [])

    const searchAll = ()=>{
        setArr(data);
        setSearchTitle("All Tasks");
        setSelectedFilter("all");
    }

    
    const searchArray = (x)=>{
        setArr(arrayFilter(x));
        if (x === "missed") {
            setSearchTitle("Oops ! You missed these ..");
            setSelectedFilter("missed");
        }else if (x === "done") {
            setSearchTitle("All Done :)");
            setSelectedFilter("done");
        }else{
            setSearchTitle("To Do's");
            setSelectedFilter("to do");
        } 
    }
    
    const displayString=(str)=>{
        setArr(strFilter(str));
        setSearchTitle(`Search results for ${str}`);

    }
    
    const displayDate=(d)=>{
        setArr(dateFilter(d));
        setSearchTitle(`Search results for ${d}`);
    }
    
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

  let prevDate;

  return (
    <div>
        <div className='flexInline dayCard'>
            <img src={Img} alt=""/>
            <div className='flex-column justify-content-center align-items-end'>
                <h2>{currDate.time} {currDate.monthLong} ' {currDate.date}</h2>
                <p>{timeLeft}</p>
            </div>
        </div>

        <div className='flexInline filterBar my-2'>
            <div>
                <BsFunnel />
                <button onClick={()=>searchArray("to do")} style={selectedFilter === "to do" ? highlightedButtonStyle : buttonStyle} >To Do's</button>
                <button onClick={()=>searchArray("missed")} style={selectedFilter === "missed" ? highlightedButtonStyle : buttonStyle} >Missed Tasks</button>
                <button onClick={()=>searchArray("done")} style={selectedFilter === "done" ? highlightedButtonStyle : buttonStyle} >Done Tasks</button>
                <button onClick={searchAll} style={selectedFilter === "all" ? highlightedButtonStyle : buttonStyle} >All </button>
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

        <h1>{searchTitle}  </h1>
        {arr.map((task, itemKey) => {
            const formatedTime = dateObj(task[1].Time);
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
                                formTime = {task[1].Time}
                                time = {formatedTime.time}
                                date = {formatedTime.date}
                                day = {formatedTime.day}
                                month = {formatedTime.month}
                                alarm = {task[1].Alarm}
                                cat = {task[1].Category}
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
        { arr.length<=0 && <p>No Tasks found . </p> }

    </div>
  )
}
