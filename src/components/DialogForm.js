import React , {useState , useEffect} from 'react';
import dateFormat from '../GetData.js';
import '../css/dialogForm.css';
import { BsBellFill } from "react-icons/bs";

export default function DialogForm(props) {

  const closeDialogForm =(x)=>{
    let form = x.target.parentElement.parentElement.parentElement;
    form.style.display = 'none';
  }

  let resetBtn = true;
  let cancelBtn = false;
  let submitContent = "Add Task";
  let status = "to do";
  let newKey = new Date();
  let title = "";
  let task = "";
  let time = "";
  let cat = "";
  let collab = "";

  if(props.formType === 'edit'){
    resetBtn = false;
    cancelBtn = true;
    submitContent = "Update";
    status = props.status;
    newKey = props.keyDate;
    title = props.title;
    task = props.task;
    time = props.time;
    cat = props.cat;
    collab = props.collab;
  }
  
  
const [keyDate , setKeyDate ] = useState(newKey);
const [formTitle, setFormTitle] = useState(title);
const [formTitleNotice, setFormTitleNotice] = useState(false);

const [formTask, setFormTask] = useState(task);
const [formTaskNotice, setFormTaskNotice] = useState(false);
const [formTime, setFormTime] = useState(time);
const [formAlarm, setFormAlarm] = useState(false);
const [formCat, setFormCat] = useState(cat);
const [formCatList, setFormCatList] = useState([]);
const [formCollab, setFormCollab] = useState(collab);
const [formCollabList, setFormCollabList] = useState([]);

const formatTheDate = (d) => {
    const dateObj = dateFormat(d);
    const formatedDate = `${dateObj.year}-${dateObj.month}-${dateObj.date}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
    return formatedDate;
};

useEffect(() => {
  if(props.formType !== 'edit'){
    setKeyDate(formatTheDate(new Date())); 
  }
    console.log(`the key date is ${keyDate}`);
  return () => {
  };
}, []);

const toggleTitleNotice = (e) => {
  setFormTitle(e.target.value);
  setFormTitleNotice(true);
};

const toggleTaskNotice = (e) => {
  setFormTask(e.target.value);
  setFormTaskNotice(true);
};

const handleTitleBlur = () => {
  setFormTitleNotice(false);
};

const handleTaskBlur = () => {
  setFormTaskNotice(false);
};

const handleStatusWithTime = (d) => {
  let formDate = formatTheDate(d);
  setFormTime(formDate);

  if(props.formType !== 'edit'){
    if (formTime.year < keyDate.year || 
        (formTime.year === keyDate.year && formTime.month > keyDate.month) || 
        (formTime.year === keyDate.year && formTime.month === keyDate.month && formTime.date < keyDate.date)) {
        status = "to do";
    } else {
        status = "missed";
    }
  }
};

const handleCatAddition = () => {
if (formCat) {
  setFormCatList([...formCatList, formCat]);
  setFormCat('');
}
};

const handleCollabAddition = () =>{
if (formCollab) {
    setFormCollabList([...formCollabList, formCollab]);
    setFormCollab('');
  }
}
const handleReset = () =>{
  setFormTitle('');
  setFormTitleNotice(false);
  setFormTask('');
  setFormTaskNotice(false);
  setFormTime(new Date());
  setFormAlarm(0);
  setFormCat('');
  setFormCatList([]);
  setFormCollab('');
  setFormCollabList([]);
}

const handleSubmit = (e) => {
  e.preventDefault();

  // If formTitle is not entered, set it to the first 30 characters of formTask
  const taskTitle = formTitle || formTask.slice(0, 30);

  // If formTask is not entered, set it to the first 30 characters of formTitle
  const taskValue = formTask || formTitle.slice(0, 30);

  if (taskValue !== '' && taskValue !== null) {
    const newTask = {
      Title: taskTitle,
      Task: taskValue,
      Alarm: formAlarm,
      Time: formTime,
      Status : status,
      Category: formCatList,
      Collaborates: formCollabList,
    };
    // Retrieve existing tasks from local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || {};

    // Assign the new task to a unique key / or using the prop key for edit
    existingTasks[keyDate] = newTask;

    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(existingTasks)); 
    console.log(existingTasks);
    // console.log(newTask);
    if(props.formType !== 'edit'){
      handleReset();
    }
    closeDialogForm();
  }else{
    console.log("you have to enter a task");
  }
};

return (
<div className='dialogForm'>
  <span style={{ justifyContent: 'flex-end' }}>
    <button onClick={(e)=>closeDialogForm(e)}>X</button>
  </span>
  <h1>Add a New Task</h1>
  <form onSubmit={handleSubmit} onReset={handleReset}>
    <span>
      <label htmlFor="formTitle">Title</label>
      <input
        type="text"
        id="formTitle"
        value={formTitle}
        onInput={toggleTitleNotice}
        onChange={toggleTitleNotice}
        onBlur={handleTitleBlur}
        maxLength={40}
      />
    </span>
    
    <span>
    <p style={{color : 'transparent'}}> . </p>
    {formTitleNotice && <p className='inputNotices'>Max 40 characters including spaces.</p>}
    </span>
    
    <label htmlFor="formTask">Task</label>
    <textarea
      rows="3"
      id="formTask"
      value={formTask}
      onInput={toggleTaskNotice}
      onChange={toggleTaskNotice}
      onBlur={handleTaskBlur}
      maxLength={100}
    />
    <span>
        <p style={{color : 'transparent'}}> . </p>
        {formTaskNotice && <p className='inputNotices'>Max 100 characters including spaces.</p>}
    </span>
    
    <span>
      <label htmlFor="formTime">Time</label>
      <input
        type="datetime-local"
        id="formTime"
        value={formTime}
        onInput={(e) => handleStatusWithTime(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          onClick={() => {
            // Toggle value true and false
            setFormAlarm(formAlarm === 'true' ? 'false' : 'true');
          }}
          style={{display :'none'}}
        />
        <p style={{ color: formAlarm === 'true' ? 'var(--highlighter)' : 'var(--color)' }}><BsBellFill  /></p>

      </label>
    </span>

    <span>
      <label htmlFor="formCat">Category</label>
      <input
        type="text"
        id="formCat"
        value={formCat}
        onChange={(e) => setFormCat(e.target.value)}
      />
      <button type="button" onClick={handleCatAddition}>
        +
      </button>
    </span>

    <span id="formCatList">
    {formCatList.map((cat, index) => (
        <span key={index}>{cat}</span>
    ))}
    </span>

    <span>
      <label htmlFor="formCollab">Collaborators</label>
      <input
        type="text"
        id="formCollab"
        value={formCollab}
        onChange={(e) => setFormCollab(e.target.value)}
      />
        <button type="button" onClick={handleCollabAddition}>
            +
        </button>
    </span>
    <span id="formCollabList">
        {formCollabList.map((collab, index) => (
            <span key={index}>{collab}</span>
        ))}
    </span>

    <span style={{ justifyContent: 'space-around', margin: '2vh auto' }}>
      {resetBtn && <button type="reset">Reset</button>}
      <button type="submit">{submitContent}</button>
      {cancelBtn && <button onClick={closeDialogForm}>Cancel</button>}
    </span>
  </form>
</div>
);
}

