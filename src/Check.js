import React, { useState , useEffect } from 'react'
import { arrayFilter, dateObj ,calculateTimeLeft, getData ,strFilter,dateFilter} from './GetData.js';

export default function Check() {
    //passed/used functions
    //1- data 
    // 2-arrayFilter (with modifying status)
    //3-dateObj (this is to display)
    // used from dataObj - date , month , day
    //4 - calculate date with the current date
    //calculateTimeLeft
    //date filter
    //str filter
    

    //add task
    //modify task

    let data = getData();

    const [searchTitle , setSearchTitle] = useState("To Do's");
    const [arr , setArr] = useState(arrayFilter('to do'));
    
    let timeLeft = calculateTimeLeft();
    useEffect(() => {
        setInterval(() => {
            timeLeft = calculateTimeLeft();
            data = getData();
        }, 60000);
    
      return () => {
      }
    }, [])
    
    const searchAll = ()=>{
        setArr(data);
        setSearchTitle("All Tasks");
    }

    const searchArray = (x)=>{
        setArr(arrayFilter(x));
        if (x === "missed") {
            setSearchTitle("Oops ! You missed these ..");
        }else if (x === "done") {
            setSearchTitle("All Done :)");
        }else{
            setSearchTitle("To Do's");
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


    return (
    <div>

        <b>time left : {timeLeft}</b>

        <div>
            <button onClick={searchAll}>All</button>
            <button onClick={()=>searchArray("to do")}>To do</button>
            <button onClick={()=>searchArray("missed")}>Missed</button>
            <button onClick={()=>searchArray("done")}>Done</button>
        </div>

        <div>
            Date Search :
            <input type="date" onInput={(e) => displayDate(e.target.value)} />
        </div>

        <div>
            Task Search : 
            <input type="text" onInput={(e) => displayString(e.target.value)} />
        </div>

        <h1>{searchTitle}</h1>
        {arr.map((task, itemKey) => {
            const taskTime = dateObj(task[1].Time);

            return(
                <div key={itemKey} className='py-1'>

                            <small>{itemKey} - {task[0]} </small>
                            <br/>
                            <b>itemKey = {task[1].Title}</b>
                            <p>title= {task[1].Title}</p>
                            <p>task = {task[1].Task}</p>
                            <p>time = {task[1].Time}</p>

                            <b>{taskTime.date}{taskTime.month}{taskTime.day}{taskTime.year}</b>
                            <p>  alarm = {task[1].Alarm}</p>
                            <p>  cats = {task[1].Category}</p>
                            <p>  collab ={task[1].Collaborates}</p>
                            <p>  status ={task[1].Status}</p>
                        
                            <div>
                               <button>Edit</button>                 
                               <button>Done</button>                 
                               <button>Update</button>                 
                               <button>Delete</button>                          
                            </div>
                        </div>

            );
        })}

    </div>
  )
}
