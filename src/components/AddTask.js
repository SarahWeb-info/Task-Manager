import React, { useState , useEffect } from 'react';
import { BsBellFill } from 'react-icons/bs';
import '../css/addTask.css';

export default function AddTask() {
  const [formTitle, setFormTitle] = useState('');
  const [formTitleNotice, setFormTitleNotice] = useState(false);

  const [formTask, setFormTask] = useState('');
  const [formTaskNotice, setFormTaskNotice] = useState(false);
  const [formTime, setFormTime] = useState('');
  const [formAlarm, setFormAlarm] = useState(0);
  const [formCat, setFormCat] = useState('');
  const [formCatList, setFormCatList] = useState([]);
  const [formCollab, setFormCollab] = useState('');
  const [formCollabList, setFormCollabList] = useState([]);

  const handleCloseBtn=(e)=>{
    let form = document.getElementsByClassName('addTaskForm')[0];
    form.style.display = 'none';
  };

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

  useEffect(() => {
    // Set the default value to the current date and time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    setFormTime(formattedDateTime);
  }, []);

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
    setFormTime('');
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

    // If formTime is not entered, set it to the local current time and date
    const timeValue = formTime || new Date().toISOString().slice(0, 16);

    if (taskValue !== '' && taskValue !== null) {
      const newTask = {
        Title: taskTitle,
        Task: taskValue,
        Alarm: formAlarm,
        Time: timeValue,
        Category: formCatList,
        Collaborates: formCollabList,
      };
      // Retrieve existing tasks from local storage
      const existingTasks = JSON.parse(localStorage.getItem('tasks')) || {};

      // Assign the new task to a unique key
      existingTasks[timeValue] = newTask;

      // Save the updated tasks back to local storage
      localStorage.setItem('tasks', JSON.stringify(existingTasks)); 
      handleReset();
    }else{
      console.log("you have to enter a task");
    }
  };

  return (
    <div className='addTaskForm'>
      <span style={{ justifyContent: 'flex-end' }}>
        <button onClick={handleCloseBtn}>X</button>
      </span>
      <h1>Add a New Task</h1>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <span>
          <label htmlFor="formTitle">Title</label>
          <input
            type="text"
            id="formTitle"
            value={formTitle}
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
            onChange={(e) => setFormTime(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              onClick={() => {
                // Toggle value 1 and 0
                setFormAlarm(formAlarm === '1' ? '0' : '1');
              }}
              style={{display :'none'}}
            />
            <BsBellFill style={{ color: formAlarm === '1' ? 'red' : 'initial' }} />
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
