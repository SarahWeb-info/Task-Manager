import React , {useState} from 'react'
import { BsCheckLg ,BsFillTrashFill,BsFillPencilFill ,BsBellFill } from "react-icons/bs";
import DialogForm from './DialogForm';

export default function TaskCard(props) {

    const [showDialogForm , setShowDialogForm] = useState(false);
    
    const closeDialogForm=()=>{
        setShowDialogForm(false);
    }

    let showAlarm = props.alarm;
    let cats = props.cats;
    let collab = props.collab;

    const [btnMenu , setBtnMenu] = useState(false);
    
    const buttonStyle = {
        color: 'var(--bg)',
    };
    
    const highlightedButtonStyle = {
        color: 'var(--highlighter)', // Set the highlighted color
    };

    const getTask = ()=>{
        const data = JSON.parse(localStorage.getItem('task')) || {};
        return data;
    }
    
    const handleBtnMenu =() =>{
        setBtnMenu(!btnMenu);
    }

    const handleBtnBar=(x)=>{
        let task = getTask();
        if (x === "edit") {
            console.log(task[props.itemKey]);
            setShowDialogForm(true);
        }else if (x === "done"){
            task[props.itemKey].Status = "done";
        }else if (x === "dlt"){
            delete task[props.itemKey];
        }else {
            task[props.itemKey].Alarm = !task[props.itemKey].Alarm;
        }
    }    
    
    return (
    <>
        {showDialogForm && 
                <DialogForm 
                    onClose={closeDialogForm} 
                    formType = 'edit'
                    newKey = {props.itemKey} 
                    title = {props.title}
                    task = {props.task}
                    time = {props.time}
                    status = {props.status}
                    alarm = {props.alarm}
                    cat = {props.cat}
                    collab = {props.collab}
                    />
        }

        <div className='flexInline'>
            <span>
                {showAlarm && <BsBellFill />}{props.time}
            </span>
            <div>
                {btnMenu && 
                    <span className='btnMenu'>
                        <button onClick={()=>handleBtnBar("edit")}><BsFillPencilFill /></button>
                        <button onClick={()=>handleBtnBar("done")}><BsCheckLg /></button>
                        <button onClick={()=>handleBtnBar("dlt")}><BsFillTrashFill /></button>
                        <button onClick={()=>handleBtnBar("")} style={props.alarm === true ? highlightedButtonStyle : buttonStyle} ><BsBellFill /></button>
                    </span>
                }
                <button className='noBtn' onClick={handleBtnMenu}>...</button>
            </div>
        </div>

        <div>
            <h4>
                <a href="/task" rel="noopener noreferrer">{props.title}</a>
            </h4>

            <div className='flexInline'>

                {props.cats.length>0 && 
                    <div  className = 'd-inline-flex catBadges'>
                        {cats.map((item, index) => {
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
        
                {props.collab.length>0 && 
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

