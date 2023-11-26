
function App() {
  let data = {
    "2023-11-11T21:38:23": {
        "Title": "Get the recipes of Tim cookies",
        "Task": "new recipe",
        "Alarm": false,
        "Time": "2023-11-11T21:38:23",
        "Category": [],
        "Collaborates": [],
        "Status": "done"
    },
    "2023-11-11T16:39": {
        "Title": "Check the task",
        "Task": "check the task",
        "Alarm": true,
        "Time": "2023-11-11T16:39",
        "Category": [],
        "Collaborates": [],
        "Status": "missed"
    },
    "2023-12-08T21:39": {
        "Title": "Check 2",
        "Task": "Check 2",
        "Alarm": true,
        "Time": "2023-12-08T21:39",
        "Category": ["work", "app"],
        "Collaborates": ["alone", "chatgpt"],
        "Status": "to do"
    },
    "2023-12-15T08:15": {
        "Title": "Write weekly report",
        "Task": "Weekly report",
        "Alarm": false,
        "Time": "2023-12-15T08:15",
        "Category": ["work"],
        "Collaborates": ["team"],
        "Status": "missed"
    },
    "2023-12-20T14:30": {
        "Title": "Gym workout",
        "Task": "Exercise",
        "Alarm": true,
        "Time": "2023-12-20T14:30",
        "Category": ["health"],
        "Collaborates": [],
        "Status": "done"
    },
    "2024-01-05T10:00": {
        "Title": "Read a chapter from a book",
        "Task": "Reading",
        "Alarm": false,
        "Time": "2024-01-05T10:00",
        "Category": ["personal"],
        "Collaborates": [],
        "Status": "to do"
    },
    "2024-01-10T18:45": {
        "Title": "Project meeting",
        "Task": "Meeting",
        "Alarm": true,
        "Time": "2024-01-10T18:45",
        "Category": ["work"],
        "Collaborates": ["team"],
        "Status": "done"
    },
    "2024-01-18T12:00": {
        "Title": "Lunch with friends",
        "Task": "Social",
        "Alarm": false,
        "Time": "2024-01-18T12:00",
        "Category": ["personal"],
        "Collaborates": ["friends"],
        "Status": "missed"
    },
    "2024-02-02T09:30": {
        "Title": "Client call",
        "Task": "Call",
        "Alarm": true,
        "Time": "2024-02-02T09:30",
        "Category": ["work"],
        "Collaborates": ["client"],
        "Status": "to do"
    },
    "2024-02-15T20:00": {
        "Title": "Movie night",
        "Task": "Entertainment",
        "Alarm": true,
        "Time": "2024-02-15T20:00",
        "Category": ["personal"],
        "Collaborates": ["family"],
        "Status": "to do"
    }
}

  // Convert JSON to string
  const jsonString = JSON.stringify(data);
  
  // Save to local storage
  localStorage.setItem('tasks', jsonString);
  return (
    <div className="App">
      data saved in local storage
    </div>
  );
}

export default App;