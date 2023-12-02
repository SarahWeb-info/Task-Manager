import React  from 'react';
import TripleDotsMenu from './TripleDotsMenu';
import { BsBellFill } from "react-icons/bs";

export default function TaskCard(props) {

    let task = props.task;
    let showAlarm = task.Alarm;
    let cat = task.Category;
    let collab = task.Collaborates;

    return (
    <>
        <div className='flexInline'>
            <span>
                {showAlarm && <BsBellFill />}{props.time}
            </span>
            <div>
                <TripleDotsMenu task = {task} id={props.id} />
            </div>
        </div>

        <div>
            <h4>
                <a href={`/task?id=${props.id}`}>{task.Title}</a>
            </h4>

            <div className='flexInline'>

                {cat.length>0 && 
                    <div  className = 'd-inline-flex catBadges'>
                        {cat.map((item, index) => {
                            let color ;
                            if (item === 'work') {
                                color = "blue";
                            } else if (item === 'daily') {
                                color = "green";
                            } else if (item === 'family') {
                                color = "pink";
                            } else if (item === 'important') {
                                color = "yellow";
                            } else {
                                color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                            }
                            return (
                                <React.Fragment key={index}>
                                        <p className='px-2' style={{ backgroundColor: color }}>{item}</p>
                                </React.Fragment>
                            );     
                        })}  
                    </div>
                }
        
                {collab.length>0 && 
                    <div className = 'd-inline-flex'>   
                        {collab.map((item, index) => (
                            <p key={index} className="icon">{item}</p>
                        ))}
                    </div>
                }
            </div>
        </div>
    </>
  )
}

