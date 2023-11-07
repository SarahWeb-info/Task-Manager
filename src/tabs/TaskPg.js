import React from 'react'
import { BsArrowLeftCircleFill ,BsThreeDots } from "react-icons/bs";
import MainImg from '../imgs/intro6.jpg';
import Icon from '../components/Icon';
import CatButtets from '../components/CatagoryBullet';

export default function TaskPg() {
  return (
    <>
        <a href="http://" target="_blank" rel="noopener noreferrer">{ BsArrowLeftCircleFill }</a>
        <div className='d-flex justify-content-between align-items-center px-2 mt-5 mb-3'>
        <h2>Event Details</h2>
        <div className='d-inline-flex  align-items-center'>
            <div className="dropdown">
                <button
                    className=" dropdown-toggle noBtn"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    <BsArrowLeftCircleFill />
                </button>
                <div className="dropdown-menu">
                    edit
                    update
                    delete  
                </div>
            </div>
            <div>
                <label htmlFor=""><BsThreeDots/></label>
            </div>
        </div>
    </div> 
    <h1>Event Title dynamic</h1>
    <CatButtets />
    < div className = "card mb-3 mx-3" style={{ minHeight : '25vh'}} > 
    <div className="row g-0">
        <div className="col-md-6"  >
            <img src= {MainImg} className="img-fluid rounded" alt="..."/>
            </div>
            <div className="col-md-6">
                <div className="card-body">
                    <h5 className="card-title">Date</h5>
                    <p className="card-text badge rounded-pill bg-dark text-light">11.am 12.pm</p>
                </div>
            </div>
        </div>
    </div>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit eos maiores adipisci commodi ut praesentium quia quos ex nisi. Ducimus, aliquid corporis. Quia, modi et enim alias corporis nemo magni.</p> 
    <div className='d-inline-flex justify-content-start align-items-center'>
        <Icon />
        <h5>Suneel Shetty</h5>
    </div>
    </>
  )
}


