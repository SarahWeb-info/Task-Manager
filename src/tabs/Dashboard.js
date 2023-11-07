import React from 'react'
import {BsCalendar2Week, BsSearch} from "react-icons/bs";
import MainImg from '../imgs/intro6.jpg';
import TaskCards from '../components/TaskCards';

export default function Dashboard() {
    return ( 
    <>
     <div className='myAppContainer d-flex justify-content-between align-items-center px-2 mt-5 mb-3'>
        <h1>Status heading</h1>
        <div className='d-inline-flex  align-items-center'>
            <form className="dropdown">
                <button
                    className=" dropdown-toggle noBtn"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    <BsCalendar2Week/>
                </button>
                <div className="dropdown-menu">
                    calender
                </div>
            </form>
            <div>
                <label htmlFor=""><BsSearch/></label>
            </div>
        </div>
    </div> 
    < div className = "myAppContainer card mb-3 mx-3" style={{ height : '15vh'}} > 
    <div className="row g-0">
        <div className="col-md-2"  >
            <img src= {MainImg} className="img-fluid rounded" alt="..."/>
            </div>
            <div className="col-md-10">
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a</p>
                </div>
            </div>
        </div>
    </div>
    <div className='myAppContainer scrollY'>
        <TaskCards />
        <TaskCards />
        <TaskCards />
        <TaskCards />
        <TaskCards />
    </div>
    </>
    )
}