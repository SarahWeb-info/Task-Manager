  // 2 - get the data from local storage
  let dataObj = JSON.parse(localStorage.getItem('data')) || {};
  //converting data object in array of keys and values
  const data = Object.entries(dataObj); //all tasks

// 3- sort the data in arrays - todo (ascending) - done (descending) - missed (descending) . do this in dataSort function
let todoArray = [];
let doneArray = [];
let missedArray = [];

//rather than sorting with status , sort it with dates. by this it will check for the alarms as well as sort and reset the status
const sortedArrays = () =>{
    for (let i in data) {
        // console.log(data[i]); //the whole task
        let sortTask = data[i];
        // console.log(data[i][0]); //keys
        // console.log(data[i][1]); //values
        // console.log(data[i][1].Status); // status
        // console.log(data[i][1].Time); // time
        let arrDate = data[i][1].Time;
        let parsedDate = arrDate.parse();
        
        if (parsedDate < parseCurrDate) {
            if (data[i][1].Status !== 'done') {
                data[i][1].Status = "missed";
                missedArray.push(sortTask);
            }else{
                doneArray.push(sortTask);
            }
        }else if (parsedDate === parseCurrDate) {
            console.log('it is time to do the task');
        }else if (parsedDate > parseCurrDate) {
            todoArray.push(sortTask);
        }  
      }      
    //sort arrays according to the dates
    todoArray.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); //ascending
    doneArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //descending
    missedArray.sort((a, b) => new Date(b[1].Time) - new Date(a[1].Time)); //ascending
}
    
//4 - get nextTask from array todo[0]
let nextTask = todoArray[0];
let nextTaskTime = nextTask[1].Time;    
//get the nextTaskAlarm status
let nextTaskAlarm = nextTask[1].Alarm;

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
    const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
    const month = dateObject.toLocaleDateString('en-US', { month: 'short' });
    const date = dateObject.getDate();
    const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
  
    // Return an object with the extracted components
    return {
      year,
      month,
      date,
      day,
      hours,
      minutes,
    };
  };
  
export const getTimer = () => {
    let currDate =  new Date();
    let currDateObj = dateFormat(currDate);
    return currDateObj;
};

