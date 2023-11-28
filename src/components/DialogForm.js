import React , {useState , useEffect} from 'react';
import dateFormat ,{ calculateStatus } from '../GetData.js';
import '../css/dialogForm.css';
import { BsBellFill } from "react-icons/bs";

export default function DialogForm({
  onClose,
  formType = 'add',
  newKey = new Date().getTime(),
  title = "",
  task = "",
  time = "",
  status = "to do",
  alarm = false,
  cat = "",
  collab = ""
}) {
  
  const [formTitle, setFormTitle] = useState(title);
  const [formTitleNotice, setFormTitleNotice] = useState(false);

  const [formTask, setFormTask] = useState(task);
  const [formTaskNotice, setFormTaskNotice] = useState(false);
  
  const [formTime, setFormTime] = useState(time);
  
  const [formStatus, setFormStatus] = useState(status);
  
  const [formAlarm, setFormAlarm] = useState(alarm);
  
  const [formCat, setFormCat] = useState(cat);
  const [formCatList, setFormCatList] = useState([]);
  
  const [formCollab, setFormCollab] = useState(collab);
  const [formCollabList, setFormCollabList] = useState([]);
   
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
    let val = new Date (d).getTime();
    setFormTime(val);
    setFormStatus(calculateStatus( d ));
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
        Status : formStatus,
        Category: formCatList,
        Collaborates: formCollabList,
      };

      // Retrieve existing tasks from local storage
      const existingTasks = JSON.parse(localStorage.getItem('tasks')) || {};

      // Assign the new task to a unique key / or using the prop key for edit
      existingTasks[newKey] = newTask;
      
      console.log(`existingTasks : ${JSON.stringify(localStorage.getItem('tasks'))}`);

      // Save the updated tasks back to local storage
      localStorage.setItem('tasks', JSON.stringify(existingTasks)); 
      

      if(formType !== 'edit'){
        handleReset();
      }
      onClose();
    }else{
      console.log("you have to enter a task");
    }
  };

return (
  <div className='dialogForm'>
    <span style={{ justifyContent: 'flex-end' }}>
      <button onClick={onClose}>X</button>
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
      <p style={{color : 'transparent'}}> &nbsp; </p>
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
          <p style={{color : 'transparent'}}> &nbsp; </p>
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
        {formType !== 'edit' && <button type="reset">Reset</button>}
        <button type="submit">{formType === 'edit' ? "Update" : "Add task"}</button>
        {formType === 'edit' && <button onClick={onClose}>Cancel</button>}
      </span>
    </form>
  </div>
  );
}

