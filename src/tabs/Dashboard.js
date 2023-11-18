import React, { useState } from 'react'
import TaskCards from '../components/TaskCards';
import '../css/dashboard.css';

export default function Dashboard() {
    let dataObj = JSON.parse(localStorage.getItem('tasks')) || {};
    //converting data object in array of keys and values
    const data = Object.entries(dataObj);
    let dataPresent = false;
    if (data.length>0) {
      dataPresent = true;
    }else{
      dataPresent = false;
    }

    //get the date format
    const dateFormat = (paramDate) => {
      let dateObject;
    
      // Check if paramDate is a string, then convert to Date object
      if (typeof paramDate === 'string') {
        dateObject = new Date(paramDate);
      } else if (paramDate instanceof Date) {
        dateObject = paramDate;
      } else {
        throw new Error('Error .There is no date or a string to calculate.');
      }
    
      // Extract individual components
      const year = dateObject.getFullYear();
      const monthLong = dateObject.toLocaleDateString('en-US', { month: 'long' })
      const month = dateObject.toLocaleDateString('en-US', { month: 'short' });
      const date = dateObject.getDate();
      const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
    
      // Return an object with the extracted components
      return {
        year,
        monthLong,
        month,
        date,
        day,
        hours,
        minutes,
      };
    };
  
    let prevDate;
    return (
      <>
      {
        dataPresent && data.map(([key, task]) => {
          const formatedTime = dateFormat(task.Time);
          const showGrayLine = formatedTime.date !== prevDate;
          let taskTime = formatedTime.hours +":" + formatedTime.minutes ;
          prevDate = formatedTime.date; // Set the value of prevDate here

          return (
            <React.Fragment key={key}>
              {showGrayLine && (
                <div className='grayLine'>
                  <div></div>
                  <div></div>
                </div>
              )}
              <TaskCards
                key={key}
                title={task.Title}
                task={task.Task}
                alarm={task.Alarm}
                time={taskTime}
                date ={formatedTime.date}
                month= {formatedTime.month}
                day= {formatedTime.day}
                cats={task.Category}
                collab={task.Collaborates}
              />
            </React.Fragment>
          );
        })}

        {!dataPresent && <p>Data is not present</p>}
      </>
    );
  }
