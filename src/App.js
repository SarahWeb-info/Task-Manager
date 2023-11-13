//1- get the current time moving in useEffect per sec
// 2 - get the data from local storage
// 3- sort the data in arrays - todo (ascending) - done (descending) - missed (descending) . do this in dataSort function
//check these arrays by viewing in html , and make the map array function dynamicly . displayArrays 
//4 - get nextTask from array todo[0]
// 5 - get the nextTaskTime=currentTime-nextTask.time . check if nextTask.time is a date not string . do this in useEffect -- done with moment.js
// 6 - if nextTask.time === currentTime , give notification and nextTask.alarm if true . also call dataSort function for sorting the task to the other array
// 7 - if nextTask.time < currentTime , set nextTask.alarm to false and nextTask.status to "missed" if not "done" . also call dataSort function for sorting the task to the other array

//after 1-7 done .8 - make a string search function to search matching string from array data.title ,data.task , data.cat , data.collab  
//9 - make a date search function to search matching date(not time) from array data.date(not time)

import React , {useEffect , useState} from 'react'
import moment from 'moment';

export default function App() {
//1- get the current time moving in useEffect per sec
  const [currentTime , setCurrentTime] = useState();
  const [showNextTime , setShowNextTime] = useState();
  const [showDateSearch , setShowDateSearch] = useState();
  const [showStringSearch , setShowStringSearch] = useState();

  // 2 - get the data from local storage
  let dataObj = JSON.parse(localStorage.getItem('data')) || {};
  //converting data object in array of keys and values
  const data = Object.entries(dataObj);
  
  // 3- sort the data in arrays - todo (ascending) - done (descending) - missed (descending) . do this in dataSort function
  let todoArray = [];
  let doneArray = [];
  let missedArray = [];

  const dataSort =()=>{
    for (let i in data) {
      // console.log(data[i]); //the whole task
      let sortTask = data[i];
      // console.log(data[i][0]); //keys
      // console.log(data[i][1]); //values
      // console.log(data[i][1].Status); // status
      let status = data[i][1].Status;
      if (status === "missed") {
        missedArray.push(sortTask);
      }else if (status === "to do") {
        todoArray.push(sortTask);
      }else if (status === "done") {
        doneArray.push(sortTask);
      }  
    }      
    //sort arrays according to the dates
    todoArray.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); //ascending
    doneArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //descending
    missedArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //ascending
    //4 - get nextTask from array todo[0]
  }  
  dataSort();
  
  let nextTask = todoArray[0];
  let nextTaskTime = nextTask[1].Time;

  const displayArrays =(array)=>{
    return array.map(([key, task]) => (
      <div key={key}>
        <p>
          <b>Title :</b> {task.Title} , <b>Task :</b> {task.Task} ,{' '}
          <b>Time :</b> {task.Time} ,{' '}
          <span style={{ color: task.Alarm === '1' ? 'orange' : 'initial' }}>
            <b>Alarm :</b> {task.Alarm}
          </span>
          
          {task.Category && task.Category.length > 0 && (
            <span>
              , <b>Category :</b> {task.Category}
            </span>
          )}{' '}
          {task.Collaborates && task.Collaborates.length > 0 && (
            <span>
              , <b>Collaborates :</b> {task.Collaborates}
            </span>
          )}
        </p>
      </div>
    ))
  }

  useEffect(() => {
    // This will run once when the component mounts
    const intervalId = setInterval(() => {
      // This will update the current date every second
      setCurrentTime(moment().format('Do MMM YY, h:mm:ss a'));
      setShowNextTime(moment(nextTaskTime, "YYYYMMDD").fromNow());
      // 6 - if nextTask.time === currentTime , give notification and nextTask.alarm if true . also call dataSort function for sorting the task to the other array
      if(moment(currentTime).isSame(nextTaskTime)){
        const result = window.confirm('Are you doing your task now?');
        if (result) {
          nextTask[1].Status = "done";
        }else{
          nextTask[1].Status = "missed";
        }
        dataSort();
        // 7 - if nextTask.time < currentTime , set nextTask.alarm to false and nextTask.status to "missed" if not "done" . also call dataSort function for sorting the task to the other array
      }else if(moment(nextTaskTime).isBefore(currentTime)){
        if(nextTask[1].Status !== "done"){
          nextTask[1].Status = "done";
        }
        dataSort();
      }
    }, 1000);
    
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); 
   
//9 - make a date search function to search matching date(not time) from array data.date(not time)
  function dateSearch(e){
    let dateSearchArray=[];
    let inputDate = e.target.value;
      
    for (let i in data) {
      const taskDate = moment(data[i][1].Time).format("YYYY-MM-DD");

      if (moment(taskDate).isSame(inputDate)) {
        dateSearchArray.push(data[i]);
      }
      setShowDateSearch(displayArrays(dateSearchArray));
    }     
  }

  //after 1-7 done .8 - make a string search function to search matching string from array data.title ,data.task , data.cat , data.collab   
  function StringSearch(e){
    const inputString = e.target.value.toLowerCase();
    // match inputString with title = data[i][1].Title
    // match inputString with task = data[i][1].Task
    // match inputString with Category = data[i][1].Category
    // match inputString with Collab = data[i][1].Collaborates
    // change both strings to lower case
    if (inputString.length>4) {
      let stringSearchArray=[];
      
      for (let i in data) {
        
      let taskString = data[i][1].Title + data[i][1].Task + data[i][1].Category + data[i][1].Collaborates;

      if (taskString.toLowerCase().includes(inputString) ) {
        stringSearchArray.push(data[i]);
      }
    }     
    setShowStringSearch(displayArrays(stringSearchArray));
    }
  }

  return (
    <div>
      <h2>The current date is : {currentTime}</h2>
      <h2>The Next Task is {showNextTime}</h2>
      <h3>Here is the to do array</h3>
      {displayArrays(todoArray)}
      <h3>Here is the missed array</h3>
      {displayArrays(missedArray)}
      <h3>Here is the done array</h3>
      {displayArrays(doneArray)}
      <div>
          <p>Enter to filter the search : </p>
          <label>search : </label>
          <input type="text" onInput={StringSearch}/>
          <label htmlFor="">Date : </label>
          <input type="date" name="" id="" style={{width:'32px' , color : 'white',userSelect:'none' , border: '0px' , outline: '0px'}} onInput={dateSearch} />
      </div>
      <h3>Here is the date search array</h3>
      {showDateSearch}
      <h3>Here is the String search array</h3>
      {showStringSearch}
    </div>
  )
}
