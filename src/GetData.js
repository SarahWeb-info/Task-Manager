const getData = () => {
  const storedData = localStorage.getItem('tasks');
  
  if (!storedData) {
    return [];
  }

  try {
    const data = JSON.parse(storedData);

    if (Array.isArray(data)) {
      // If data is already an array, return it
      return data;
    } else if (typeof data === 'object') {
      // If data is an object, convert it to an array
      return Object.entries(data);
    } else {
      // If data is neither an array nor an object, return an empty array
      return [];
    }
  } catch (error) {
    console.error('Error parsing data from local storage:', error);
    return [];
  }

};

let data = getData();

const calculateStatus = (d1 , preStatus) => {
  let date1 = new Date(d1).getTime();
  let currentDate = new Date();
  let status = "to do";

  if(date1 > currentDate){
    status = "to do";
  }else if(date1 < currentDate){
    if (preStatus && preStatus !== "done") {
      status = "missed";
    }
  }
  
  return status;
}

const arrayFilter=(searchFor = "to do")=>{
  let arr = [];
  let modifiedData = [];

  for (let i in data) {
    let sortTask = data[i]; //the whole tasks
    
    data[i][1].Status = calculateStatus(data[i][1].Time , data[i][1].Status );
    
    if (data[i][1].Status === searchFor) {
      arr.push(sortTask);
    }  
    modifiedData.push(data[i]);
        
  }

  localStorage.setItem('tasks', JSON.stringify(modifiedData.map(entry => entry)));

  arr.sort((a, b) => new Date(a[1].Time).getTime() - new Date(b[1].Time).getTime()); //assending order

  return arr;
}

const strFilter = (inputValue) =>{

    let arr = [];
    let searchFor = inputValue.toLowerCase();
    
    for (let i in data) {
      let sortTask = data[i]; //the whole tasks
      
      let searchIn = data[i][1].Title + data[i][1].Task + data[i][1].Category + data[i][1].Collaborates;
      searchIn = searchIn.toLowerCase();

      if (searchIn.includes(searchFor) ) {
        arr.push(sortTask);
      }  
    }
    arr.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); // accending order
    return arr;
  }

  const dateFilter =(inputValue)=>{
    let arr = [];
    let inputDate = dateFormat(inputValue);

    for (let i in data) {
      let sortTask = data[i]; //the whole tasks
      let taskDate = dateFormat(data[i][1].Time);
      // here we have to compare the dates (not time) -taskDate and inputDate
      if( taskDate.year === inputDate.year && taskDate.monthNumber === inputDate.monthNumber && taskDate.date === inputDate.date ){
        arr.push(sortTask);
        console.log("date matched ");
      }
    }
    arr.sort((a, b) => new Date(a[1].Time) - new Date(b[1].Time)); // accending order
    return arr ;
  }


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

export default dateFormat;  // Default export
export { data , getData, arrayFilter,calculateStatus , strFilter, dateFilter };  // Named exports