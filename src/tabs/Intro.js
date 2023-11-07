// import React, { useState } from 'react';
import React from 'react';
import '../css/intro.css';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../imgs/intro1.png';
import Img2 from '../imgs/intro2.jpg';
import Img3 from '../imgs/intro3.jpg';
import Img4 from '../imgs/intro4.jpg';
import Img5 from '../imgs/intro5.jpg';
import Img6 from '../imgs/intro6.jpg';

export default function Intro() {
  return (
  <div className = "container-lg">

    <div className = "intro myAppContainer">
      <h1>CALENDO</h1>
      <Carouselitem/>
      <div className='introStatus'>
        <h2><a href="http://">Get started</a></h2>
        <a href="http://" className='icon'>skip</a>
      </div>
    </div>
</div>
  )
}

function Carouselitem() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className='carouselSlides'>
          <div> 
            <img src={Img2} alt="" />
            <img src={Img1} alt="" />
          </div>
          <p>Signing In will help store your schedules for long purposes.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carouselSlides'>
          <div> 
              <img src={Img4} alt="" />
              <img src={Img3} alt="" />
            </div>
            <p>Reminders with notes will be saved automatically.</p>
          </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carouselSlides'>
          <div> 
            <img src={Img5} alt="" />
            <img src={Img6} alt="" />
          </div>
            <p>
             This app use localStorage for saving data.
            </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

