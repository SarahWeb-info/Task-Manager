import React  from 'react';
import data from '../AppData.js';
import { dateObj } from '../GetData.js';
import Navbar from '../components/Navbar';
import MainImg from '../imgs/intro6.jpg';
import TripleDotsMenu from '../components/TripleDotsMenu.js';
import {  BsArrowLeftShort } from "react-icons/bs";


export default function TaskPg() {
    // Extract parameters
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    const id = data.findIndex(([key]) => key === idParam);
    let task = data[id][1];
    let cat = task.Category;
    let collab = task.Collaborates;
    
    let dateObject = dateObj(task.Time);

    const handleGoBack = () => {
      window.history.back();
    };
    
    return (
    <div className='appContainer'>
      <Navbar />
      <div>
        <div className = 'flexInline'>
            <div className='flexInline'>
                <button onClick={handleGoBack} className='badge badge-secondary rounded-circle'><BsArrowLeftShort /></button>
                <h5>Event Details</h5>
            </div>
            <div><TripleDotsMenu task = {task} id={idParam} /></div>   
      </div>
      <div>
            <h2>{task.Title}</h2>
            <div className='flexInline flexStart'>
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
            <div className="flexInline dayCard">
                <img src={MainImg} alt="..."/>
                <div>
                    <h3>{dateObject.date} {dateObject.monthLong}'{dateObject.year}</h3>
                    <span>{dateObject.day} {dateObject.time}</span>
                </div>
            </div>
            <p>{task.Task}</p> 
            <div className='flexInline flexStart'>
            {collab.map((item, index) => (
                            <p key={index} className="icon">{item}</p>
                        ))}
            </div>
      </div>
    </div>
  </div> 
  )
}
