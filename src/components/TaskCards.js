import React , {useState} from 'react'
import { editDone , editDlt , editAlarm } from '../modifyData';
import { BsCheckLg ,BsFillTrashFill,BsFillPencilFill ,BsBellFill } from "react-icons/bs";
import DialogForm from './DialogForm';

export default function TaskCard(props) {

    const [showDialogForm , setShowDialogForm] = useState(false);
    
    const closeDialogForm=()=>{
        setShowDialogForm(false);
    }

    let showAlarm = props.alarm;
    let cat = props.cat;
    let collab = props.collab;

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

    const editForm = (x) =>{
        setShowDialogForm(true);
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
                    time = {props.formTime}
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
                        <button onClick={editForm}><BsFillPencilFill /></button>
                        <button onClick={editDone(props.itemKey)}><BsCheckLg /></button>
                        <button onClick={editDlt(props.itemKey)}><BsFillTrashFill /></button>
                        <button onClick={editAlarm(props.itemKey)} style={props.alarm === true ? highlightedButtonStyle : buttonStyle} ><BsBellFill /></button>
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

                {props.cat.length>0 && 
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

