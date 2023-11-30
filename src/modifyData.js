import data ,{ setData} from './AppData.js';

const editDone = (id) => {
    
    const index = data.findIndex(([key]) => key === id);

    data[index][1].Status = 'done';
}

const editDlt = (id) => {
    // Find the index of the task in the data array
    const index = data.findIndex(([key]) => key === id);

    if (index !== -1) {
        // Create a new array without modifying the original data array
        const newData = [...data.slice(0, index), ...data.slice(index + 1)];

        setData(newData);
         
    } else {
        console.log("Task not found");
    }
};


const editAlarm = (id) => {
    // Find the index of the task in the data array
    const index = data.findIndex(([key]) => key === id);

    if (index !== -1) {
        // Modify the task (for example, toggle the Alarm property)
        data[index][1].Alarm = !data[index][1].Alarm;
    } 
}

export { editDone , editDlt , editAlarm };