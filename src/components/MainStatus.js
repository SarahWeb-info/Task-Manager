import React , {useState} from 'react'

export default function MainStatus() {
    const {currentDate , setCurrentDate} = useState(new Date());

    useEffect(() => {
        // Update the state with the current date every second
        const intervalId = setInterval(() => {
          setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

  return (
    <>
        <div className="status-Container" style={{ backgroundColor : 'red',padding : '0 0.5vw', height : `${statusHeight}`,top:`${statusHeight}`, width : `${appWidth}`,position:'fixed' }}>
        <div style={{display:'inline-flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1>Status</h1>
          {/* show this form if there are tasks saved in the record */}
          <form action="">
            {/* datetime input is only used to search the record  */}
            <input type="datetime-local" name="" id="" />
             {/* the searchTask is only visible when we click the search Icon . it there is not task in the record , dont show this feature    */}
            <input id='searchTask' type="text" />
            <label htmlFor="searchTask">0</label>
          </form>
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <b>{currentDate.toString()}</b>  
            {/* // get the list of task . sequence them according to the Dates. get the firstUpcomingTask.Date(change string type to date)
            // let nextTask = minus currentDate to  firstUpcomingTask.Date . if nextTask is more than 2 days later, dont minus the time only show the next date 
            // if there is no task in the record hide small tag */}
            {/* <sm>Next Task: {nextTask}20 min later</sm> */}
          </div>
        </div>
    </div>
    </>
  )
}
