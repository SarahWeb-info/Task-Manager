import React , {useState} from 'react';
import DialogForm from './DialogForm.js';
import { editDone , editDlt , editAlarm } from '../modifyData.js';
import { BsCheckLg ,BsFillTrashFill,BsFillPencilFill ,BsBellFill } from "react-icons/bs";

export default function TripleDotsMenu(props) {
    let task = props.task;
    const [showDialogForm , setShowDialogForm] = useState(false);
    
    const closeDialogForm=()=>{
        setShowDialogForm(false);
    }
    const [btnMenu , setBtnMenu] = useState(false);
    
    const buttonStyle = {
        color: 'var(--bg)',
    };
    
    const highlightedButtonStyle = {
        color: 'var(--highlighter)', // Set the highlighted color
    };

    const handleBtnMenu =() =>{
        setBtnMenu(!btnMenu);
    }

    const editForm = () =>{
        setShowDialogForm(true);
    }    

    return (
    <>
     {btnMenu && 
            <span className='btnMenu'>
                <button onClick={editForm}><BsFillPencilFill /></button>
                <button onClick={editDone(props.id)}><BsCheckLg /></button>
                <button onClick={editDlt(props.id)}><BsFillTrashFill /></button>
                <button onClick={editAlarm(props.id)} style={props.alarm === true ? highlightedButtonStyle : buttonStyle} ><BsBellFill /></button>
            </span>
        }
        <button className='noBtn' onClick={handleBtnMenu}>...</button> 
        {showDialogForm && 
                <DialogForm 
                    onClose={closeDialogForm} 
                    formType = 'edit'
                    newKey = {props.id} 
                    title = {task.Title}
                    task = {task.Task}
                    time = {task.Time}
                    status = {task.Status}
                    alarm = {task.Alarm}
                    cat = {task.Category}
                    collab = {task.Collaborates}
                    />
        }
    </>
  )
}
