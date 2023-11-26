import React, { useState , useEffect } from 'react';
import dateFormat from '../GetData.js';
import '../css/addTask.css';
import { BsBellFill } from "react-icons/bs";

export default function AddTask() {  

    const closeAddTask=()=>{
        document.getElementById('addTask').style.display = 'none';
    }
    
    const [keyDate , setKeyDate ] = useState(new Date());

    const [formTitle, setFormTitle] = useState('');
    const [formTitleNotice, setFormTitleNotice] = useState(false);

    const [formTask, setFormTask] = useState('');
    const [formTaskNotice, setFormTaskNotice] = useState(false);
    const [formTime, setFormTime] = useState(new Date());
    const [formAlarm, setFormAlarm] = useState(false);
    const [formCat, setFormCat] = useState('');
    const [formCatList, setFormCatList] = useState([]);
    const [formCollab, setFormCollab] = useState('');
    const [formCollabList, setFormCollabList] = useState([]);
    let status = "to do";
    const formatTheDate = (d) => {
        const dateObj = dateFormat(d);
        const formatedDate = `${dateObj.year}-${dateObj.month}-${dateObj.date}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
        return formatedDate;
    };
    
    useEffect(() => {
        setKeyDate(formatTheDate(new Date())); 
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
    if (formTime.year < keyDate.year || 
        (formTime.year === keyDate.year && formTime.monthNumber > keyDate.monthNumber) || 
        (formTime.year === keyDate.year && formTime.monthNumber === keyDate.monthNumber && formTime.date < keyDate.date)) {
        status = "to do";
    } else {
        status = "missed";
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
      const existingTasks = JSON.parse(localStorage.getItem('task')) || {};

      // Assign the new task to a unique key
      existingTasks[keyDate] = newTask;

      // Save the updated tasks back to local storage
      localStorage.setItem('tasks', JSON.stringify(existingTasks)); 
    console.log(existingTasks);
    // console.log(newTask);
      handleReset();
      closeAddTask();
    }else{
      console.log("you have to enter a task");
    }
  };

  return (
    <div className='addTaskForm'>
      <span style={{ justifyContent: 'flex-end' }}>
        <button onClick={closeAddTask}>X</button>
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
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </span>
      </form>
    </div>
  );
}
