import React from 'react'
import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';
// import TaskPg from '../tabs/TaskPg';

export default function main(props) {
  let appWidth = props.appWidth;
  let navHeight = "8vh";

  return (
    <>
      <Navbar  navHeight= {navHeight} appWidth = {appWidth}/>
      {/* <Dashboard /> */}
      {/* <TaskPg /> */}
    </>
  )
}
