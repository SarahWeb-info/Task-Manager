import React, {useState }  from 'react'
import { BsCheckLg ,BsFillTrashFill,BsFillPencilFill ,BsBellFill } from "react-icons/bs";

export default function TaskCards(props) {
  const [dropBtn , setDropBtn] = useState(false);

  let cats = props.cats;
  
  let collabs = props.collab;
    
  const handleDropBtn =()=>{
    setDropBtn(!dropBtn);
  }

  return (
    <>
    <div className = "inlineFlexStatus" > 
        <div className='taskCard1'>
            <p>{props.date}</p>
            <p>
                <b>{props.month}</b><br/>
                <small>{props.day}</small>
            </p>
        </div>
        <div className='taskCard2'>
            <div>
                <p>{props.time}</p>
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
                <a href="/task" rel="noopener noreferrer">{props.title}</a>
            </h4>
            <div className='taskCard2Child2'>
            {cats.map((item, index) => {
                let color;
                if (item === 'work') {
                    color = "lightblue";
                } else if (item === 'daily') {
                    color = "lightgreen";
                } else if (item === 'family') {
                    color = "pink";
                } else if (item === 'important') {
                    color = "yellow";
                } else {
                    color = "beige";
                }

                return (
                    <React.Fragment key={index}>
                    <p style={{ backgroundColor: color }}>{item}</p>
                    </React.Fragment>
                );
            })}
            </div>   
            <div className = 'inlineFlexStatus'>
                <div>
                    {collabs.map((item, index) => (
                        <p key={index} class="icon">{item}</p>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
