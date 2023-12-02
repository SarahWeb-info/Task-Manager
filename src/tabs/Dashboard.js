import React, { useState ,useEffect  } from 'react';
import { arrayFilter, dateObj ,calculateTimeLeft, strFilter,dateFilter} from '../GetData.js';
import TaskCard from '../components/TaskCards.js';
import DialogForm from '../components/DialogForm.js';
import "../css/dashboard.css";
import { BsFunnel } from "react-icons/bs";
import Img from '../imgs/intro3.jpg';

export default function Dashboard() {
    const searchParams = new URLSearchParams(window.location.search);
    const filter = searchParams.get('filter');
    console.clear();
    console.log(filter);
    
    let str = "to do";
    if (filter) {
        str = filter;
    }

    const [ currDate , setCurrDate ] = useState(dateObj(new Date()));
    const [arr , setArr] = useState(arrayFilter(str));
    const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
    const [searchTitle , setSearchTitle] = useState(capitalizedStr);

    const [ timeLeft , setTimeLeft ] = useState(calculateTimeLeft());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrDate(dateObj(new Date()));
            setTimeLeft(calculateTimeLeft());
        }, 60000);
    
        // Cleanup function to clear the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, []); // The empty dependency array ensures this effect runs only once on mount
    

    const searchArray = (x)=>{
        if(x === "all"){
            setArr(arrayFilter(x));
            setSearchTitle("All Tasks");
            setSelectedFilter(x);
        }else if (x === "missed") {
            setArr(arrayFilter(x));
            setSearchTitle("Oops ! You missed these ..");
            setSelectedFilter(x);
        }else if (x === "done") {
            setArr(arrayFilter(x));
            setSearchTitle("All Done :)");
            setSelectedFilter(x);
        }else{
            setArr(arrayFilter(x));
            setSearchTitle("To Do's");
            setSelectedFilter(x);
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
    const [selectedFilter, setSelectedFilter] = useState(str);
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
                <p className={timeLeft.timeStyle}>{timeLeft.timeStr}</p>
            </div>
        </div>

        <div className='flexInline filterBar my-2'>
            <div>
                <BsFunnel />
                <button onClick={()=>searchArray("to do")} style={selectedFilter === "to do" ? highlightedButtonStyle : buttonStyle} >To Do's</button>
                <button onClick={()=>searchArray("missed")} style={selectedFilter === "missed" ? highlightedButtonStyle : buttonStyle} >Missed Tasks</button>
                <button onClick={()=>searchArray("done")} style={selectedFilter === "done" ? highlightedButtonStyle : buttonStyle} >Done Tasks</button>
                <button onClick={()=>searchArray("all")} style={selectedFilter === "all" ? highlightedButtonStyle : buttonStyle} >All </button>
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
                            <TaskCard id = {task[0]} task= {task[1]} time = {formatedTime.time} /> 
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
