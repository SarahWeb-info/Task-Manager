import React, {useState}  from 'react'
import { BsCheckLg ,BsFillTrashFill,BsFillPencilFill ,BsBellFill } from "react-icons/bs";

export default function TaskCards(props) {
  const [dropBtn , setDropBtn] = useState(false);
  const handleDropBtn =()=>{
    setDropBtn(!dropBtn);
  }
  const propDate = new Date(props.time);
  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];
  
  const month = monthNames[propDate.getMonth()];

  const date = propDate.getDate().toString().padStart(2, '0');
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(propDate);

  const hours = propDate.getHours().toString().padStart(2, '0');
  const minutes = propDate.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  return (
    <>
        <div className='grayLine'>
        <div></div>
        <div></div>
        </div>
    <div className = "inlineFlexStatus" > 
        <div className='taskCard1'>
            <p>{date}</p>
            <p>
                <b>{month}</b><br/>
                <small>{day}</small>
            </p>
        </div>
        {/* here should be loop for display tasks of same date */}
        <div className='taskCard2'>
            <div>
                <p>{time}</p>
                {dropBtn && 
                    <div>
                        <button><BsCheckLg /></button>
                        <button><BsFillTrashFill /></button>
                        <button><BsFillPencilFill /></button>
                        <button><BsBellFill /></button>
                    </div>
                }
                <button className='noBtn' onClick={handleDropBtn}>...</button>
            </div>
            <h4>
                <a href="http://" target="_blank" rel="noopener noreferrer">{props.title}</a>
            </h4>
            <div className='taskCard2Child2'>
                {/* set some basic colors and a misc color for unknown , 
                display these tasks by loop */}
                <p style = {{backgroundColor:'blue'}}>work</p>
                <p style = {{backgroundColor:'yellow'}}>me</p>
                <p style = {{backgroundColor:'green'}}>meeting</p>
            </div>   
        </div>
    </div>
    </>
  )
}
