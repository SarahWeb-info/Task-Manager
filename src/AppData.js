let data = [
    [
      "1636689503000",
      {
        "Title": "Get the recipes of Tim cookies",
        "Task": "new recipe",
        "Alarm": false,
        "Time": "2023-11-11T21:38",
        "Category": [],
        "Collaborates": [],
        "Status": "done"
      }
    ],
    [
      "1636670343000",
      {
        "Title": "Check the task",
        "Task": "check the task",
        "Alarm": true,
        "Time": "2023-11-11T16:39",
        "Category": [],
        "Collaborates": [],
        "Status": "missed"
      }
    ],
    [
      "1638979143000",
      {
        "Title": "Check 2",
        "Task": "Check 2",
        "Alarm": true,
        "Time": "2023-12-08T21:39",
        "Category": ["work", "app"],
        "Collaborates": ["alone", "chatgpt"],
        "Status": "to do"
      }
    ],
    [
      "1639530900000",
      {
        "Title": "Write weekly report",
        "Task": "Weekly report",
        "Alarm": false,
        "Time": "2022-12-15T08:15",
        "Category": ["work"],
        "Collaborates": ["team"],
        "Status": "missed"
      }
    ],
    [
      "1640020200000",
      {
        "Title": "Gym workout",
        "Task": "Exercise",
        "Alarm": true,
        "Time": "2023-12-20T14:30",
        "Category": ["health"],
        "Collaborates": [],
        "Status": "done"
      }
    ],
    [
      "1641405600000",
      {
        "Title": "Read a chapter from a book",
        "Task": "Reading",
        "Alarm": false,
        "Time": "2024-01-05T10:00",
        "Category": ["personal"],
        "Collaborates": [],
        "Status": "to do"
      }
    ],
    [
      "1641830700000",
      {
        "Title": "Project meeting",
        "Task": "Meeting",
        "Alarm": true,
        "Time": "2024-01-10T18:45",
        "Category": ["work"],
        "Collaborates": ["team"],
        "Status": "done"
      }
    ],
    [
      "1642477200000",
      {
        "Title": "Lunch with friends",
        "Task": "Social",
        "Alarm": false,
        "Time": "2021-01-18T12:00",
        "Category": ["personal"],
        "Collaborates": ["friends"],
        "Status": "missed"
      }
    ],
    [
      "1643651400000",
      {
        "Title": "Client call",
        "Task": "Call",
        "Alarm": true,
        "Time": "2024-02-02T09:30",
        "Category": ["work"],
        "Collaborates": ["client"],
        "Status": "to do"
      }
    ],
    [
      "1644817600000",
      {
        "Title": "Movie night",
        "Task": "Entertainment",
        "Alarm": true,
        "Time": "2024-02-15T20:00",
        "Category": ["personal"],
        "Collaborates": ["family"],
        "Status": "to do"
      }
    ]
  ];
  
 const getData = () => {
    let currentDate = new Date();
  
    for (let i in data) {
      let time = data[i][1].Time;
      let status = data[i][1].Status;
  
      if(time < currentDate){
        if (status !== "done") {
          data[i][1].Status = "missed";
        }
      }
    }
    return data;
  };
 

const setData = (newData) => {
  data = newData;
  return data;
};

export default data;
export { getData, setData };
