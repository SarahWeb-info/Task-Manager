export const getTasksData = () => {
    const data = JSON.parse(localStorage.getItem('tasks')) || {};
    let upcomingTasks = []; // Upcoming tasks
    let latestUpcomingDate = null;
    let nextTask = null;
  
    if (data) {
      // Convert keys into an array
      const datesArray = Object.keys(data);
  
      // Filter and sort the array of dates based on the 'Time' property
      upcomingTasks = datesArray
        .filter(date => new Date(data[date].Time) > new Date()) // Filter out passed tasks
        .sort((a, b) => new Date(data[a].Time) - new Date(data[b].Time)); // Sort by 'Time' property
  
      // Find the latest upcoming date
      latestUpcomingDate = upcomingTasks.length > 0 ? new Date(data[upcomingTasks[0]].Time) : null;
  
      // Calculate the difference in milliseconds
      const currentDate = new Date();
      const timeDifference = latestUpcomingDate ? latestUpcomingDate.getTime() - currentDate.getTime() : 0;
  
      // Calculate the difference in days
      nextTask = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    }
  
    return { upcomingTasks, latestUpcomingDate, nextTask };
  };
  