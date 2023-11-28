const getData = () => {
    const storedData = localStorage.getItem('tasks');
    
    if (!storedData) {
      return [];
    }
  
    try {
      const data = JSON.parse(storedData);
  
      // uptil here it is working fine. lets set error for each condition to find out the error
      if (Array.isArray(data)) {
        return data;

      } else if (typeof data === 'object') {
        return Object.entries(data);
      
      } else {
        return [];
      
      }
    } catch (error) {
      console.error('Error parsing data from local storage:', error);
      return [];
    }
    
  };
  
  let data = getData();
  
  const calculateStatus = (d1 , status = "to do") => {
    let currentDate = new Date().getTime();
  
    if(d1 > currentDate){
      status = "to do";
    }else if(d1 < currentDate){
      if (status !== "done") {
        status = "missed";
      }
    }
    
    return status;
  }
  
  const arrayFilter=(searchFor = "to do")=>{
    let arr = [];
    let modifiedData = [];
  
    for (let i in data) {
      let task = data[i];

    //   let taskDate = convertToDate(data[i][1].Time)  

    //   task.Status = calculateStatus(taskDate , task.Status );
      
      if (task.Status === searchFor) {
        arr.push(task);
      }  
  
      modifiedData.push(task);
          
    }
  
    localStorage.setItem('tasks', JSON.stringify(modifiedData.map(entry => entry)));
  
    // arr.sort((a, b) => a[1].Time - b[1].Time); // assending order
  
    return arr;
  }
  
  const strFilter = (inputValue) =>{
  
      let arr = [];
      let searchFor = inputValue.toLowerCase();
      
      for (let i in data) {
        let task = data[i]; //the whole tasks
        
        let searchIn = task.Title + task.Task + task.Category + task.Collaborates;
        searchIn = searchIn.toLowerCase();
  
        if (searchIn.includes(searchFor) ) {
          arr.push(task);
        }  
      }
      arr.sort((a, b) => a[1].Time - b[1].Time); // assending order
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
      arr.sort((a, b) => a[1].Time - b[1].Time); // assending order
  
      return arr ;
    }
  
  const convertToDate =(val)=>{
    let dateObject;

    if (typeof val === 'string') {
        const paramDate = parseInt(val, 10);  
        dateObject = new Date(paramDate);

    }else if (typeof val === 'number') {
      dateObject = new Date(val);

    }else if (val instanceof Date) {
        dateObject = val;

    } else {
        throw new Error('val is not converted in date');
    }
    return dateObject;
  }

  const dateFormat = (val) => {

    let dateObject = convertToDate(val);
  
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