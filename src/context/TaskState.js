import React, { useEffect, useState } from "react";
import TaskContext from './taskContext';

const TaskState = (props) => {
    const [currDate, setCurrDate] = useState(new Date());

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrDate(new Date());
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <TaskContext.Provider value={currDate}>
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskState;
