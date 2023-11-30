import { getData } from './AppData.js';
let data = getData();

const arrayFilter=(searchFor = "to do")=>{
  let arr = [];

  for (let i in data) {
    let task = data[i]; //the whole tasks

    if (task[1].Status === searchFor ) {
      arr.push(task);
    }  
  }

  arr.sort((a, b) => a.Time - b.Time ); //assending order

  return arr;
};


const calculateTimeLeft = ( ) => {

  let arr = arrayFilter('to do');
  let arrTime = arr[0][1].Time;

  let nextTaskDate = new Date(arrTime).getTime();
  const currentDate = new Date().getTime(); // Current date and time
  
  if (nextTaskDate < currentDate) {
    return " ";
  }
  const timeDifference = nextTaskDate - currentDate;
  
  // Convert the time difference to years, months, days, hours, minutes, and seconds
  const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
  const months = Math.floor((timeDifference % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
  const days = Math.floor((timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
  
  let timeLeft = 'Next Task in ';
  let a = 1;
  if (years > 0 && a <= 3) {
    timeLeft += `${years} years `;
    a++;
  }
  if (months > 0 && a <= 3) {
    timeLeft += `${months} months `;
    a++;
  }
  if (days > 0 && a <= 3) {
    timeLeft += `${days} days `;
    a++;
  }
  if (hours > 0 && a <= 3) {
    timeLeft += `${hours} hours `;
    a++;
  }  
  if (minutes > 0 && a <= 3) {
    timeLeft += `${minutes} minutes `;
    a++;
  }
  if (seconds > 0 && a <= 3) {
    timeLeft += `${seconds} seconds`;
    a++;
  }
  return timeLeft;
}

const strFilter = (inputValue) =>{

    let arr = [];
    let searchFor = inputValue.toLowerCase();
    
    for (let i in data) {
      let task = data[i]; //the whole tasks
      
      let searchIn = data[i][1].Title + data[i][1].Task + data[i][1].Category + data[i][1].Collaborates;
      searchIn = searchIn.toLowerCase();

      if (searchIn.includes(searchFor) ) {
        arr.push(task);
      }  
    }
    arr.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); // accending order
    return arr;
  }

  const dateFilter =(val)=>{
    let arr = [];
    let inputDate = dateObj(val);

    for (let i in data) {

      let task = data[i]; //the whole tasks
      let taskDate = dateObj(task[1].Time);
      
      // here we have to compare the dates (not time) -taskDate and inputDate
      if( taskDate.year === inputDate.year && taskDate.monthNumber === inputDate.monthNumber && taskDate.date === inputDate.date ){
        arr.push(task);
        console.log("date matched ");
      }
    }
    arr.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); // accending order
    return arr ;
  }

const dateObj = (paramDate) => {

  let dateObject = new Date(paramDate);
  // Extract individual components
  const year = dateObject.getFullYear();
  const monthLong = dateObject.toLocaleDateString('en-US', { month: 'long' })
  const month = dateObject.toLocaleDateString('en-US', { month: 'short' });
  const monthNumber = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
  const time = dateObject.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
  const timeLong = dateObject.toLocaleTimeString('en-US', { hour12: true });
  // Return an object with the extracted components

  return {
      year,
      monthLong,
      month,
      monthNumber,
      date,
      day,
      time,
      timeLong
  };
};


export { arrayFilter, dateObj, calculateTimeLeft , strFilter, dateFilter };  // Named exports