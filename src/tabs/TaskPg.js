import React from 'react';
import Navbar from '../components/Navbar';
import { BsArrowLeftShort } from "react-icons/bs";
import MainImg from '../imgs/intro6.jpg';

export default function TaskPg() {
  return (
    <div  className='container'>
      <Navbar />
      <div>
        <div className = 'inlineFlexStatus'>
            <div className='d-inline-flex align-items-center'>
                <a><BsArrowLeftShort /></a>
                <h5>Event Details</h5>
            </div>
            <div className = 'statusChild2' >
                ...
            </div>   
      </div>
      <div>
            <h2>Title</h2>
            <div>
                cat bults
            </div>
            <div className="inlineFlexStatus dayCard">
                <img src={MainImg} alt="..."/>
                <div>
                    <h3>some</h3>
                    <span>date</span>
                    <span>time</span>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit odio officia asperiores optio consequatur aspernatur, soluta harum blanditiis. Eveniet praesentium magnam neque nisi soluta modi mollitia, ad placeat porro dolor.</p> 
            <div>
                collabs
            </div>
      </div>
    </div>
  </div> 
  )
}
